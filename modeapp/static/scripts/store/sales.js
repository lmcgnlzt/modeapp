
var CONFIG = (function() {
    var API_BASE_URL = '/api'; //shared variable available only inside module
    var INPUT_FIELDS = ['tags', 'name', 'original_price', 'sales_price', 'size'];

    return {
        api_base_url: function() {
            return API_BASE_URL;
        },
    };
})();

String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}


function item_block(index) {
    var block = '\
                    <div id="{0}" class="decoration"></div>\
                    <div id="{1}" class="store-check-out-1 full-bottom">\
                        <div class="store-input">\
                            <h6>吊牌号码 (*)</h6>\
                            <input id="{2}" type="text">\
                        </div>\
                        <div class="store-input">\
                            <h6>单品名称</h6>\
                            <input id="{3}" type="text">\
                        </div>\
                        <div class="one-half">\
                            <div class="store-input">\
                                <h6>原始价格</h6>\
                                <input id="{4}" type="text">\
                            </div>\
                        </div>\
                        <div class="one-half last-column">\
                            <div class="store-input">\
                                <h6>成交价格 (*)</h6>\
                                <input id="{5}" class="sales_price" type="text">\
                            </div>\
                        </div>\
                        <div class="clear"></div>\
                        <div class="store-input">\
                            <h6>尺寸 (*)</h6>\
                            <a index="{6}" size="XS" href="#" class="sizebutton button button-disabled button-xs {7}">XS</a>\
                            <a index="{6}" size="S" href="#" class="sizebutton button button-disabled button-s {7}">S</a>\
                            <a index="{6}" size="M" href="#" class="sizebutton button button-disabled {7}">M</a>\
                            <a index="{6}" size="L" href="#" class="sizebutton button button-disabled button-l {7}">L</a>\
                            <a index="{6}" size="XL" href="#" class="sizebutton button button-disabled button-xl {7}">XL</a>\
                            <a index="{6}" size="F" href="#" class="sizebutton button button-disabled button-f {7}">F</a>\
                            <a index="{6}" size="F+" href="#" class="sizebutton button button-disabled button-fp {7}">F+</a>\
                            <input id="{8}" style="display: none;" type="text">\
                        </div>\
                        <div class="clear"></div>\
                    </div>\
    ';
    return String.format(block,
                        'dec_'+index,
                        'item_'+index,
                        'tags_'+index,
                        'name_'+index,
                        'original_price_'+index,
                        'sales_price_'+index,
                        index,
                        'btn_'+index,
                        'size_'+index
                        );
}


function present_qr(qr_image_url) {
    var qr_code_content = '\
        <div class="qrpage-header-clear"></div>\
        <div class="login-page bg1">\
            <div class="login-page-overlay"></div>\
            <div class="login-page-wrapper">\
                <a href="#" class="login-logo"></a>\
                <p>\
                    消费积分二维码\
                </p>\
                <img id="qr_code" src="{0}">\
                <a id="complete_scan" href="#" class="button button-green button-fullscreen-bottom">完成并返回</a>\
                <div class="clear"></div>\
            </div>\
        </div>\
    ';
    $('#page-content').replaceWith(String.format(qr_code_content, qr_image_url));

    $('#complete_scan').click(function(e){
        e.preventDefault(); //preventing the link from being followed.

        swal({
            title: "确定返回吗?",
            text: "二维码本页面内有效，长按保存备份至手机",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: true
        },
        function(){
            window.location.replace("/sales_view");
        });

    });

}


function activate_autocomplete(index) {
    var options = {
        url: function() {
            return CONFIG.api_base_url().concat('/sales/tags');
        },
        getValue: "tag",
        placeholder: "tips: 方便快速查询，输入最后三位，点选",
        adjustWidth: false,
        template: {
            type: "description",
            fields: {
                description: "name"
            }
        },
        list: {
            maxNumberOfElements: 5,
            match: {
                enabled: true
            },
            showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function() {}
                },
            onChooseEvent: function() {
                var tag = $("#tags_"+index).getSelectedItemData().tag;
                var name = $("#tags_"+index).getSelectedItemData().name;

                $.getJSON(CONFIG.api_base_url().concat('/sales/items/', tag), function(data) {
                    $('#name_'+index).val(data['name']);
                    $('#original_price_'+index).val(data['original_price']);

                    // disable buttons based on available sizes
                    $('.btn_'+index).each(function(){
                        if ($.inArray($(this).attr('size'), data['available_sizes']) != -1) {
                            $(this).removeClass('button-disabled').removeClass('button-grey').addClass('button-grey');
                        } else {
                            $(this).removeClass('button-disabled').removeClass('button-grey').addClass('button-disabled');
                        }
                    });

                });
            },
        }
    };
    $("#tags_"+index).easyAutocomplete(options);
}


function activate_autocomplete_for_gift() {
    var options = {
        url: function() {
            return CONFIG.api_base_url().concat('/sales/tags');
        },
        getValue: "tag",
        placeholder: "tips: 方便快速查询，输入最后三位，点选",
        adjustWidth: false,
        template: {
            type: "description",
            fields: {
                description: "name"
            }
        },
        list: {
            maxNumberOfElements: 5,
            match: {
                enabled: true
            },
            showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function() {}
                },
            onChooseEvent: function() {
                var tag = $("#gift").getSelectedItemData().tag;
                var name = $("#gift").getSelectedItemData().name;

                $.getJSON(CONFIG.api_base_url().concat('/sales/items/', tag), function(data) {
                    $('#gift').val(data['tag']+' - '+data['name']);

                });
            },
        }
    };
    $("#gift").easyAutocomplete(options);
}


function add_block(total_items) {
    $('#items').append(item_block(total_items));
    activate_autocomplete(total_items);
    activate_size_button();
    activate_price_validator();
}


function remove_block(index) {
    $("#dec_"+index).remove();
    $('#item_'+index).remove();
}


function activate_size_button() {
    $('.sizebutton').click(function() {
        if (! $(this).hasClass('button-disabled')) {
            index = $(this).attr('index');
            $('.btn_'+index).not(this).each(function(){
                $(this).removeClass('button-grey').addClass('button-grey');
            });
            $(this).removeClass('button-grey').addClass('button-orange');
            $('#size_'+index).val($(this).text());
        }
    });
}


function activate_price_validator() {
    // validate entered price
    $(".sales_price").on("keyup", function(){
        var valid = /^\d{0,4}(\.\d{0,2})?$/.test(this.value),
            val = this.value;

        if(!valid){
            console.log("Invalid input!");
            this.value = val.substring(0, val.length - 1);
        }
    });
}


function process(total_items) {
    var items = []
    for (i = 0; i < total_items+1; i++) {
        items.push({
            tag: $("#tags_"+i).val(),
            price: $("#sales_price_"+i).val(),
            size: $("#size_"+i).val(),
        });
    }

    var payload = {
        merchant_name: $('#merchant_name').text(),
        items: items,
        gift: $("#gift").val(),
    }

    $.ajax({
        type: "POST",
        url: CONFIG.api_base_url().concat('/generate_qr'),
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            present_qr(data);
        },
        failure: function(errMsg) {
            // alert(errMsg);
        }
    });

}


$( document ).ready(function() {
    //FastClick
    $(function() {FastClick.attach(document.body);});

    //Preload Image
    $(function() {
        $(".preload-image").lazyload({
            threshold : 100,
            effect : "fadeIn",
            container: $("#page-content-scroll")
        });
    });


    var total_items = 0;

    $('#add_item').click(function(e) {
        e.preventDefault(); //preventing the link from being followed.
        total_items += 1;
        add_block(total_items);
    });

    $('#del_item').click(function(e) {
        e.preventDefault(); //preventing the link from being followed.
        if (total_items > 0) {
            remove_block(total_items);
            total_items -= 1;
        }
    });

    activate_size_button();

    activate_autocomplete(total_items);

    activate_price_validator();

    activate_autocomplete_for_gift();


    $('#generate').click(function(e){
        e.preventDefault(); //preventing the link from being followed.

        var empty = $('#items').find("input").filter(function() {
            return this.value === "";
        });

        if (empty.length) {
            swal({
              title: "Oops",
              text: "信息输入不完整",
              type: "error",
              confirmButtonText: "OK"
            });
            return;
        }

        swal({
            title: "确定提交吗?",
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: false
        },
        function(){
            swal({
              title: "提交成功",
              text: "正在跳转...",
              type: "success",
              timer: 1500,
            });
            setTimeout(function(){
                process(total_items);
            }, 2000);
        });

    });




    //Sidebar Dimensions Go here
    var sidebar_width = 270;
    var sidebar_shadow_correction = 280; /*Add 30 Pixels to your sidebar width*/
    var sidebar_form_width = sidebar_width-40;  /*This calculates the form size automatically*/

    $('.submenu, .sidebar-left, .sidebar-right').css('width', sidebar_width);
    $('.sidebar-form').css('width', sidebar_form_width);

    $(".sidebar-left .submenu").css({
        "transform": "translateX("+sidebar_width*(-1)+"px)",
        "-webkit-transform": "translateX("+sidebar_width*(-1)+"px)",
        "-moz-transform": "translateX("+sidebar_width*(-1)+"px)",
        "-o-transform": "translateX("+sidebar_width*(-1)+"px)",
        "-ms-transform": "translateX("+sidebar_width*(-1)+"px)"
    });
    $(".sidebar-left").css({
        "transform": "translateX("+sidebar_shadow_correction*(-1)+"px)",
        "-webkit-transform": "translateX("+sidebar_shadow_correction*(-1)+"px)",
        "-moz-transform": "translateX("+sidebar_shadow_correction*(-1)+"px)",
        "-o-transform": "translateX("+sidebar_shadow_correction*(-1)+"px)",
        "-ms-transform": "translateX("+sidebar_shadow_correction*(-1)+"px)"
    });
    $(".sidebar-right .submenu").css({
        "transform": "translateX("+sidebar_width*(1)+"px)",
        "-webkit-transform": "translateX("+sidebar_width*(1)+"px)",
        "-moz-transform": "translateX("+sidebar_width*(1)+"px)",
        "-o-transform": "translateX("+sidebar_width*(1)+"px)",
        "-ms-transform": "translateX("+sidebar_width*(1)+"px)"
    });
    $(".sidebar-right").css({
        "transform": "translateX("+sidebar_shadow_correction*(1)+"px)",
        "-webkit-transform": "translateX("+sidebar_shadow_correction*(1)+"px)",
        "-moz-transform": "translateX("+sidebar_shadow_correction*(1)+"px)",
        "-o-transform": "translateX("+sidebar_shadow_correction*(1)+"px)",
        "-ms-transform": "translateX("+sidebar_shadow_correction*(1)+"px)"
    });
    $(".sidebar-right .submenu").css({
        "transform": "translateX("+sidebar_width*(1)+"px)",
        "-webkit-transform": "translateX("+sidebar_width*(1)+"px)",
        "-moz-transform": "translateX("+sidebar_width*(1)+"px)",
        "-o-transform": "translateX("+sidebar_width*(1)+"px)",
        "-ms-transform": "translateX("+sidebar_width*(1)+"px)"
    });

    //Sidebar Settings
    $('.open-left-sidebar').click(function(){
        $('.sidebar-left').addClass('active-sidebar-box');
        $('.sidebar-right').removeClass('active-sidebar-box');
        $('.sidebar-tap-close').addClass('active-tap-close');
        $('#page-content-scroll').addClass('stop-scroll');
        return false;
    });

    $('.open-search-bar, .close-search-bar').click(function(){
       $('.header-search').toggleClass('active-search');
    });

    $('.open-right-sidebar').click(function(){
        $('.sidebar-right').addClass('active-sidebar-box');
        $('.sidebar-left').removeClass('active-sidebar-box');
        $('.sidebar-tap-close').addClass('active-tap-close');
        $('#page-content-scroll').addClass('stop-scroll');
        return false;
    });
    $('.sidebar-tap-close, .close-sidebar').click(function(){
        $('.sidebar-left, .sidebar-right').removeClass('active-sidebar-box');
        $('.sidebar-tap-close').removeClass('active-tap-close');
        $('#page-content-scroll').removeClass('stop-scroll');
        return false;
    });

    //Open / Close Sidebar Submenu
    $('.open-submenu').click(function(){
        $(this).parent().find('.submenu').toggleClass('active-submenu');
        //$('.open-submenu').removeClass('active-submenu-visit');
        //$(this).addClass('active-submenu-visit');
        $('.sidebar-scroll').addClass('stop-scroll');
        return false;
    });
    $('.active-item').addClass('active-submenu-history');
    $('.close-submenu').click(function(){
        //$('.active-submenu').parent().find('.open-submenu').addClass('active-submenu-visit');
        $('.submenu').removeClass('active-submenu');
        $('.open-submenu').removeClass('active-item');
        $('.sidebar-scroll').removeClass('stop-scroll');
        return false;
    });
    if($('.submenu').hasClass('active-submenu')){
        var counted_subs = $('.active-submenu').find('a').length;
        $('.active-submenu').addClass('active-submenu-' + counted_subs);
    };

    //Making the slider load in the height of the image inside, no jumps*/
    var slider_height = $('.slider-wrapper img').height();
    $('.slider-wrapper').css('height', slider_height-12);

    //Timeout is required for sliders to iron out performance issues*/
    setTimeout(function() {
        //After slider loaded, allow it's size to be full*/
        $('.slider-wrapper').css('height', 'auto');
        $('.coverpage-slider').owlCarousel({
            loop:true,
            margin:0,
            nav:false,
            items:1
        });
        $('.homepage-cover-slider').owlCarousel({
            loop:false,
            margin:0,
            nav:false,
            items:1
        });
        $('.next-home-slider').click(function() {$('.homepage-cover-slider').trigger('next.owl.carousel');});
        $('.prev-home-slider').click(function() {$('.homepage-cover-slider').trigger('prev.owl.carousel');});

        $('.homepage-cover-slider').on('changed.owl.carousel', function(event) {
            var page = event.page.index;
            if (page == 1){
                $('.home-main-icons').addClass('show-main-icons');
                $('.homepage-cover-slider .owl-dots').addClass('show-main-icons');
            }
            if (page == 0 || page == 2){
                $('.home-main-icons').removeClass('show-main-icons');
                $('.homepage-cover-slider .owl-dots').removeClass('show-main-icons');
            }
        });

        $('.text-slider').owlCarousel({
            autoplay:true,
            autoplayTimeout:3000,
            loop:true,
            margin:10,
            nav:false,
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                720:{
                    items:2
                },
                1200:{
                    items:3
                }
            }
        });

        $('.news-slider').owlCarousel({
            autoplay:true,
            autoplayTimeout:4000,
            loop:true,
            margin:10,
            nav:false,
            items:1,
            dots:false
        });

        $('.store-slider').owlCarousel({
            autoplay:true,
            autoplayTimeout:4000,
            loop:true,
            margin:10,
            nav:false,
            items:1,
            dots:false
        });


        $('.store-thumbnails, .category-slider').owlCarousel({
            autoplay:true,
            autoplayTimeout:4000,
            loop:true,
            margin:10,
            nav:false,
            dots:false,
            responsive:{
                0:{
                    items:2
                },
                330:{
                    items:3
                },
                500:{
                    items:4
                },
                700:{
                    items:5
                },
                900:{
                    items:6
                }
            }
        });

        $('.single-item, .store-slider-2').owlCarousel({
            autoplay:true,
            autoplayTimeout:4000,
            loop:true,
            margin:10,
            nav:false,
            dots:false,
            items:1

        });
        $('.home-next').click(function() {$('.single-item').trigger('next.owl.carousel');});
        $('.home-prev').click(function() {$('.single-item').trigger('prev.owl.carousel');});
        $('.double-item').owlCarousel({
            autoplay:true,
            autoplayTimeout:4000,
            loop:true,
            margin:10,
            lazyLoad:true,
            nav:false,
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                }
            }
        });
        $('.tripple-item').owlCarousel({
            autoplay:true,
            autoplayTimeout:4000,
            loop:true,
            margin:10,
            lazyLoad:true,
            nav:false,
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:3
                }
            }
        });
        $('.store-slider, .product-slider').owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            dots:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                }
            }
        });
    }, 0.001);

    //Mobile Style Switches
    $('.switch-1').click(function(){$(this).toggleClass('switch-1-on'); return false;});
    $('.switch-2').click(function(){$(this).toggleClass('switch-2-on'); return false;});
    $('.switch-3').click(function(){$(this).toggleClass('switch-3-on'); return false;});
    $('.switch, .switch-icon').click(function(){
        $(this).parent().find('.switch-box-content').slideToggle(250);
        $(this).parent().find('.switch-box-subtitle').slideToggle(250);
        return false;
    });

    //Classic Toggles
    $('.toggle-title').click(function(){
        $(this).parent().find('.toggle-content').slideToggle(250);
        $(this).find('i').toggleClass('rotate-toggle');
        return false;
    });

    //Accordion
    $('.accordion').find('.accordion-toggle').click(function(){
        //Expand or collapse this panel
        $(this).next().slideDown(250);
        $('.accordion').find('i').removeClass('rotate-180');
        $(this).find('i').addClass('rotate-180');

        //Hide the other panels
        $(".accordion-content").not($(this).next()).slideUp(250);
    });

    //Tabs
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('ul.tabs li').removeClass('active-tab');
		$('.tab-content').slideUp(250);
		$(this).addClass('active-tab');
		$("#"+tab_id).slideToggle(250);
	})

    //Notifications
    $('.static-notification-close').click(function(){
       $(this).parent().slideUp(250);
        return false;
    });
    $('.tap-dismiss').click(function(){
       $(this).slideUp(250);
        return false;
    });

	//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
	(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

    //Detecting Mobiles//
    var isMobile = {
        Android: function() {return navigator.userAgent.match(/Android/i);},
        BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
        iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
        Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
        Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
        any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
    };

    if( !isMobile.any() ){
        $('.show-blackberry, .show-ios, .show-windows, .show-android').addClass('disabled');
        $('#page-content-scroll').css('right', '0px');
        $('.show-no-detection').removeClass('disabled');
    }
    if(isMobile.Android()) {
        //Status Bar Color for Android
        $('head').append('<meta name="theme-color" content="#000000"> />');
        $('.show-android').removeClass('disabled');
        $('.show-blackberry, .show-ios, .show-windows').addClass('disabled');
        $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
    }
    if(isMobile.BlackBerry()) {
        $('.show-blackberry').removeClass('disabled');
        $('.show-android, .show-ios, .show-windows').addClass('disabled');
        $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
    }
    if(isMobile.iOS()) {
        $('.show-ios').removeClass('disabled');
        $('.show-blackberry, .show-android, .show-windows').addClass('disabled');
        $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
    }
    if(isMobile.Windows()) {
        $('.show-windows').removeClass('disabled');
        $('.show-blackberry, .show-ios, .show-android').addClass('disabled');
        $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
    }

    //Galleries
	// $(".gallery a, .show-gallery").swipebox();

    // var screen_widths = $(window).width();
    // if( screen_widths < 768){
    //     $('.gallery-justified').justifiedGallery({
    //         rowHeight : 80,
    //         maxRowHeight : 370,
    //         margins : 5,
    //         fixedHeight:false
    //     });
    // };
    // if( screen_widths > 768){
    //     $('.gallery-justified').justifiedGallery({
    //         rowHeight : 150,
    //         maxRowHeight : 370,
    //         margins : 5,
    //         fixedHeight:false
    //     });
    // };

    //Adaptive Folios
    $('.adaptive-one').click(function(){
        $('.portfolio-switch').removeClass('active-adaptive');
        $(this).addClass('active-adaptive');
        $('.portfolio-adaptive').removeClass('portfolio-adaptive-two portfolio-adaptive-three');
        $('.portfolio-adaptive').addClass('portfolio-adaptive-one');
        return false;
    });
    $('.adaptive-two').click(function(){
        $('.portfolio-switch').removeClass('active-adaptive');
        $(this).addClass('active-adaptive');
        $('.portfolio-adaptive').removeClass('portfolio-adaptive-one portfolio-adaptive-three');
        $('.portfolio-adaptive').addClass('portfolio-adaptive-two');
        return false;
    });
    $('.adaptive-three').click(function(){
        $('.portfolio-switch').removeClass('active-adaptive');
        $(this).addClass('active-adaptive');
        $('.portfolio-adaptive').removeClass('portfolio-adaptive-two portfolio-adaptive-one');
        $('.portfolio-adaptive').addClass('portfolio-adaptive-three');
        return false;
    });

    //Reminders & Checklists & Tasklists
    $('.reminder-check-square').click(function(){
       $(this).toggleClass('reminder-check-square-selected');
        return false;
    });
    $('.reminder-check-round').click(function(){
       $(this).toggleClass('reminder-check-round-selected');
        return false;
    });
    $('.checklist-square').click(function(){
       $(this).toggleClass('checklist-square-selected');
        return false;
    });
    $('.checklist-round').click(function(){
       $(this).toggleClass('checklist-round-selected');
        return false;
    });
    $('.tasklist-incomplete').click(function(){
       $(this).removeClass('tasklist-incomplete');
       $(this).addClass('tasklist-completed');
        return false;
    });
    $('.tasklist-item').click(function(){
       $(this).toggleClass('tasklist-completed');
        return false;
    });

    //SiteMap
    $('.sitemap-box a').hover(
        function(){$(this).find('i').addClass('scale-hover');},
        function(){$(this).find('i').removeClass('scale-hover');}
    );

    //Fullscreen Map
    $('.map-text, .overlay').click(function(){
       $('.map-text, .map-fullscreen .overlay').addClass('hide-map');
       $('.deactivate-map').removeClass('hide-map');
    });

    $('.deactivate-map').click(function(){
       $('.map-text, .map-fullscreen .overlay').removeClass('hide-map');
       $('.deactivate-map').addClass('hide-map');
    });

    //Show Back To Home When Scrolling
    $('#page-content-scroll').on('scroll', function () {
        var total_scroll_height = $('#page-content-scroll')[0].scrollHeight
        var inside_header = ($(this).scrollTop() <= 150);
        var passed_header = ($(this).scrollTop() >= 0); //250
        var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() +100 )));

        if (inside_header == true) {
            $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
        } else if (passed_header == true)  {
            $('.back-to-top-badge').addClass('back-to-top-badge-visible');
        }
        if (footer_reached == true){
            $('.back-to-top-badge').removeClass('back-to-top-badge-visible');
        }
    });

    //Back to top Badge
    $('.back-to-top-badge, .back-to-top').click(function (e) {
        e.preventDefault();
        $('#page-content-scroll').animate({
            scrollTop: 0
        }, 250);
    });

    //Set inputs to today's date by adding class set-day
    var set_input_now = new Date();
    var set_input_month = (set_input_now.getMonth() + 1);
    var set_input_day = set_input_now.getDate();
    if(set_input_month < 10)
        set_input_month = "0" + set_input_month;
    if(set_input_day < 10)
        set_input_day = "0" + set_input_day;
    var set_input_today = set_input_now.getFullYear() + '-' + set_input_month + '-' + set_input_day;
    $('.set-today').val(set_input_today);

    //Portfolios and Gallerties
    $('.adaptive-one').click(function(){
        $('.portfolio-switch').removeClass('active-adaptive');
        $(this).addClass('active-adaptive');
        $('.portfolio-adaptive').removeClass('portfolio-adaptive-two portfolio-adaptive-three');
        $('.portfolio-adaptive').addClass('portfolio-adaptive-one');
        return false;
    });
    $('.adaptive-two').click(function(){
        $('.portfolio-switch').removeClass('active-adaptive');
        $(this).addClass('active-adaptive');
        $('.portfolio-adaptive').removeClass('portfolio-adaptive-one portfolio-adaptive-three');
        $('.portfolio-adaptive').addClass('portfolio-adaptive-two');
        return false;
    });
    $('.adaptive-three').click(function(){
        $('.portfolio-switch').removeClass('active-adaptive');
        $(this).addClass('active-adaptive');
        $('.portfolio-adaptive').removeClass('portfolio-adaptive-two portfolio-adaptive-one');
        $('.portfolio-adaptive').addClass('portfolio-adaptive-three');
        return false;
    });

    //Wide Portfolio
    $('.show-wide-text').click(function(){
        $(this).parent().find('.wide-text').slideToggle(200);
        return false;
    });
    $('.portfolio-close').click(function(){
       $(this).parent().parent().find('.wide-text').slideToggle(200);
        return false;
    });

    //Bottom Share Fly-up
    $('body').append('<div class="share-bottom-tap-close"></div>');
    $('.show-share-bottom, .show-share-box').click(function(){
        $('.share-bottom-tap-close').addClass('share-bottom-tap-close-active');
        $('.share-bottom').toggleClass('active-share-bottom');
        return false;
    });
    $('.close-share-bottom, .share-bottom-tap-close').click(function(){
       $('.share-bottom-tap-close').removeClass('share-bottom-tap-close-active');
       $('.share-bottom').removeClass('active-share-bottom');
        return false;
    });

    //Filterable Gallery
    var selectedClass = "";
    $(".filter-category").click(function(){
        $('.portfolio-filter-categories a').removeClass('selected-filter');
        $(this).addClass('selected-filter');
        selectedClass = $(this).attr("data-rel");
        $(".portfolio-filter-wrapper").slideDown(250);
        $(".portfolio-filter-wrapper div").not("."+selectedClass).delay(100).slideUp(250);
        //Timeout for events arrangements. Timeout is such a small value you won't sense it but the code will.
        setTimeout(function() {
            $("."+selectedClass).slideDown(250);
            $(".portfolio-filter-wrapper").slideDown(250);
        }, 0);
    });

    //Resizable Elements
    if($('body').hasClass('has-cover')){
        var screen_height = 0;
        var screen_width = 0;

        var cover_content_height = 0;
        var cover_content_width = 0;

        //Coverpage Calculations
        function calculate_covers(){
            var screen_height = $('#page-content').height();
            var screen_width = $('#page-content').width();

            //Settings for Cover Pages
            var cover_content_height = $('.cover-page-content').height()-30;
            var cover_content_width = $('.cover-page-content').width();

            $('.cover-page').css('height', screen_height);
            $('.cover-page').css('width', screen_width);
            $('.cover-page-content').css('margin-left', (cover_content_width/2)*(-1));
            $('.cover-page-content').css('margin-top', (cover_content_height/2)*(-1));

            var cover_width = $(window).width();
            var cover_height = $(window).height();
            var cover_vertical = -($('.cover-center').height())/2;
            var cover_horizontal = -($('.cover-center').width())/2;

            $('.cover-screen').css('width', cover_width);
            $('.cover-screen').css('height', cover_height);
            $('.cover-screen .overlay').css('width', cover_width);
            $('.cover-screen .overlay').css('height', cover_height);
            $('.cover-center').css('margin-left', cover_horizontal);
            $('.cover-center').css('margin-top', cover_vertical + 30);
            $('.cover-left').css('margin-top', cover_vertical);
            $('.cover-right').css('margin-top', cover_vertical);
        };

        //Timeout for events arrangements. Timeout is such a small value you won't sense it but the code will.
        setTimeout(function() {
            function slider_dots(){
                var dots_width = (-($('.owl-dots').width())/2);
                $('.owl-dots').css('position', 'absolute');
                $('.owl-dots').css('left', '50%');
                $('.owl-dots').css('margin-left', dots_width);
            }
            slider_dots();
        }, 1);

        //Homepage Calculations
        function calculate_home(){
            var screen_height = $('#page-content').height();
            var screen_width = $('#page-content').width();

            var total_height = screen_height-220;
            var five_rows = total_height / 5;
            var four_rows = total_height / 4;
            var three_rows = total_height / 3;

            var five_columns = screen_width/5;
            var four_columns = screen_width/4;
            var three_columns = screen_width/3;

            var icon_size_five = five_rows/5;
            var icon_size_four = four_rows/4;
            var icon_size_three = three_rows/3;

            $('.five-rows a').css('height', five_rows);
            $('.five-rows a').css('padding-top', (five_rows/2)-icon_size_five);
            $('.five-rows strong').css('margin-top', (five_rows/2)-icon_size_five);

            $('.four-rows a').css('height', four_rows);
            $('.four-rows a').css('padding-top', (four_rows/2)-icon_size_four);
            $('.four-rows strong').css('margin-top', (four_rows/2)-icon_size_four);

            $('.three-rows a').css('height', three_rows);
            $('.three-rows a').css('padding-top', (three_rows/2)-icon_size_three);
            $('.three-rows strong').css('margin-top', (three_rows/2)-icon_size_three);

            $('.five-columns a').css('width', five_columns);
            $('.four-columns a').css('width', four_columns);
            $('.three-columns a').css('width', three_columns);

            var home_intro_width = $('.home-intro').width()*(-1);
            var home_intro_height = $('.home-intro').height()*(-1);

            $('.home-intro').css('margin-left', home_intro_width/2);
            $('.home-intro').css('margin-top', home_intro_height/2);

            var home_outro_width = $('.home-outro').width()*(-1);
            var home_outro_height = $('.home-outro').height()*(-1);

            $('.home-outro').css('margin-left', home_outro_width/2);
            $('.home-outro').css('margin-top', home_outro_height/2);

            if($('.home-slide-icons a').find("strong").length > 0){
                $('.home-slide-icons a i').css('pointer-events', 'none');
            };

            $(".home-social a").hover(
                function() {$(this).addClass('hover-icon-effect');},
                function() {$(this).removeClass('hover-icon-effect');}
            );

            $(".home-slide-icons a").hover(
                function(){$(this).find('i').addClass('hover-icon-effect'); $(this).find('strong').addClass('hover-icon-effect');},
                function(){$(this).find('i').removeClass('hover-icon-effect'); $(this).find('strong').removeClass('hover-icon-effect');}
            );
        };

        function calculate_map(){
            var map_width = $(window).width();
            var map_height = $(window).height();
            $('.map-fullscreen iframe').css('width', map_width);
            $('.map-fullscreen iframe').css('height', map_height);
        };

        calculate_home();
        calculate_covers();
        calculate_map();

        $( window ).resize(function() {
            calculate_covers();
            calculate_home();
        });

        //Demo Purposes
        $('.error-page-layout-switch').click(function(){
           $('.cover-page-content').toggleClass('unboxed-layout, boxed-layout');
            calculate_covers();
        });
    }

    //Countdown Timer
    $(function() {
        $('.countdown-class').countdown({
            date: "June 7, 2087 15:03:26"
        });
    });

    //Copyright Year
    if ($("#copyright-year")[0]){
        document.getElementById('copyright-year').appendChild(document.createTextNode(new Date().getFullYear()))
    }

    //Preloading Bar
    var options = {
        bg: '#2980b9',
        // leave target blank for global nanobar
        target: document.getElementById('myDivId'),
        // id for new nanobar
        id: 'mynano'
    };
    // var nanobar = new Nanobar( options );
    // nanobar.go( 30 ); // size bar 30%
    // nanobar.go(100); // size bar 100%

    //Loading Thumb Layout for News, 10 articles at a time
    $(function(){
        $(".thumb-layout-page a").slice(0, 5).show(); // select the first ten
        $(".load-more-thumbs").click(function(e){ // click event for load more
            e.preventDefault();
            $(".thumb-layout-page a:hidden").slice(0, 5).show(0); // select next 10 hidden divs and show them
            if($(".thumb-layout-page a:hidden").length == 0){ // check if any hidden divs still exist
                $(this).hide();
            }
        });
    });

    $(function(){
        $(".card-large-layout-page .card-large-layout").slice(0, 2).show(); // select the first ten
        $(".load-more-large-cards").click(function(e){ // click event for load more
            e.preventDefault();
            $(".card-large-layout-page .card-large-layout:hidden").slice(0, 2).show(0); // select next 10 hidden divs and show them
            if($(".card-large-layout-page div:hidden").length == 0){ // check if any hidden divs still exist
                $(this).hide();
            }
        });
    });

    $(function(){
        $(".card-small-layout-page .card-small-layout").slice(0, 3).show(); // select the first ten
        $(".load-more-small-cards").click(function(e){ // click event for load more
            e.preventDefault();
            $(".card-small-layout-page .card-small-layout:hidden").slice(0, 3).show(0); // select next 10 hidden divs and show them
            if($(".card-small-layout-page a:hidden").length == 0){ // check if any hidden divs still exist
                $(this).hide();
            }
        });
    });

    //News Tabs
    $('.activate-tab-1').click(function(){
        $('#tab-2, #tab-3').slideUp(250); $('#tab-1').slideDown(250);
        $('.home-tabs a').removeClass('active-home-tab');
        $('.activate-tab-1').addClass('active-home-tab');
        return false;
    });
    $('.activate-tab-2').click(function(){
        $('#tab-1, #tab-3').slideUp(250); $('#tab-2').slideDown(250);
        $('.home-tabs a').removeClass('active-home-tab');
        $('.activate-tab-2').addClass('active-home-tab');
        return false;
    });
    $('.activate-tab-3').click(function(){
        $('#tab-1, #tab-2').slideUp(250); $('#tab-3').slideDown(250);
        $('.home-tabs a').removeClass('active-home-tab');
        $('.activate-tab-3').addClass('active-home-tab');
        return false;
    });

    //Store Cart Add / Substract Numbers
    $(function () {
        $('.add-qty').on('click',function(){
            var $qty=$(this).closest('div').find('.qty');
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
        $('.substract-qty').on('click',function(){
            var $qty=$(this).closest('div').find('.qty');
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 0) {
                $qty.val(currentVal - 1);
            }
        });
    });

    $('.remove-cart-item').click(function(){
        $(this).parent().parent().slideUp(250);
    });
});