import React, { Component } from 'react'
import _ from 'lodash'
import Header from '../../containers/Header'
import HeaderMock from '../../containers/Header/header'
import Title from '../../components/Title'
import styles from './styles'
import Settings from '../../components/Settings'
import isBreakpointSmall from '../../components/Breakpoint/isBreakpointSmall'
import Actions from '../../store/funds/actions'

export default class App extends Component {
    constructor (props) {
        super(props)
        
        /**
         * @var object
         */
        this.styles = styles(this.props)
        
        /**
         * @var bool|object
         */
        this.rates = false
        
        /**
         * @var int
         */
        this.minAmount = 1
        
        /**
         * @var int
         */
        this.maxAmount = 5000000
        
        /**
         * @var float|false
         */
        this.exchangeRate = false
        
        /**
         * @var object
         */
        this.state = {
            currency: false,
            amount: '',
            direction: false,
            agreed: false,
            loading: true,
            error: false,
            currencies: [],
            form_validated: false,
            displayError: false,
            currentExchangeRate: false,
            disabled: false,
            displayBetResult: false,
            win: false
        }
    }
    
    /**
     * Sets data before component is rendered 
     *
     * @return false
     */
    componentWillMount() {
        this.getRates()
        this.setCurrencies()
        
        setInterval(() => {
            this.getRates()
        }, 3000)
    }
    
    /**
     * Compares rates after update
     *
     * @param object prevState
     * @return false
     */
    componentDidUpdate(prevState) {
        if(this.state.disabled) {
            this.checkBetResults()
        }
    }
    
    /**
     * Sets loading
     *
     * @param value bool
     * @return false
     */
     setLoading(value) {
         if(value !== undefined) {
             if(value !== this.state.loading) {
                 this.setState({
                     loading: value
                 })
             }
         }
     }
     
     /**
      * Sets error
      *
      * @param value bool
      * @return false
      */
      setError(value) {
          if(value !== undefined) {
              if(value !== this.state.error) {
                  this.setState({
                      error: value
                  })
              }
          }
      }
      
      /**
       * Sets error
       *
       * @param value object
       * @return false
       */
       setRates(rates) {
           if(rates !== undefined) {
               if(rates.constructor === Object) {
                   if(rates.bpi) {
                       this.rates = rates
                       this.setCurrencies()
                   }
               }
           }
       }
    
    /**
     * Sets currencies array
     *
     * @return false
     */
    setCurrencies() {
        let result = []
        
        if(this.rates.constructor === Object) {
            result = this.transformRatesIntoCurrencies(this.rates)
        }
        
        if(!_.isEqual(result, this.state.currencies)) {
            this.setState({
                currencies: result
            }, () => {
                this.setCurrentExchangeRate()
            })
        }
    }
    
    /**
     * Sets currency state
     *
     * @param string currency
     * @return false
     */
    setCurrency(currency) {
        if(currency) {
            if(this.currency !== currency) {
                this.setState({
                    currency: currency
                })
            }
        }
    }
    
    /**
     * Converts current exhange rate into bitcoin and then sets state
     *
     * @return false
     */
    setCurrentExchangeRate() {
        let result = false
        let amount = false
        
        if(this.state.currencies && this.state.currency && this.state.amount !== '') {
            if(this.state.currencies.constructor === Array) {
                let currency = _.find(this.state.currencies, {
                    name: this.state.currency 
                })
                
                if(currency) {
                    amount =  this.state.amount / currency.rate.replace(',', '')
                    //amount = parseFloat(amount).toFixed(4)
                    
                    if(!isNaN(parseFloat(amount)) && isFinite(amount)) {
                        result = amount
                    }
                }
            }
        }
        
        this.setState({
            currentExchangeRate: result
        })
    }
    
    /**
     * Fetches exchange rates
     *
     * @return false
     */
    getRates() {
        let _this = this
        
        if(process.env.NODE_ENV !== 'test') {
            fetch('https://api.coindesk.com/v1/bpi/currentprice.json?t=123454', {
                method: 'GET'
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                if(json.errors) {
                    _this.setError(true)
                    _this.setLoading(false)
                } else {
                    _this.setError(false)
                    _this.setLoading(false)
                    _this.setRates(json)
                }
            })
            .catch (function(ex) {
                _this.setError(true)
            })
        }
    }
    
    /**
     * Transforms api response into currencies array
     *
     * @return array results
     */
    transformRatesIntoCurrencies(rates) {
        let result = []
        
        if(rates) {
            if(this.rates.constructor === Object) {
                if(rates.bpi) {
                    let currency = false
                    
                    if(rates.bpi.EUR) {
                        if(rates.bpi.EUR.rate) {
                            result.push({
                                name: 'eur',
                                icon: '/images/euro-dark.svg',
                                text: 'EUR',
                                rate: rates.bpi.EUR.rate
                            })
                            
                            currency = 'eur'
                        }
                    }
                    
                    if(rates.bpi.USD) {
                        if(rates.bpi.USD.rate) {
                            result.push({
                                name: 'usd',
                                icon: '/images/usd-dark.svg',
                                text: 'USD',
                                rate: rates.bpi.USD.rate
                            })
                            
                            currency = 'usd'
                        }
                    }
                    
                    if(rates.bpi.GBP) {
                        if(rates.bpi.GBP.rate) {
                            result.push({
                                name: 'gbp',
                                icon: '/images/gbp-dark.svg',
                                text: 'GBP',
                                rate: rates.bpi.GBP.rate
                            })
                            
                            currency = 'gbp'
                        }
                    }
                    
                    if(currency && !this.state.currency) {
                        this.setCurrency(currency)
                    }
                }
            }
        }
        
        return result
    }
    
    isFormValidated() {
        let result = false
        let currencyValidation = false
        let agreedValidation = false
        let directionValidation = false
        let amountValidation = false
        let displayError = false
        
        this.displayError = false
        
        // Checks if currency is a string
        if(typeof this.state.currency == 'string') {
            currencyValidation = true
        }
        
        // Checks if agreed is set to true
        if(this.state.agreed) {
            agreedValidation = true
        }
        
        // Checks if direction is applied
        if(this.state.direction) {
            directionValidation = true
        }
        
        // Amount validation
        if(this.state.amount !== '') {
            if(isNaN(parseFloat(this.state.amount)) && !isFinite(this.state.amount)) {
                displayError = 'Amount must be a number' 
            }
            
            if(!displayError && this.state.amount >= this.minAmount) {
                amountValidation = true
            }
        }
        
        if(currencyValidation && agreedValidation && directionValidation && amountValidation) {
            result = true
        }
        
        this.setState({
            displayError: displayError,
            form_validated: result
        })
    }
    
    /**
     * Updates currency state
     *
     * @param DOM event
     * @return false
     */
    checkBetResults() {
        let dispatch = this.props.dispatch 
        
        if(this.state.currentExchangeRate !== this.exchangeRate) {
            let result = false
            
            // Direction up
            if(this.state.direction == 'up') {
                if(this.state.currentExchangeRate > this.exchangeRate) {
                    result = true
                }
            }
            
            // Direction down
            if(this.state.direction == 'up') {
                if(this.state.currentExchangeRate < this.exchangeRate) {
                    result = true
                }
            }
            
            if(result) {
                let dispatchResult = this.exchangeRate + this.props.availableFunds
                dispatch(Actions.setAvailableFunds(dispatchResult)) 
            }
            
            if(!result) {
                let dispatchResult = this.props.availableFunds - this.exchangeRate
                dispatch(Actions.setAvailableFunds(dispatchResult)) 
            }
            
            this.setState({
                disabled: false,
                amount: '',
                displayBetResult: true,
                win: result
            })
        }
    }
    
    /**
     * Check if user can place a bet
     *
     * @return bool result
     */
    userHasAvailableFunds() {
        let result = false
        if(this.props.availableFunds >= this.exchangeRate) {
            result = true
        }
        
        return result
    }
    
    /**
     * Updates currency state
     *
     * @param DOM event
     * @return false
     */
    handleCurrencyChange(event) {
        if(event) {
            if(event.target) {
                if(event.target.value !== this.state.currency) {
                    this.setState({
                        currency: event.target.value
                    }, () => {
                        this.setCurrentExchangeRate()
                        this.isFormValidated()
                    })
                }
            }
        }
    } 
    
    /**
     * Updates amount state
     *
     * @param DOM event
     * @return false
     */
    handleAmountChange(event) {
        if(event) {
            if(event.target) {
                if(event.target.value !== this.state.amount) {
                    let amount = event.target.value
                    let previousState = this.state.amount

                    if(event.target.value > this.maxAmount) {
                        amount = previousState
                    }
                    
                    this.setState({
                        amount: amount
                    }, () => {
                        this.setCurrentExchangeRate()
                        this.isFormValidated()
                    })
                }
            }
        }
    } 
    
    /**
     * Updates direction state
     *
     * @param DOM event
     * @return false
     */
    handleDirectionChange(event) {
        if(event) {
            if(event.target) {
                if(event.target.value !== this.state.direction) {
                    this.setState({
                        direction: event.target.value
                    }, () => {
                        this.isFormValidated()
                    })
                }
            }
        }
    }
    
    /**
     * Updates agreed state
     *
     * @param DOM event
     * @return false
     */
    handleAgreedChange(event) {
        if(event) {
            this.setState({
                agreed: !this.state.agreed
            }, () => {
                this.isFormValidated()
            })
        }
    }
    
    /**
     * Validate form and then submit
     *
     * @return false
     */
    handleFormSubmit() {
        this.getRates()
        this.exchangeRate = this.state.currentExchangeRate
        
        if(this.userHasAvailableFunds()) {
            this.setState({
                disabled: true
            })
        } else {
            this.setState({
                displayError: 'Not enough funds to cover bet, please add funds to your account or enter a smaller amount'
            })
        }
    }
    
    /**
     * Sets displayBetResult state
     *
     * @return false
     */
    handleReturnButtonClick() {
        this.exchangeRate = false
        
        this.setState({
            displayBetResult: false,
            currentExchangeRate: false
        })
    }
    
    /**
     * Renders title
     *
     * @return DOM elements
     */
    renderPageTitle() {
        return (
            <Title
                title="Binary options"
                color="#0667D0"
                fontSize="1.2rem"
                textTransform="capitalize"
                fontWeight="400"
                borderBottom="0.065rem solid #DAE1E9"
                padding="0.5rem 1.5rem 1.5rem 1.5rem"
                margin="0 0 1.5rem 0"
            />
        )
    }
    
    /**
     * Renders title
     *
     * @return DOM elements
     */
    renderBetResultsTitle() {
        let title = 'Bet lost'
        
        if(this.state.win) {
            title = 'Bet won'
        }
        
        return (
            <Title
                title={title}
                color="#0667D0"
                fontSize="1.2rem"
                textTransform="capitalize"
                fontWeight="400"
                borderBottom="0.065rem solid #DAE1E9"
                padding="0.5rem 1.5rem 1.5rem 1.5rem"
                margin="0 0 1.5rem 0"
            />
        )
    }
    
    /**
     * Renders DOM elements
     *
     * @return DOM elements
     */
    renderDoubleContent() {
        let _this = this

        return (
            <div style={Object.assign({},
                !isBreakpointSmall(this.props.breakpoint) && this.styles.doubleConteent.container)}>
                
                <div style={Object.assign({},
                    this.styles.doubleConteent.containerLeft,
                    isBreakpointSmall(this.props.breakpoint) && this.styles.doubleConteent.containerSmall)}>
                    
                    <Title
                        title="Please choose currency and enter desired amount"
                        color="#0667D0"
                        fontSize="1rem"
                        fontWeight="400"
                        margin="0 0 1.5rem 0"
                    />
                    
                    <form>
                        <div style={Object.assign({},
                            !isBreakpointSmall(this.props.breakpoint) && this.styles.form.container)}>
                            
                            <div style={Object.assign({},
                                !isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnLeft,
                                isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnSmall)}>
                                
                                <Title
                                    title="Currency"
                                    color="#666666"
                                    fontSize="0.85rem"
                                    fontWeight="400"
                                    margin="0 0 0.75rem 0"
                                    tag="label"
                                    display="block"
                                />
                            
                                <select 
                                    name="currency"
                                    style={this.styles.form.select}
                                    onChange={this.handleCurrencyChange.bind(this)} 
                                    value={this.state.currency}
                                    disabled={this.state.disabled ? true : false}>
                                    
                                    {this.state.currencies.map(function(item, index){
                                        return (
                                            <option 
                                                value={item.name} 
                                                key={index}>
                                                
                                                {item.text} 
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            <div style={Object.assign({},
                                !isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnRight,
                                isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnSmall)}>
                                
                                <Title
                                    title="Amount"
                                    color="#666666"
                                    fontSize="0.85rem"
                                    fontWeight="400"
                                    margin="0 0 0.75rem 0"
                                    tag="label"
                                    display="block"
                                />
                                
                                <input 
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    onChange={this.handleAmountChange.bind(this)} 
                                    style={this.styles.form.input}
                                    value={this.state.amount}
                                    disabled={this.state.disabled ? true : false}
                                />
                            </div>
                        </div>
                
                        <p style={this.styles.form.paragraph}>
                            After a change in exchange rate, the price for bitcoin will go:
                        </p>
                        
                        <div style={Object.assign({},
                            !isBreakpointSmall(this.props.breakpoint) && this.styles.form.container)}>
                            
                            <div style={Object.assign({},
                                !isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnLeft,
                                isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnSmall)}>
                                
                                <div style={this.styles.form.radioContainer}>
                                    <input 
                                        type="radio" 
                                        id="radioButtonUp"
                                        name="direction" 
                                        value="up"
                                        className="radiobutton" 
                                        onChange={this.handleDirectionChange.bind(this)} 
                                        disabled={this.state.disabled ? true : false}
                                    />
                                    
                                    <label 
                                        htmlFor="radioButtonUp" 
                                        className="radiolabel"
                                        style={this.styles.form.label}>
                                        
                                        Up
                                        
                                        <img 
                                            src={this.state.direction == 'up' ? '/images/graph-up-white.svg' : '/images/graph-up-grey.svg'} 
                                            alt="Down" 
                                            style={this.styles.form.icon}
                                        />
                                    </label>
                                </div>
                            </div>
                            
                            <div style={Object.assign({},
                                !isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnRight,
                                isBreakpointSmall(this.props.breakpoint) && this.styles.form.columnSmall)}>
                                
                                <div style={this.styles.form.radioContainer}>

                                    <input 
                                        type="radio" 
                                        id="radioButtonDown"
                                        name="direction" 
                                        value="down"
                                        className="radiobutton" 
                                        onChange={this.handleDirectionChange.bind(this)} 
                                        disabled={this.state.disabled ? true : false}
                                    />
                                    
                                    <label 
                                        htmlFor="radioButtonDown" 
                                        className="radiolabel"
                                        style={this.styles.form.label}>
                                        
                                        Down
                                        
                                        <img 
                                            src={this.state.direction == 'down' ? '/images/graph-down-white.svg' : '/images/graph-down-grey.svg'}
                                            alt="Down" 
                                            style={this.styles.form.icon}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {!isBreakpointSmall(this.props.breakpoint) &&
                            this.renderCheckbox()
                        }
                    </form>
                </div>
                
                <div style={Object.assign({},
                    this.styles.doubleConteent.containerRight,
                    isBreakpointSmall(this.props.breakpoint) && this.styles.doubleConteent.containerSmall)}>
                    
                    <Title
                        title="Exchange rates"
                        color="#0667D0"
                        fontSize="1rem"
                        fontWeight="400"
                        margin={isBreakpointSmall(this.props.breakpoint) ? "2rem 0 1.5rem 0" : "0 0 1.5rem 0"}
                    />  
                    
                    <div style={this.styles.rates.container}>
                        <ul style={this.styles.rates.ul}>
                            
                            {this.state.currencies.map(function(item, index){
                                return (
                                    <li 
                                        style={Object.assign({},
                                            _this.styles.rates.li,
                                            index == _this.state.currencies.length - 1 && _this.styles.rates.liLastChild
                                        )}
                                        key={index}
                                        className="currencies">
                                        
                                        <img 
                                            src={item.icon}
                                            alt={item.name}
                                            style={_this.styles.rates.icon}
                                        />
                                        
                                        <div>
                                            <span style={_this.styles.rates.span}>
                                                {item.text}
                                            </span>
                                            
                                            <span style={Object.assign({},
                                                _this.styles.rates.span,
                                                _this.styles.rates.spanLight)}>
                                                
                                                Rate: {item.rate}
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    
                    {this.state.currentExchangeRate > 0 &&
                        <div>
                            <span style={this.styles.rates.text}>
                                Current exchange rate:
                            </span>
                            
                            <span style={this.styles.rates.orderText}>                            
                                <span>
                                    {this.state.currentExchangeRate}
                                </span>
                                
                                <img 
                                    src="/images/bitcoin-dark.svg" 
                                    alt="bitcoin" 
                                    style={this.styles.rates.bitcoin}
                                />
                            </span>
                        </div>
                    }
                    
                    {isBreakpointSmall(this.props.breakpoint) &&
                        this.renderCheckbox()
                    }
                </div>
            </div>
        )
    }
    
    /**
     * Renders checkbox
     *
     * @return DOM elements
     */
    renderCheckbox() {
        return (
            <div style={this.styles.form.checkboxContainer}>
                <input 
                    type="checkbox"
                    checked={this.state.agreed}
                    style={this.styles.form.checkbox}
                    onChange={this.handleAgreedChange.bind(this)} 
                    name="agreed"
                    disabled={this.state.disabled ? true : false}
                />
                
                <Title
                    title="I have read terms and conditions"
                    color="#666666"
                    fontSize="0.85rem"
                    fontWeight="400"
                    margin="0"
                    tag="label"
                    display="block"
                    margin="0 0 0 0.5rem"
                />
            </div>
        )
    }
    
    /**
     * Renders results content
     *
     * @return DOM elements
     */
    renderBetResultsContent() {
        let icon = '/images/loss.svg'
        let alt = 'bet lost'
        let paragraph1 = 'Sorry! The bet has lost.'
        let paragraph2 = 'Based on the new exchange rate, loss have calculated to:'
        
        if(this.state.win) {
            icon = '/images/win.svg'
            alt = 'bet won',
            paragraph1 = 'Congratulations! The bet has won.'
            paragraph2 = 'Based on the new exchange rate, winnings have calculated to: '
        }
        
        return (
            <div style={this.styles.results.container}>
                <img 
                    src={icon} 
                    alt={alt}
                    style={this.styles.results.icon}
                />
                
                <div style={this.styles.results.text}>
                    <p>{paragraph1}</p>
                    <p>{paragraph2} <span style={Object.assign({},
                        this.styles.results.spanColorRed,
                        this.state.win && this.styles.results.spanColorGreen)}>
                        {this.exchangeRate} BTC</span>
                    </p>
                </div>
                
                <button 
                    style={this.styles.results.button}
                    onClick={this.handleReturnButtonClick.bind(this)}>
                    
                    Make another bet
                </button>
            </div>
        )
    }
    
    /**
     * Renders submit button
     *
     * @return DOM elements
     */
    renderSubmitButtonWithValidationErrors() {
        let image = '/images/cross-white.svg'
        let alt = 'disabled'
        let text = 'Place bet'
        
        if(this.state.form_validated) {
            image = '/images/tick-white.svg'
            alt = 'tick'
        }
        
        if(this.state.disabled) {
            image = '/images/loading.gif'
            alt = 'working..',
            text = 'Bet placed'
        }
        
        return (
            <div style={this.styles.submitButtonWithValidation.container}>
                {this.state.displayError &&
                    <div style={Object.assign({},
                        this.styles.validationError,
                        isBreakpointSmall(this.props.breakpoint) && this.styles.validationErrorSmall)}>
                        
                        {this.state.displayError}
                    </div>
                }
                
                <div style={this.styles.submitButtonWithValidation.buttonContainer}>
                    <button style={Object.assign({},
                        this.styles.submitButtonWithValidation.button,
                        !this.state.form_validated && this.styles.submitButtonWithValidation.buttonDisabled)}
                        disabled={!this.state.form_validated ? true : false}
                        onClick={this.handleFormSubmit.bind(this)}
                        id="submit--button">
                        
                        <img 
                            src={image}
                            alt={alt} 
                            style={this.styles.submitButtonWithValidation.icon}
                        />
                        
                        <span style={this.styles.submitButtonWithValidation.span}>
                            {text}
                        </span>
                    </button>
                </div>
            </div>
        )
    }
    
    /**
     * Renders DOM elements
     *
     * @return DOM elements
     */
    renderApp() {
        if(!this.state.loading && this.state.currencies.length > 0 && !this.state.displayBetResult) {
            return (
                <div style={Object.assign({},
                    Settings.width.container,
                    this.styles.container)}
                    id="content">
                    
                    {this.renderPageTitle()}
                    {this.renderDoubleContent()}
                    {this.renderSubmitButtonWithValidationErrors()}
                </div>
            )
        }
        
        return false
    }
    
    /**
     * Renders DOM elements
     *
     * @return DOM elements
     */
    renderBetResults() {
        if(!this.state.loading && this.state.displayBetResult) {
            return (
                <div style={Object.assign({},
                    Settings.width.container,
                    this.styles.container)}
                    id="content--results">
                    
                    {this.renderBetResultsTitle()}
                    {this.renderBetResultsContent()}
                </div>
            )
        }
        
        return false
    }
    
    /**
     * Renders DOM elements
     *
     * @return DOM elements
     */
    renderError() {
        if((this.state.error || this.state.currencies.length == 0) && !this.state.loading) {
            return (
                <div 
                    id="error" 
                    style={this.styles.error}>
                    
                    <span>
                        Oops, there seems to be a technical issue. Please try again
                    </span>
                </div>
            )
        }
        
        return false
    }
    
    /**
     * Renders DOM elements
     *
     * @return DOM elements
     */
    renderLoading() {
        if(this.state.loading && !this.state.error) {
            return (
                <div id="loading">
                    <img 
                        src="/images/loading.gif" 
                        alt="loading" 
                        style={this.styles.loading}
                    />
                </div>
            )
        }
        
        return false
    }
    
    renderHeader() {
        if(process.env.NODE_ENV == 'test') {
            return (
                <HeaderMock />
            )
        }
        
        return (
            <Header />
        )
    }

    /**
     * Renders DOM elements
     *
     * @return DOM elements
     */
    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderLoading()}
                {this.renderError()}
                {this.renderApp()}
                {this.renderBetResults()}
            </div>
        )
    }
}