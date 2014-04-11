define(function(require, exports, module) {
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var PickSurface = require('PickSurface');

    function PickController() {
        this._pickSurface = new PickSurface();
        this._pickModifier = new StateModifier({
            transform: Transform.translate(-128, -128, 1)
        });
        
        this._pickRendered = false;
    }
    
    PickController.prototype = Object.create(Object.prototype);
	PickController.prototype.constructor = PickController;
    
    PickController.prototype.render = function (context) {
        context.add(this._pickModifier).add(this._pickSurface);
    };
    
    PickController.prototype.setOffset = function (offset) {
        this._pickModifier.setOrigin([0.5, 0.5]);
            
        if (this._pickRendered) {
            this._pickModifier.setTransform(Transform.translate(offset + (128 / 2) + 5, 0, 1));
            this._pickModifier.setTransform(Transform.translate(offset + (128 / 2), 0, 1), {
                    method: 'snap',
                    period: 10,
                    dampingRatio: 0.1
            });
        }
        else {
            this._pickModifier.setTransform(Transform.translate(-1000, 0, 1));
            this._pickModifier.setTransform(Transform.translate(offset + (128 / 2), 0, 1), {
                    method: 'snap',
                    period: 125,
                    dampingRatio: 0.1
            });
            this._pickRendered = true;
        }
    };
    
    module.exports = PickController;
});