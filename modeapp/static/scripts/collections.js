function load_gallery(el, did, cid, gid) {
	load_images(el, did, cid, gid);
}

function load_works(el, did, index) {
	load_works(el, did, index);
}


(function ($) {


$(window).load(function() {
	$("#status").fadeOut(); // will first fade out the loading animation
	$("#preloader").delay(400).fadeOut("medium"); // will fade out the white DIV that covers the website.
});


var CONFIG = (function() {
    var API_BASE_URL = '/api'; //shared variable available only inside module
    var VIEW_BASE_URL = '/collection_block'; //shared variable available only inside module
    var DIDS = [];
    var DID = 0;
    var LOADABLE = true;

    return {
        api_base_url: function() {
            return API_BASE_URL;
        },
        view_base_url: function() {
            return VIEW_BASE_URL;
        },
        set_dids(dids) {
        	DIDS = dids;
        },
        get_dids(dids) {
        	return DIDS;
        },
        // set_curr_did(did) {
        // 	DID = did;
        // },
        // get_curr_did(did) {
        // 	return DID;
        // },
        has_next() {
        	return DIDS.length > 0;
        },
        get_next() {
        	return DIDS.pop();
        },
        is_loadable() {
        	return LOADABLE && DIDS.length > 0;
        },
        flip() {
        	LOADABLE = !LOADABLE;
        }

    };
})();


// function shortenText(did) {
// 	var showChar = 55;
//     var ellipsestext = "....";
//     var moretext = "更多";
//     var lesstext = "收起";
//     $('#bio_'+did).each(function() {
//         var content = $(this).html();
//         if (content.length > showChar) {
//             var c = content.substr(0, showChar);
//             var h = content.substr(showChar, content.length - showChar);
//             var html = c + '<span>' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" id="morelink_' + did + '"" class="morelink">' + moretext + '</a></span>';
//             $(this).html(html);
//         }
//     });
//     $("#morelink_"+did).click(function() {
//         if ($(this).hasClass("less")) {
//             $(this).removeClass("less");
//             $(this).html(moretext);
//         } else {
//             $(this).addClass("less");
//             $(this).html(lesstext);
//         }
//         $(this).parent().prev().toggle();
//         $(this).prev().toggle();
//         return false;
//     });
// }


function enable_widgets(did) {
	// experience brand logos
	$('#experience_'+did).slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 2500,
		});

	// bio shorten text
 	// shortenText(did);

 	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

	// experience gallery
	var owlStaffControls = $("#staff-slider-"+did);
	owlStaffControls.owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [980,1],
		itemsTablet: [768,1],
		itemsTabletSmall: [480,1],
		itemsMobile : [370,1],
		singleItem : false,
		itemsScaleUp : false,
		slideSpeed : 250,
		paginationSpeed : 250,
		rewindSpeed : 250,
		pagination:false,
		autoPlay : false,
		autoHeight: false,
	});
	$("#next-staff-"+did).click(function(){
	  owlStaffControls.trigger('owl.next');
	  return false;
	});
	$("#prev-staff-"+did).click(function(){
	  owlStaffControls.trigger('owl.prev');
	  return false;
	});

	// signature picture
	$("#sig_pic_"+did).slick({
		  slidesToShow: 1,
		  // slidesToScroll: 1,
		  // autoplay: false,
		  // autoplaySpeed: 2500,
		});

	// // signature video
	// var collection_video_prefix = 'collection-video-'.concat(did, '-');
	// $("ul[id^='" + collection_video_prefix + "']").each(function(i, el) {
	// 	$(el).on('onBeforeOpen.lg',function(event){
	// 		$('#red-footer-ball').hide();
	// 	});

	// 	$(el).on('onCloseAfter.lg',function(event){
	// 	    $('#red-footer-ball').show();
	// 	});

	// 	$(el).lightGallery({
	// 	    closable: false,
	// 	    download: false,
	// 	});
	// });

	//Countdown timer
	var target_date = $('#target_date_'+did).text();
	$('#countdown_'+did).countdown({
	  date: target_date,
	  render: function(data) {
		$(this.el).html(
		"<div class='countdown-box box-years'><div class='countdown-years'>" + this.leadingZeros(data.years, 2) +
		"</div><span>years</span></div><div class='countdown-box box-days'><div class='countdown-days'>" + this.leadingZeros(data.days, 2) +
		"</div><span>days</span></div><div class='countdown-box box-hours'><div class='countdown-hours'>" + this.leadingZeros(data.hours, 2) +
		"</div><span>hours</span></div><div class='countdown-box box-minutes'><div class='countdown-minutes'>" + this.leadingZeros(data.min, 2) +
		"</div><span>min</span></div><div class='countdown-box box-seconds'><div class='countdown-seconds'>" + this.leadingZeros(data.sec, 2) +
		"</div><span>sec</span></div>");
	  }
	});

}



function load_more(did) {
	$.getJSON(CONFIG.api_base_url().concat('/next_collections/', did), function(data) {
	    $('#designer'+did).hide().html(data['designer']).fadeIn('slow').promise().done(function(){
	        enable_widgets(did); // activate js widgets
	        // console.log('enable_widgets for did:' + did);
	        CONFIG.flip(); // loadable again
	     });
	});
}


function load_gallery_content(el, did, cid, gid) {
	$.getJSON(CONFIG.api_base_url().concat('/garments'), {'did': did, 'cid': cid, 'gid': gid}, function(data) {
	    $(el).on('onBeforeOpen.lg',function(event){
			$('#red-footer-ball').hide();
		});

		$(el).on('onCloseAfter.lg',function(event){
		    $('#red-footer-ball').show();
		});

		elements = [];
		for (var i=0; i<data['details'].length; i++) {
			item = {
				'src': data['details'][i].image,
				'thumb': data['details'][i].image,
				'subHtml': '<p>'.concat(data['details'][i].title, '</p>'),
			}
			elements.push(item);
		}

	    $(el).lightGallery({
	        dynamic: true,
	        download: false,
	        closable: false,
	        thumbWidth: 70,
	        dynamicEl: elements,
	    })
	});
}


function load_experience_content(el, did, index) {
	$.getJSON(CONFIG.api_base_url().concat('/experience/sig_pics'), {'did': did}, function(data) {
	    $(el).on('onBeforeOpen.lg',function(event){
			$('#red-footer-ball').hide();
		});

		$(el).on('onCloseAfter.lg',function(event){
		    $('#red-footer-ball').show();
		});

		elements = [];
		for (var i=0; i<data.length; i++) {
			item = {
				'src': data[i]['image'],
				'thumb': data[i]['image'],
				'subHtml': '<p>'.concat(data[i]['title'], '</p>'),
			}
			elements.push(item);
		}

	    $(el).lightGallery({
	        dynamic: true,
	        download: false,
	        closable: false,
	        thumbWidth: 60,
	        dynamicEl: elements,
	        index: index,
	    })
	});
}


$(document).ready(function() {
	// var curr_did = JSON.parse($('#curr_did').text());
	// enable_widgets(curr_did);
	// console.log('curr_did:'+curr_did);
	// CONFIG.set_curr_did(curr_did);

	var dids = JSON.parse($('#dids').text());
	// console.log('dids:'+dids);
	first_did = dids.pop();
	enable_widgets(first_did);

	// console.log('setting dids:'+dids);
	CONFIG.set_dids(dids);

	// for (var i=0; i<dids.length; i++) {
	// 	enable_widgets(dids[i]);
	// }


	// $('#loadmore').click(function(){
	// 	$('#loadgif').addClass('fa-spinner fa-spin fa-3x fa-fw').removeClass('fa-arrow-down');
	// 	setTimeout(function() {load_more();}, 800);
	// });


	window.load_works = function(el, did, index) {
		load_experience_content(el, did, index);
	}

	window.load_images = function(el, did, cid, gid) {
		load_gallery_content(el, did, cid, gid);
	}


    //Remove 300ms lag set by -webkit-browsers
    window.addEventListener('load', function() {
		FastClick.attach(document.body);
	}, false);




	//Show Back To Home When Scrolling
    $('.page-content-scroll').on('scroll', function () {
        // var total_scroll_height = $('.page-content-scroll')[0].scrollHeight
        // var inside_header = ($(this).scrollTop() <= 150);
        // var passed_header = ($(this).scrollTop() >= 0); //250
        var footer_reached = ($(this).scrollTop() >= ($('.page-content-scroll')[0].scrollHeight - ($(window).height() + 100 )));

        // if (inside_header == true) {
        // 	console.log('inside');
        // } else if (passed_header == true)  {
        // 	console.log('passed_header == true');
        // }
        if (footer_reached == true){

    		if (CONFIG.is_loadable()) {
    			next_did = CONFIG.get_next();
    			// console.log('request next block for did:'+next_did);
    			CONFIG.flip();
    			load_more(next_did);
    		}
        }
    });





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


	$('.open-menu, .footer-ball').click(function() {
		// $(".ui-loader").hide(); // hide loading on the bottom again to avoid UI
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
       // $(".ui-loader").show(); // show loading on the bottom again
    });

	$('.sidebar-close, .hide-content').click(function() {
		$('.hide-content').fadeOut(250);
        $('.header, .footer-ball').removeClass('hide-header-left');
        // $(".ui-loader").show(); // show loading on the bottom again
		snapper.close();
	});

	var snapper = new Snap({
	  element: document.getElementById('content')
	});

    //Sharebox Settings//

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

 //    //Countdown timer

	// var endDate = "June 7, 2015 15:03:25";

	// $('.countdown').countdown({
	//   date: endDate,
	//   render: function(data) {
	// 	$(this.el).html(
	// 	"<div class='countdown-box box-years'><div class='countdown-years'>" + this.leadingZeros(data.years, 2) +
	// 	"</div><span>years</span></div><div class='countdown-box box-days'><div class='countdown-days'>" + this.leadingZeros(data.days, 2) +
	// 	"</div><span>days</span></div><div class='countdown-box box-hours'><div class='countdown-hours'>" + this.leadingZeros(data.hours, 2) +
	// 	"</div><span>hours</span></div><div class='countdown-box box-minutes'><div class='countdown-minutes'>" + this.leadingZeros(data.min, 2) +
	// 	"</div><span>min</span></div><div class='countdown-box box-seconds'><div class='countdown-seconds'>" + this.leadingZeros(data.sec, 2) +
	// 	"</div><span>sec</span></div>");
	//   }
	// });


	//Animate.css scroll to begin animation //

	var wow = new WOW(
	  {
		boxClass:     'animate',      // animated element css class (default is wow)
		animateClass: 'animated',     // animation css class (default is animated)
		offset:       0,              // distance to the element when triggering the animation (default is 0)
		mobile:       true,           // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();

	//Go up

	$('.footer-up').click(function() {
		$('#content').animate({
			scrollTop:0
		}, 800, 'easeInOutQuad');
		return false;
	});

	// //Portfolio//
	// $('.adaptive-one-activate').click(function() {
	// 	$('.portfolio-adaptive').removeClass('adaptive-three');
	// 	$('.portfolio-adaptive').removeClass('adaptive-two');
	// 	$('.portfolio-adaptive').addClass('adaptive-one');
	// 	$(this).addClass('active-adaptive-style');
	// 	$('.adaptive-two-activate, .adaptive-three-activate').removeClass('active-adaptive-style');
	// 	return false;
	// });

	// $('.adaptive-two-activate').click(function() {
	// 	$('.portfolio-adaptive').removeClass('adaptive-three');
	// 	$('.portfolio-adaptive').addClass('adaptive-two');
	// 	$('.portfolio-adaptive').removeClass('adaptive-one');
	// 	$(this).addClass('active-adaptive-style');
	// 	$('.adaptive-three-activate, .adaptive-one-activate').removeClass('active-adaptive-style');
	// 	return false;
	// });

	// $('.adaptive-three-activate').click(function() {
	// 	$('.portfolio-adaptive').addClass('adaptive-three');
	// 	$('.portfolio-adaptive').removeClass('adaptive-two');
	// 	$('.portfolio-adaptive').removeClass('adaptive-one');
	// 	$(this).addClass('active-adaptive-style');
	// 	$('.adaptive-two-activate, .adaptive-one-activate').removeClass('active-adaptive-style');
	// 	return false;
	// });


	//Close Sharebox//

	$('.open-sharebox').click(function() {
		$('.sharebox-wrapper').fadeIn(200);
	});

	$('.close-sharebox').click(function() {
		$('.sharebox-wrapper').fadeOut(200);
	});

	$('.open-loginbox').click(function() {
		$('.loginbox-wrapper').fadeIn(200);
	});

	$('.close-loginbox').click(function() {
		$('.loginbox-wrapper').fadeOut(200);
	});

	// //Checkboxes

	// $('.checkbox-one').click(function() {
	// 	$(this).toggleClass('checkbox-one-checked');
	// 	return false;
	// });
	// $('.checkbox-two').click(function() {
	// 	$(this).toggleClass('checkbox-two-checked');
	// 	return false;
	// });
	// $('.checkbox-three').click(function() {
	// 	$(this).toggleClass('checkbox-three-checked');
	// 	return false;
	// });
	// $('.radio-one').click(function() {
	// 	$(this).toggleClass('radio-one-checked');
	// 	return false;
	// });
	// $('.radio-two').click(function() {
	// 	$(this).toggleClass('radio-two-checked');
	// 	return false;
	// });

 //    //Reminders & Checklists

 //    $('.reminder-check-square').click(function(){
 //       $(this).toggleClass('reminder-check-square-selected');
 //        return false;
 //    });

 //    $('.reminder-check-round').click(function(){
 //       $(this).toggleClass('reminder-check-round-selected');
 //        return false;
 //    });

 //    $('.checklist-square').click(function(){
 //       $(this).toggleClass('checklist-square-selected');
 //        return false;
 //    });

 //    $('.checklist-round').click(function(){
 //       $(this).toggleClass('checklist-round-selected');
 //        return false;
 //    });

 //    //Switches

 //    $('.switch-1').click(function(){
 //       $(this).toggleClass('switch-1-on');
 //        return false;
 //    });

 //    $('.switch-2').click(function(){
 //       $(this).toggleClass('switch-2-on');
 //        return false;
 //    });

 //    $('.switch-3').click(function(){
 //       $(this).toggleClass('switch-3-on');
 //        return false;
 //    });

 //    $('.switch, .switch-icon').click(function(){
 //        $(this).parent().find('.switch-box-content').slideToggle(200);
 //        $(this).parent().find('.switch-box-subtitle').slideToggle(200);
 //        return false;
 //    });


	// //Notifications

	// $('.tap-dismiss-notification').click(function() {
	// 	$(this).slideUp(200);
	// 	return false;
	// });

	// $('.close-big-notification').click(function() {
	// 	$(this).parent().slideUp(200);
	// 	return false;
	// });

	// $('.notification-top').addClass('show-notification-top');

	// $('.hide-top-notification').click(function(){
	// 	$('.notification-top').removeClass('show-notification-top');
	// });

	// //Tabs
	// $('.tab-but-1').click(function() {
	// 	$('.tab-but').removeClass('tab-active');
	// 	$('.tab-but-1').addClass('tab-active');
	// 	$('.tab-content').slideUp(200);
	// 	$('.tab-content-1').slideDown(200);
	// 	return false;
	// });

	// $('.tab-but-2').click(function() {
	// 	$('.tab-but').removeClass('tab-active');
	// 	$('.tab-but-2').addClass('tab-active');
	// 	$('.tab-content').slideUp(200);
	// 	$('.tab-content-2').slideDown(200);
	// 	return false;
	// });

	// $('.tab-but-3').click(function() {
	// 	$('.tab-but').removeClass('tab-active');
	// 	$('.tab-but-3').addClass('tab-active');
	// 	$('.tab-content').slideUp(200);
	// 	$('.tab-content-3').slideDown(200);
	// 	return false;
	// });

	// $('.tab-but-4').click(function() {
	// 	$('.tab-but').removeClass('tab-active');
	// 	$('.tab-but-4').addClass('tab-active');
	// 	$('.tab-content').slideUp(200);
	// 	$('.tab-content-4').slideDown(200);
	// 	return false;
	// });

	// $('.tab-but-5').click(function() {
	// 	$('.tab-but').removeClass('tab-active');
	// 	$('.tab-but-5').addClass('tab-active');
	// 	$('.tab-content').slideUp(200);
	// 	$('.tab-content-5').slideDown(200);
	// 	return false;
	// });

	// //Toggles

	// $('.deploy-toggle-1').click(function() {
	// 	$(this).parent().find('.toggle-content').slideToggle(200);
	// 	$(this).toggleClass('toggle-1-active');
	// 	return false;
	// });

	// $('.deploy-toggle-2').click(function() {
	// 	$(this).parent().find('.toggle-content').slideToggle(200);
	// 	$(this).toggleClass('toggle-2-active');
	// 	return false;
	// });

	// $('.deploy-toggle-3').click(function() {
	// 	$(this).parent().find('.toggle-content').slideToggle(200);
	// 	$(this).find('em strong').toggleClass('toggle-3-active-ball');
	// 	$(this).find('em').toggleClass('toggle-3-active-background');
	// 	return false;
	// });

	// //Submenu Nav

	// $('.submenu-nav-deploy').click(function() {
	// 	$(this).toggleClass('submenu-nav-deploy-active');
	// 	$(this).parent().find('.submenu-nav-items').slideToggle(200);
	// 	return false;
	// });

	// //Sliding Door

	// $('.sliding-door-top').click(function() {
	// 	$(this).animate({
	// 		left:'101%'
	// 	}, 500, 'easeInOutExpo');
	// 	return false;
	// });

	// $('.sliding-door-bottom a em').click(function() {
	// 	$(this).parent().parent().parent().find('.sliding-door-top').animate({
	// 		left:'0px'
	// 	}, 500, 'easeOutBounce');
	// 	return false

	// });

	/////////////////////////////////////////////////////////////////////////////////////////////
	//Detect user agent for known mobile devices and show hide elements for each specific element
	/////////////////////////////////////////////////////////////////////////////////////////////

	var isiPhone = 		navigator.userAgent.toLowerCase().indexOf("iphone");
	var isiPad = 		navigator.userAgent.toLowerCase().indexOf("ipad");
	var isiPod = 		navigator.userAgent.toLowerCase().indexOf("ipod");
	var isiAndroid = 	navigator.userAgent.toLowerCase().indexOf("android");

	if(isiPhone > -1) 	 {		 $('.ipod-detected').hide();		 $('.ipad-detected').hide();		 $('.iphone-detected').show();		 $('.android-detected').hide();	 }
	if(isiPad > -1)	 {		 	 $('.ipod-detected').hide();		 $('.ipad-detected').show();		 $('.iphone-detected').hide();		 $('.android-detected').hide();	 }
	if(isiPod > -1)	 {		 	 $('.ipod-detected').show();		 $('.ipad-detected').hide();		 $('.iphone-detected').hide();		 $('.android-detected').hide();	 }
	if(isiAndroid > -1) {		 $('.ipod-detected').hide();		 $('.ipad-detected').hide();		 $('.iphone-detected').hide();		 $('.android-detected').show();	 }


	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

	// var owlStaffControls = $(".staff-slider");
	// owlStaffControls.owlCarousel({
	// 	//Basic Stuff
	// 	items : 3,
	// 	itemsDesktop : [1199,3],
	// 	itemsDesktopSmall : [980,3],
	// 	itemsTablet: [768,2],
	// 	itemsTabletSmall: [480,1],
	// 	itemsMobile : [370,1],
	// 	singleItem : false,
	// 	itemsScaleUp : false,
	// 	slideSpeed : 250,
	// 	paginationSpeed : 250,
	// 	rewindSpeed : 250,
	// 	pagination:false,
	// 	autoPlay : false,
	// 	autoHeight: false,
	// });

	// $(".next-staff").click(function(){
	//   owlStaffControls.trigger('owl.next');
	//   return false;
	// });
	// $(".prev-staff").click(function(){
	//   owlStaffControls.trigger('owl.prev');
	//   return false;
	// });

	// var owlQuoteSlider = $(".quote-slider");
	// owlQuoteSlider.owlCarousel({
	// 	items : 1,
	// 	itemsDesktop : [1199,1],
	// 	itemsDesktopSmall : [980,1],
	// 	itemsTablet: [768,1],
	// 	itemsTabletSmall: [480,1],
	// 	itemsMobile : [370,1],
	// 	singleItem : false,
	// 	itemsScaleUp : false,
	// 	slideSpeed : 800,
	// 	paginationSpeed : 300,
	// 	rewindSpeed : 250,
	// 	pagination:false,
	// 	autoPlay : true,
	// });

	// $(".next-quote").click(function() {
	//   owlQuoteSlider.trigger('owl.next');
	//   return false;
	// });
	// $(".prev-quote").click(function() {
	//   owlQuoteSlider.trigger('owl.prev');
	//   return false;
	// });

	/////////////////
	//Image Gallery//
	/////////////////
	// $(".swipebox").swipebox({
	// 	useCSS : true, // false will force the use of jQuery for animations
	// 	hideBarsDelay : 3000 // 0 to always show caption and action bar
	// });

	// $(".wide-gallery-item").swipebox({
	// 	useCSS : true, // false will force the use of jQuery for animations
	// 	hideBarsDelay : 3000 // 0 to always show caption and action bar
	// });

	var time = 7; // time in seconds

	var $progressBar,
		$bar,
		$elem,
		isPause,
		tick,
		percentTime;


	//Init the carousel
	$("#collection-slider").owlCarousel({
		// slideSpeed : 50,
		// paginationSpeed : 50,
		// rewindSpeed : 50,
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
		tick = setInterval(interval, 2);
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


	// // Custom Navigation Events
	// $(".next-home").click(function() {
	// 	$(".homepage-slider").trigger('owl.next');
	// 	return false;
	// });
	// $(".prev-home").click(function() {
	// 	$(".homepage-slider").trigger('owl.prev');
	// 	return false;
	// });


 //    //Coverpage Height 100%//

	// var coverpage_height = 0;

	// function initiate_coverpages(){
	// 	coverpage_height =  $(window).height();
	// 	$('.coverpage').css({ height: coverpage_height+1 });
	// };

	// initiate_coverpages();

	// $(window).resize(function() {
	// 	initiate_coverpages();
	// });

	// $.scrollIt();


 //    //Generate Fullscreen Elemeents

 //    var screen_width = 0;
 //    var screen_height = 0;
 //    function resize_coverpage(){
 //        screen_width = $(window).width();
 //        screen_height = $(window).height();

 //         $('.coverpage-image').css({
 //            height: screen_height -60,
 //            width: screen_width
 //        });
 //        $('.landing-page').css({
 //            height: screen_height-1,
 //            width: screen_width
 //        });

 //         $('.slider-image').css({
 //            height: screen_height -60,
 //            width: screen_width
 //        });
 //    };
 //    resize_coverpage();
 //    $(window).resize(resize_coverpage);

	// $(".full-slider").owlCarousel({
	// 	slideSpeed : 500,
	// 	paginationSpeed : 500,
	// 	singleItem : true,
	// 	pagination:false,
	// 	afterInit : progressBar,
	// 	afterMove : moved,
	// 	startDragging : pauseOnDragging
	// });

	// $(".coverpage-slider").owlCarousel({
	// 	slideSpeed : 500,
	// 	paginationSpeed : 500,
	// 	singleItem : true,
	// 	pagination:true,
	// 	afterInit : progressBar,
	// 	afterMove : moved,
	// 	startDragging : pauseOnDragging
	// });

});

}(jQuery));


    /*  Menu Slider Mouse Scroll - Test Purpose Only. Can be deleted


    var selected_menu_item = document.getElementById( "selected" );
    var selected_menu_item_number = ($( ".menu a" ).index( selected_menu_item ) );
    menu_slider.trigger('owl.jumpTo', selected_menu_item_number);

    console.log(selected_menu_item_number);

    var scl=0; // Create a variable
    window.setInterval(function(){
       scl=0; // Reset this variable every 0.5 seconds
    }, 500);

    $('.menu').on('DOMMouseScroll mousewheel', function (e) {
        if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
        while(scl==0) {
            menu_slider.trigger('owl.next');
            scl++;
        }
    } else {
        while(scl==0) {
            menu_slider.trigger('owl.prev');
            scl++;
        }
    }
    });*/