(function ($) {

$(window).load(function() {
	$("#status").fadeOut(); // will first fade out the loading animation
	$("#preloader").delay(400).fadeOut("medium"); // will fade out the white DIV that covers the website.
});


function shortenText(did) {
    var showChar = 80;
    var ellipsestext = "....";
    var moretext = "更多";
    var lesstext = "收起";
    $('#bio_'+did).each(function() {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = c + '<span>' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" id="morelink_' + did + '"" class="morelink">' + moretext + '</a></span>';
            $(this).html(html);
        }
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
        itemsTablet:    [768,4],
        itemsMobile:    [560,3]//,
        //afterInit : function(elem){
        //     this.jumpTo(0); //for 4th slide
        //}
    });


    $.each(JSON.parse($('#did_list').text()), function(i, did) {
        shortenText(did);
    });

    $('.designer_experience').slick({
    	slidesToShow: 4,
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

	//Go up
	$('.footer-up').click(function() {
		$('#content').animate({
			scrollTop:0
		}, 800, 'easeInOutQuad');
		return false;
	});

	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

});

}(jQuery));