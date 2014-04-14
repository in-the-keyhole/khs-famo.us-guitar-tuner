define(function (require, exports, module) {
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var ForkMeSurface = require('ForkMeSurface');
    
    function ForkMeController() {
        this._surface = new ForkMeSurface();
        this._modifier = new StateModifier({
            origin: [1, 0]
        });
    }

    ForkMeController.prototype = Object.create(Object.prototype);
	ForkMeController.prototype.constructor = ForkMeController;
    
    ForkMeController.prototype.render = function (context) {
        context.add(this._modifier).add(this._surface);
    };
    
    module.exports = ForkMeController;
});