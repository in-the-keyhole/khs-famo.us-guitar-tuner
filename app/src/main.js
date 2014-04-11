/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    
    var GuitarContext = require('GuitarContext');
    

    // create the main context
    var mainContext = new GuitarContext();
    Engine.registerContext(mainContext);
});
