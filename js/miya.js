var $body = $("body"),
	$win = $(window);

var miya = {
	init:function(){
		this.renderPath();
	},
	// render
	renderPath:function(){
		$.fn.scrollPath("getPath", {scrollSpeed: 50,rotationSpeed: Math.PI / 15})
			.moveTo(400, 50, {name: "start"})
			.lineTo(400, 800, {name: "description"});
		$(".wrapper").scrollPath({scrollBar:true,drawPath: true, wrapAround: true});
	}
}

$(function(){
	miya.init();
});