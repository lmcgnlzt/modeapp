// JavaScript Document

(function ($) {

$(window).load(function() {
	$("#status").fadeOut(); // will first fade out the loading animation
	$("#preloader").delay(400).fadeOut("medium"); // will fade out the white DIV that covers the website.
});

$(document).ready(function() {

	$('.footer-ball').hide();


    //Remove 300ms lag set by -webkit-browsers
    window.addEventListener('load', function() {
		FastClick.attach(document.body);
	}, false);

    $('.menu-wrapper').addClass('hide-menu-wrapper');
    var menu_slider = $(".menu");
    menu_slider.owlCarousel({
        autoPlay: false, //Set AutoPlay to 3 seconds
        scrollPerPage:true,
        pagination:false,
        rewindSpeed:0,
        items : 15,
        itemsDesktop : [1199,6],
        itemsDesktopSmall : [979,5],
        itemsTablet:	[768,4],
        itemsMobile:	[560,3]//,
        //afterInit : function(elem){
        //     this.jumpTo(0); //for 4th slide
        //}
    });

    var snapper = new Snap({
    	element: document.getElementById('content')
	});

	$('.open-menu, .footer-ball').click(function() {
		$('.hide-content').fadeIn(250);
        $('.header, .footer-ball').toggleClass('hide-header-left');
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
		return false;
	});

    $('#content, .hide-content .header').click(function(){
		$('hide-content').fadeOut(250);
       $('.header, .footer-ball').removeClass('hide-header-left');
    });

	$('.sidebar-close, .hide-content').click(function() {
		$('.hide-content').fadeOut(250);
        $('.header, .footer-ball').removeClass('hide-header-left');
		snapper.close();
	});

    $('.show-share-bottom').click(function(){
		$('.hide-content').fadeOut(250);
       $('.share-bottom').toggleClass('active-share-bottom');
        $('.header, .footer-ball').removeClass('hide-header-left');
        snapper.close();
        return false;
    });

    $('.close-share-bottom, #content, .open-menu, .open-more').click(function(){
       $('.share-bottom').removeClass('active-share-bottom');
    });



	//Animate.css scroll to begin animation //

	// var wow = new WOW(
	//   {
	// 	boxClass:     'animate',      // animated element css class (default is wow)
	// 	animateClass: 'animated',     // animation css class (default is animated)
	// 	offset:       0,              // distance to the element when triggering the animation (default is 0)
	// 	mobile:       true,           // trigger animations on mobile devices (true is default)
	//   }
	// );
	// wow.init();

	//Go up

	$('.footer-up').click(function() {
		$('#content').animate({
			scrollTop:0
		}, 800, 'easeInOutQuad');
		return false;
	});


	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")


	var time = 7; // time in seconds

	var $progressBar,
		$bar,
		$elem,
		isPause,
		tick,
		percentTime;


	//Init the carousel
	$(".homepage-slider").owlCarousel({
		slideSpeed : 500,
		paginationSpeed : 500,
		singleItem : true,
		pagination:false,
		afterInit : progressBar,
		afterMove : moved,
		startDragging : pauseOnDragging
	});

	//Init progressBar where elem is $("#owl-demo")
	function progressBar(elem){
		$elem = elem;
		//build progress bar elements
		buildProgressBar();
		//start counting
		start();
	}

	//create div#progressBar and div#bar then prepend to $("#owl-demo")
	function buildProgressBar(){
		$progressBar = $("<div>",{
			id:"progressBar"
		});
		$bar = $("<div>",{
			id:"bar"
		});
		$progressBar.append($bar).prependTo($elem);
	}

	function start() {
		//reset timer
		percentTime = 0;
		isPause = false;
		//run interval every 0.01 second
		tick = setInterval(interval, 10);
	};

	function interval() {
		if(isPause === false){
			percentTime += 1 / time;
			$bar.css({
			   width: percentTime+"%"
			 });
			//if percentTime is equal or greater than 100
			if(percentTime >= 100){
			  //slide to next item
			  $elem.trigger('owl.next')
			}
		}
	}

	//pause while dragging
	function pauseOnDragging(){
		isPause = true;
	}

	//moved callback
	function moved(){
		//clear interval
		clearTimeout(tick);
		//start again
		start();
	}



    //Coverpage Height 100%//
	var coverpage_height = 0;

	function initiate_coverpages(){
		coverpage_height =  $(window).height();
		$('.coverpage').css({ height: coverpage_height+1 });
	};

	initiate_coverpages();

	$(window).resize(function() {
		initiate_coverpages();
	});

	// $.scrollIt();


	//Show Back To Home When Scrolling
    $('.page-content-scroll').on('scroll', function () {
        // var total_scroll_height = $('.page-content-scroll')[0].scrollHeight
        var inside_header = ($(this).scrollTop() <= 150);
        var passed_header = ($(this).scrollTop() >= 0); //250
        // var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() +100 )));

        if (inside_header == true) {
        	$('.footer-ball').hide();
        } else if (passed_header == true)  {
        	$('.footer-ball').fadeIn();
        }
        // if (footer_reached == true){
        // }
    });


    //Generate Fullscreen Elemeents

    var screen_width = 0;
    var screen_height = 0;
    function resize_coverpage(){
        screen_width = $(window).width();
        screen_height = $(window).height();

         $('.coverpage-image').css({
            height: screen_height-1,
            width: screen_width
        });
        $('.landing-page').css({
            height: screen_height-1,
            width: screen_width
        });

         $('.slider-image').css({
            height: screen_height -60,
            width: screen_width
        });
    };
    resize_coverpage();
    $(window).resize(resize_coverpage);

	$(".coverpage-slider").owlCarousel({
		slideSpeed : 500,
		paginationSpeed : 2500,
		singleItem : true,
		pagination:true,
		afterInit : progressBar,
		afterMove : moved,
		startDragging : pauseOnDragging
	});

});

}(jQuery));