// jQuery(function($) {

// 	$('#flux').bind('scroll', function(){
//             if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
//             {
//               alert('end reached');
//             }
//       })


// 	// var waypoint = new Waypoint({
// 	//   element: document.getElementById('basic-waypoint'),
// 	//   handler: function(direction) {
// 	//     if (direction=='down') {
// 	//     	alert('Basic waypoint triggered, Direction: ' + direction);
// 	//     }
// 	//   },
// 	//   offset: 500
// 	// })


// 	// var infinite = new Waypoint.Infinite({
// 	//   element: $('.infinite-container')[0]
// 	// });
// 	// alert(infinite);



// 	// $('.jscroll').jscroll();


	// $(window).scroll(function() {
	//     if($(window).scrollTop() == $(document).height() - $(window).height()) {
	//            // ajax call get data from server and append to the div
	//            alert('load more');
	//     }
	// });



// 	// $('#someselector').on('appear', function(event, $all_appeared_elements) {
//  //      // this element is now inside browser viewport
//  //      alert('got it!!!!');
//  //    });


//     // $('#someselector').appear();



//  //    var win = $(window);

// 	// // Each time the user scrolls
// 	// win.scroll(function() {
// 	// 	// End of the document reached?
// 	// 	if ($(document).height() - win.height() == win.scrollTop()) {
// 	// 		alert('here');
// 	// 		// $('#loading').show();

// 	// 		// $.ajax({
// 	// 		// 	url: 'get-post.php',
// 	// 		// 	dataType: 'html',
// 	// 		// 	success: function(html) {
// 	// 		// 		$('#posts').append(html);
// 	// 		// 		$('#loading').hide();
// 	// 		// 	}
// 	// 		// });
// 	// 	}
// 	// });

// });



// jQuery(function($){

	// $('.history_videos').waypoint(function() {
	//    alert('You have scrolled to history_videos.');
	// });

	// var waypoints = $('#myVideo_demo1').waypoint({
	//   handler: function() {
	//     alert('myVideo_demo1!!!!!')
	//   },
	//   // context: '#overflow-scroll-offset',
	//   // offset: '50%'
	// })


	// $(window).scroll(function (event) {
	//     var scroll = $(window).scrollTop();
	//     // Do something
	//     alert(scroll);
	// });

	// $('.folding-text').shorten();


	// shortenText();

 // 	function shortenText(){
 // 		var showChar = 150;
	//     var ellipsestext = "...";
	//     var moretext = "更多";
	//     var lesstext = "收起";
	//     $('.more').each(function() {
	//         var content = $(this).html();
	//         if (content.length > showChar) {
	//             var c = content.substr(0, showChar);
	//             // var h = content.substr(showChar - 1, content.length - showChar);
	//             var h = content.substr(showChar, content.length - showChar);
	//             var html = c + '<span>' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
	//             $(this).html(html);
	//         }
	//     });
	//     $(".morelink").click(function() {
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
 // 	}


	// var showChar = 150;
 //    var ellipsestext = "...";
 //    var moretext = "更多";
 //    var lesstext = "收起";
 //    $('.more').each(function() {
 //        var content = $(this).html();
 //        if (content.length > showChar) {
 //            var c = content.substr(0, showChar);
 //            // var h = content.substr(showChar - 1, content.length - showChar);
 //            var h = content.substr(showChar, content.length - showChar);
 //            var html = c + '<span class="moreelipses">' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 //            $(this).html(html);
 //        }
 //    });
 //    $(".morelink").click(function() {
 //        if ($(this).hasClass("less")) {
 //            $(this).removeClass("less");
 //            $(this).html(moretext);
 //        } else {
 //            $(this).addClass("less");
 //            $(this).html(lesstext);
 //        }
 //        $(this).parent().prev().toggle();
 //        $(this).prev().toggle();
 //        return false;
 //    });


// });



$(document).ready(function() {


	// $("#magazine1").slick({slidesToShow: 1});
	// $("#magazine2").slick({slidesToShow: 1});
	// $("#magazine3").slick({slidesToShow: 1});
	// $("#magazine4").slick({slidesToShow: 1});






	$('#image-gallery').lightSlider({
                gallery:true,
                item:1,
                thumbItem:9,
                slideMargin: 0,
                auto:false,
                onSliderLoad: function() {
                    $('#image-gallery').removeClass('cS-hidden');
                }
            });





	// $('.jscroll').jscroll({
	// 	// loadingHtml: '<img src="images/index/loading.gif" alt="Loading" /> Loading...',
	// 	padding: 200,
	// 	// loadingFunction:call(),
	// 	// callback:call()
	// });

	// function call()
 //    {
 //        console.log("ajax append more content");
 //    }

 // 	$(window).scroll(function() {
 // 		alert('??');
	//    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	//        alert("near bottom!");
	//    }
	// });

	// var waypoints = $('#myVideo_demo1').waypoint({
	//   handler: function() {
	//     alert('myVideo_demo1!!!!!')
	//   },
	//   // context: '#overflow-scroll-offset',
	//   // offset: '50%'
	// })

});



// jQuery(function($){
//   $(window).scroll(function(){
//     var aTop = $('.history_videos').height();
//     alert(aTop);
//     // console.log($(this).scrollTop());
//     // if($(this).scrollTop()>=aTop){
//     //     alert('header just passed.');
//     // }
//   });
// });


// $(document).on( 'scroll', '#main-container', function(){
//     alert('Event Fired');
// 	});