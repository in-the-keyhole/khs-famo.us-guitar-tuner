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
    
    // Generate pick
    var numPicks = 3;
    var pick = Math.min(Math.floor(Math.random() * numPicks), numPicks - 1) + 1;
    var pick = new Surface({
        size: [128, 128],
        content: '<img src="images/pick' + pick + '.png" />'
    });
    var pickModifier = new StateModifier({
        transform: Transform.translate(-128, -128, 1)
    });
    
    var stringPlucked = false;
    
    function pluckString (offset) {
        pickModifier.setOrigin([0.5, 0.5]);
        
        if (stringPlucked) {
            pickModifier.setTransform(Transform.translate(offset + (128 / 2) + 5, 0, 1));
            pickModifier.setTransform(Transform.translate(offset + (128 / 2), 0, 1), {
                    method: 'snap',
                    period: 10,
                    dampingRatio: 0.1
            });
        }
        else {
            pickModifier.setTransform(Transform.translate(-1000, 0, 1));
            pickModifier.setTransform(Transform.translate(offset + (128 / 2), 0, 1), {
                    method: 'snap',
                    period: 125,
                    dampingRatio: 0.1
            });
            stringPlucked = true;
        }
    };

    // Create strings
    var activeString = -1;
    var strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    var stringSurfaces = [];
    var delta = 100;
    
    function generateString(index) {
        var string = strings[i];
        var offset = (((strings.length / 2) * delta * -1) + (delta / 2)) + (i * delta);
        var width = 20 - (2 * (i - 1));
        var modifier = new StateModifier({
            origin: [0.5, 0.5],
            transform: Transform.translate(offset, 0, 0)
        });
        
        var stringSurface = new StringSurface(string, 'audio/' + string.toLowerCase() + '-' + i + '.mp3', width, modifier, offset);
        stringSurfaces.push(stringSurface);
        
        stringSurface.on('pluck', function (e) {
            pluckString(offset, e);
            setActiveString(index);
        });
        
        mainContext.add(modifier).add(stringSurface);
    };
    
    for (var i = 0; i < strings.length; i++) {
        generateString(i);
    }
    
    // Create pick    
    mainContext.add(pickModifier).add(pick);
    
    // Active String
    function setActiveString(index) {
        var activeString = stringSurfaces[index];
        
        setTimeout(function () {
            activeString.emit('pluck');
        }, 2000);
    }

});
