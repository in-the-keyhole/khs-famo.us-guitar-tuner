define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Context = require('famous/core/Context');
    
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    
    var StringsController = require('StringsController');
    var PickController = require('PickController');
    var ForkMeController = require('ForkMeController');
    
    function GuitarContext() {
        var el = document.createElement(Engine.getOptions('containerType'));
        el.classList.add(Engine.getOptions('containerClass'));
        document.body.appendChild(el);
    
        Context.apply(this, [el]);
        
        this.render();
    }
    
    GuitarContext.prototype = Object.create(Context.prototype);
	GuitarContext.prototype.constructor = GuitarContext;
    
    // Generate pick
    GuitarContext.prototype.render = function () {
        var me = this;
        
        me._pickController = new PickController();
        me._stringsController = new StringsController();
        me._forkMeController = new ForkMeController();
        
        function pluckString (offset) {
            pickController.setOffset(offset);
        };
        
        me._stringsController.on('stringClick', function (string) {
            if (me._activeString != string) {
                me._stringsController.emit('pluckString', string);
            }
            else {
                me._setActiveString();
            }
        });

        // Create strings
        me._stringsController.on('stringActive', function (data) {
            me._setActiveString(data.index, data.offset);
        });
        
        
        // Create pick    
        me._pickController.render(me);
        me._stringsController.render(me);
        me._forkMeController.render(me);
    };
    
    GuitarContext.prototype._setActiveString = function (string, offset) {
        var me = this;
    
        if (me._autoPluckTimeout) {
            clearTimeout(me._autoPluckTimeout);
        }
    
        me._activeString = string;
        me._pickController.setOffset(offset);
        
        if (string === undefined) {
            return;
        }
        
        me._autoPluckTimeout = setTimeout(function () {
            me._stringsController.emit('pluckString', string);
        }, 2000);
    };
    
    module.exports = GuitarContext;
});