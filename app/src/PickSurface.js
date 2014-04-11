define(function(require, exports, module) {
    var Surface = require('famous/core/Surface');
    
    function PickSurface() {
        var numPicks = 3;
        var pick = Math.min(Math.floor(Math.random() * numPicks), numPicks - 1) + 1;
        
        Surface.call(this, {
            size: [128, 128],
            content: '<img src="images/pick' + pick + '.png" />'
        });
    }
    
    PickSurface.prototype = Object.create(Surface.prototype);
	PickSurface.prototype.constructor = PickSurface;
    
    module.exports = PickSurface;
});