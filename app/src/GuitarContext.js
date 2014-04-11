define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Context = require('famous/core/Context');
    
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    
    var StringsController = require('StringsController');
    var PickController = require('PickController');
    
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
        
        function pluckString (offset) {
            pickController.setOffset(offset);
        };

        // Create strings
        me._stringsController.on('stringActive', function (data) {
            me._pickController.setOffset(data.offset);
        });
        
        
        // Create pick    
        me._pickController.render(me);
        me._stringsController.render(me);
    };
    
    module.exports = GuitarContext;
});