function load_gallery(el, did, cid, gid) {
	load_images(el, did, cid, gid);
}

function load_works(el, did, index) {
	load_works(el, did, index);
}

function like(el, did) {
	like(el, did);
}

function wish(el, did) {
	wish(el, did);
}


(function ($) {

$(window).load(function() {
	$("#status").fadeOut(); // will first fade out the loading animation
	$("#preloader").delay(400).fadeOut("medium"); // will fade out the white DIV that covers the website.
});


function shortenText(did) {
    var ellipsestext = "....";
    var moretext = "更多";
    var lesstext = "收起";
    $('#bio_'+did).each(function() {
        var content = $(this).html();
        var firstParaIndex = content.indexOf('</p>')+4
        var c = content.substr(0, firstParaIndex);
        var h = content.substr(firstParaIndex, content.length - firstParaIndex);
        var html = c + '<span>' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" id="morelink_' + did + '"" class="morelink">' + moretext + '</a></span>';
        $(this).html(html);
    });
    $("#morelink_"+did).click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}


var CONFIG = (function() {
    var API_BASE_URL = '/api'; //shared variable available only inside module

    return {
        api_base_url: function() {
            return API_BASE_URL;
        },
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

	// bio shorten text
 	shortenText(did);

	// experience gallery
	var owlStaffControls = $("#staff-slider-"+did);
	owlStaffControls.owlCarousel({
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,2],
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

	// // exclusive video
	// var exclusive_video_prefix = 'exclusive-video-'.concat(did, '-');
	// $("ul[id^='" + exclusive_video_prefix + "']").each(function(i, el) {
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

	// signature picture
	$(".col_sig_pic_"+did).slick({
	  	slidesToShow: 2,
	  	slidesToScroll: 1,
	  	autoplay: true,
	  	autoplaySpeed: 2500,
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
	        closable: false,
	        download: false,
	        thumbnail: false,
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
	        closable: false,
	        download: false,
	        thumbnail: true,
	        thumbWidth: 70,
	        dynamicEl: elements,
	        index: index,
	    })
	});
}


function do_like(el, did) {
	$.getJSON(CONFIG.api_base_url().concat('/designers/'+did+'/like'), function(data) {
		$('#like_count').html(data + ' Likes');
	});
}


function do_wish(el, did) {
	$.getJSON(CONFIG.api_base_url().concat('/designers/'+did+'/wish'), function(data) {
		$('#wish_count').html(data + ' Wishes');
	});
}



$(document).ready(function() {

	var did = $('#curr_did').text();
	// CONFIG.set_did(did);
	enable_widgets(did);


	window.load_works = function(el, did, index) {
		load_experience_content(el, did, index);
	}

	window.load_images = function(el, did, cid, gid) {
		load_gallery_content(el, did, cid, gid);
	}

	window.like = function(el, did) {
		do_like(el, did);
	}

	window.wish = function(el, did) {
		do_wish(el, did);
	}


	// $('.shop-garment').on('onBeforeOpen.lg',function(event){
	// 	$('#red-footer-ball').hide();
	// });

	// $('.shop-garment').on('onCloseAfter.lg',function(event){
	//     $('#red-footer-ball').show();
	// });


	var snapper = new Snap({
		element: document.getElementById('content')
	});

	//Send Message Settings//
	$('#submit_text').on('click',function() {
		if ($('#text_area').val()) {
			$(this).val('发送中 ....').attr('disabled','disabled');
	    	setTimeout(function(){
	    		$('#submit_text').val('发送成功');
	    		setTimeout(function() {$('.message-bottom').removeClass('active-message-bottom');}, 600);
	    	}, 1000);
		}
	});

	$('.show-message-bottom').click(function(){
    	$('#submit_text').val('发送').removeAttr("disabled");
    	$('#text_area').val('');
		$('.hide-content').fadeOut(250);
       	$('.message-bottom').toggleClass('active-message-bottom');
        $('.header, .footer-ball').removeClass('hide-header-left');
        snapper.close();
        return false;
    });

    $('.close-message-bottom, #content, .open-menu, .open-more').click(function(){
       $('.message-bottom').removeClass('active-message-bottom');
    });


    // QR share widgets
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


    //Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

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

	//Go up
	$('.footer-up').click(function() {
		$('#content').animate({
			scrollTop:0
		}, 800, 'easeInOutQuad');
		return false;
	});

});

}(jQuery));