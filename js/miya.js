var $body = $("body"),
	$win = $(window),
	skyCount = 15,
	skyUrl = 'upload/',
	skyMoving = false;

var miya = {
	init:function(){
		this.initPath();
		this.initBasic();
	},
	// render
	initPath:function(){
		$.fn.scrollPath("getPath", {scrollSpeed: 50,rotationSpeed: Math.PI / 15})
			.moveTo(0, 2000, {name: "home",callback:$.proxy(this.renderHome,this)})
			.arc(2000, 2000, 2000, -Math.PI, Math.PI/2, true,{rotate: Math.PI/2,name:"sky",callback:$.proxy(this.renderSky,this)})
			.arc(2000, 2000, 2000, Math.PI/2, 0, true,{rotate: Math.PI,name:"say",callback:$.proxy(this.renderSay,this)})
			.arc(2000, 2000, 2000, 0, -Math.PI/2, true,{rotate: 3*Math.PI/2,name:"about",callback:$.proxy(this.renderAbout,this)})
			.arc(2000,2000,2000,-Math.PI/2,-Math.PI,true,{rotate: 2*Math.PI});
		$(".wrapper").scrollPath({scrollBar:true,drawPath: true, wrapAround: true});
	},
	initBasic:function(){
		// nav
		$("nav a").click(function(){
			var $this = $(this),
				target = $this.attr("rel");
			$.fn.scrollPath("scrollTo", target, 1000, "easeInOutSine");
			return false;
		});
		// sky
		this.initSky();

		// say
		this.initSay();

		// about
		var $container = $( '#uc-container' ),
			pfold = $( '#uc-container' ).pfold({
						easing : 'ease-in-out',
						folds : 3,
						folddirection : ['left','bottom','right']
					});
			$container.on( 'click', function() {
					pfold.unfold();
				} );
			$container.find( 'span.close' ).on( 'click', function() {
					pfold.fold();
				} );
	},
	initSay:function(){
		var Page = (function() {
		var config = {
				$bookBlock : $( '#say-book' ),
				$navNext : $( '#bb-nav-next' ),
				$navPrev : $( '#bb-nav-prev' ),
				$navJump : $( '#bb-nav-jump' ),
				bb : $( '#say-book' ).bookblock( {
					speed : 800,
					shadowSides : 0.8,
					shadowFlip : 0.7
				} )
			},
			init = function() {
				initEvents();
			},
			initEvents = function() {
				var $slides = config.$bookBlock.children(),
						totalSlides = $slides.length;
				// add navigation events
				config.$navNext.on( 'click', function() {
					config.bb.next();
					return false;
				} );
				config.$navPrev.on( 'click', function() {
					config.bb.prev();
					return false;
				} );
				config.$navJump.on( 'click', function() {
					config.bb.jump( totalSlides );
					return false;
				} );
				// add swipe events
				$slides.on( {
					'swipeleft'		: function( event ) {
						config.bb.next();
						return false;
					},
					'swiperight'	: function( event ) {
						config.bb.prev();
						return false;
					}
				} );
			};
			return { init : init };
		})();
		Page.init();
	},
	initSky:function(){
		var html = this.getSkyList(),
			current,
			that = this;
		var skyObj = $( '.sky-list ul' ).html(html).baraja();
		// circle
		$("#sky .circle").click(function(){
			skyObj.fan( {
						speed : 500,
						easing : 'ease-out',
						range : 330,
						direction : 'left',
						origin : { x : 50, y : 100 },
						center : true
					} );
		});
		// next
		$("#sky .next").click(function(){
			skyObj.next();
		});
		// prev
		$("#sky .prev").click(function(){
			skyObj.previous();
		});
		// change
		$("#sky .before,#sky .after").click(function(){
			var $this = $(this),
				html = that.getSkyList( $this.hasClass("before") ? 0 : 1 );
			if( !!skyMoving ) {
				return false;
			}
			skyMoving = true;
			setTimeout(function(){
				skyMoving = false;
			},200*(skyCount+1))
			$(".sky-list li").remove();
			skyObj.add( $(html) );
		});

	}
}

// func
$.extend(miya,{
	updateNav:function( rel ){
		$("nav a").removeClass("cur").filter("[rel='"+rel+"']").addClass("cur");
	},
	getSkyList:function( type ){
		var html = '';
		for(var i=0;i<=skyCount - 1;i++){
			if( type === 1 ){
				current = sky.pop();
				sky.unshift(current);
			}else{
				current = sky.shift();
				sky.push(current);
			}
			html += '<li><div class="pic"><img src="'+skyUrl+current.id+'.jpg"/></div><h4>'+current.location+'</h4> <p>'+current.date+'</p> </li>';
		}
		return html;
	}
});

// callbacks
$.extend(miya,{
	renderHome:function(){
		this.updateNav('home');
	},
	renderSky:function(){
		this.updateNav('sky');
	},
	renderSay:function(){
		this.updateNav('say');
	},
	renderAbout:function(){
		this.updateNav('about');
	}
})

$(function(){
	miya.init();
});