define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var SnapTransition = require('famous/transitions/SpringTransition');
    var SpringTransition = require('famous/transitions/SpringTransition');
    Transitionable.registerMethod('snap', SnapTransition);
    Transitionable.registerMethod('spring', SpringTransition);

    function StringSurface(index, string, audioFile, width, stateModifier, offset) {
        Surface.apply(this, [{
            size: [width],
            classes: [
                'string',
                'string-' + index
            ]
        }]);
        
        this._audioFile = audioFile;
        this._stateModifier = stateModifier;
        this._offset = offset;
        this.on('pluck', this.onPluck);
    };
    
    StringSurface.prototype = Object.create(Surface.prototype);
	StringSurface.prototype.constructor = StringSurface;
    
    StringSurface.prototype.onPluck = function () {
        var me = this;
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        
        source.setAttribute('src', this._audioFile);
        source.setAttribute('type', 'audio/mp3');
        audio.appendChild(source);
        document.body.appendChild(audio);
        
        audio.play();
    
        me._stateModifier.setTransform(
            Transform.translate(me._offset + (5 * (me._offset > 0 ? -1 : 1)), 0, 0),
            {
                method: 'spring',
                period: 150,
                dampingRatio: 0.1
            }
        );
        
        setTimeout(function() {        
            me._stateModifier.setTransform(
                Transform.translate(me._offset, 0, 0),
                {
                    method: 'snap',
                    period: 1,
                    dampingRatio: 1
                }
            );
        }, 1300);
    };
    
    module.exports = StringSurface;
});