/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    
    var StringSurface = require('StringSurface');

    // create the main context
    var mainContext = Engine.createContext();

    // Create strings
    var strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    var delta = 100;
    
    for (var i = 0; i < strings.length; i++) {
        var string = strings[i];
        var offset = (((strings.length / 2) * delta * -1) + (delta / 2)) + (i * delta);
        var width = 20 - (2 * (i - 1));
        var modifier = new StateModifier({
            origin: [0.5, 0.5],
            transform: Transform.translate(offset, 0, 0)
        });
        
        mainContext.add(modifier).add(new StringSurface(string, 'audio/' + string.toLowerCase() + '-' + i + '.mp3', width, modifier, offset));
    }

});
