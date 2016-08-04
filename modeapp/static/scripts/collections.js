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



function enable_widgets(did) {
	// experience brand logos
	$('#experience_'+did).slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 2500,
		});

 	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

	// experience gallery
	// var owlStaffControls = $("#staff-slider-"+did);
	// owlStaffControls.owlCarousel({
	// 	items : 1,
	// 	itemsDesktop : [1199,1],
	// 	itemsDesktopSmall : [980,1],
	// 	itemsTablet: [768,1],
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
	// $("#next-staff-"+did).click(function(){
	//   owlStaffControls.trigger('owl.next');
	//   return false;
	// });
	// $("#prev-staff-"+did).click(function(){
	//   owlStaffControls.trigger('owl.prev');
	//   return false;
	// });

	// signature picture
	$(".col_sig_pic_"+did).slick({
	  	slidesToShow: 2,
	  	slidesToScroll: 1,
	  	autoplay: true,
	  	autoplaySpeed: 2500,
	});


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
	        CONFIG.flip(); // loadable again
	     });
	});
}


function load_gallery_content(el, did, cid, gid) {
	// var garment = '#garment-'.concat(did, '-', cid, '-', gid);
	// $(garment).lightGallery({
	//     selector: 'this',
	//     download: false,
	//     closable: false,
	//     counter: false,
	// });
	// $(garment).click();

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
	        thumbnail:false,
	        thumbWidth: 70,
	        dynamicEl: elements,
	    })
	});
}


function load_experience_content(el, did, index) {
	$.getJSON(CONFIG.api_base_url().concat('/experience/pics'), {'did': did}, function(data) {
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
	        thumbnail: true,
	        thumbWidth: 60,
	        dynamicEl: elements,
	        index: index,
	    })
	});
}


$(document).ready(function() {

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

	window.load_works = function(el, did, index) {
		load_experience_content(el, did, index);
	}

	window.load_images = function(el, did, cid, gid) {
		load_gallery_content(el, did, cid, gid);
	}


	var dids = JSON.parse($('#dids').text());
	// console.log('dids:'+dids);
	first_did = dids.pop();
	enable_widgets(first_did);

	// console.log('setting dids:'+dids);
	CONFIG.set_dids(dids);


	//Show Back To Home When Scrolling
    $('.page-content-scroll').on('scroll', function () {
        // var total_scroll_height = $('.page-content-scroll')[0].scrollHeight
        // var inside_header = ($(this).scrollTop() <= 150);
        // var passed_header = ($(this).scrollTop() >= 0); //250
        var footer_reached = ($(this).scrollTop() >= ($('.page-content-scroll')[0].scrollHeight - ($(window).height() + 300 )));

        // if (inside_header == true) {
        // 	console.log('inside');
        // } else if (passed_header == true)  {
        // 	console.log('passed_header == true');
        // }
        if (footer_reached == true) {
    		if (CONFIG.is_loadable()) {
    			next_did = CONFIG.get_next();
    			CONFIG.flip();
    			load_more(next_did);
    		}
        }
    });


    var snapper = new Snap({
		element: document.getElementById('content')
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

});

}(jQuery));