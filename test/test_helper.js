import jsdom from 'jsdom';

// Setup a basic HTML document
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// Extract the window element from the document
const win = doc.defaultView;

// Insert these objects in Node's global object.
global.document = doc;
global.window = win;

// Take out all the properties from the window object and add them to global
Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};