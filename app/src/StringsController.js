define(function(require, exports, module) {
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');

    var StringSurface = require('StringSurface');

    function StringsController() {
        this._activeString = undefined;
        this._strings = [
            {
                string: 0,
                note: 'E',
                surface: undefined,
                modifier: undefined
            },
            {
                string: 1,
                note: 'A',
                surface: undefined,
                modifier: undefined
            },
            {
                string: 2,
                note: 'D',
                surface: undefined,
                modifier: undefined
            },
            {
                string: 3,
                note: 'G',
                surface: undefined,
                modifier: undefined
            },
            {
                string: 4,
                note: 'B',
                surface: undefined,
                modifier: undefined
            },
            {
                string: 5,
                note: 'e',
                surface: undefined,
                modifier: undefined
            }
        ];
        this._delta = 100;
    }
    
    StringsController.prototype = Object.create(Object.prototype);
	StringsController.prototype.constructor = StringsController;
    
    StringsController.prototype.render = function (context) {
        for (var i = 0; i < this._strings.length; i++) {
            this._generateString(i, context);
        }
    };
    
    StringsController.prototype._generateString = function (index, context) {
            var me = this;
            var string = me._strings[index];
            var offset = me._getOffset(index);
            var width = 20 - (2 * (index - 1));
            var modifier = new StateModifier({
                origin: [0.5, 0.5],
                transform: Transform.translate(offset, 0, 0)
            });
            
            string.surface = new StringSurface(string.note, 'audio/' + string.note.toLowerCase() + '-' + index + '.mp3', width, modifier, offset);
            
            string.surface.on('pluck', function () {
                me._onPluck(index);
            });
            
            context.add(modifier).add(string.surface);
    };
    
    StringsController.prototype._onPluck = function (index) {
        this._activeString = index;
        
        this.emit('stringActive', {offset: this._getOffset(index)});
    };
    
    StringsController.prototype._getOffset = function (index) {
        return (((this._strings.length / 2) * this._delta * -1) + (this._delta / 2)) + (index * this._delta);
    };
    
    StringsController.prototype.on = function (event, callback) {
        if (!this._events) {
            this._events = {};
        }
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    };
    
    StringsController.prototype.emit = function (event, data) {
        var callbacks = this._events[event];
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
    };
    
    module.exports = StringsController;
});