<!DOCTYPE HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimal-ui"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/splash/splash-icon.png">
<link rel="apple-touch-icon-precomposed" sizes="180x180" href="images/splash/splash-icon-big.png">
<link rel="apple-touch-startup-image" href="images/splash/splash-screen.png"    media="screen and (max-device-width: 320px)" />
<link rel="apple-touch-startup-image" href="images/splash/splash-screen@2x.png" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" />
<link rel="apple-touch-startup-image" href="images/splash/splash-screen-six.png" media="(device-width: 375px)">
<link rel="apple-touch-startup-image" href="images/splash/splash-screen-six-plus.png" media="(device-width: 414px)">
<link rel="apple-touch-startup-image" sizes="640x1096" href="images/splash/splash-screen@3x.png" />
<link rel="apple-touch-startup-image" sizes="1024x748" href="images/splash/splash-screen-ipad-landscape" media="screen and (min-device-width : 481px) and (max-device-width : 1024px) and (orientation : landscape)" />
<link rel="apple-touch-startup-image" sizes="768x1004" href="images/splash/splash-screen-ipad-portrait.png" media="screen and (min-device-width : 481px) and (max-device-width : 1024px) and (orientation : portrait)" />
<link rel="apple-touch-startup-image" sizes="1536x2008" href="images/splash/splash-screen-ipad-portrait-retina.png"   media="(device-width: 768px)  and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"/>
<link rel="apple-touch-startup-image" sizes="1496x2048" href="images/splash/splash-screen-ipad-landscape-retina.png"   media="(device-width: 768px) and (orientation: landscape)    and (-webkit-device-pixel-ratio: 2)"/>

<title>MODE FLIP</title>

<link href="styles/style.css"            rel="stylesheet" type="text/css">
<link href="styles/framework.min.css"        rel="stylesheet" type="text/css">
<link href="styles/owl.theme.min.css"        rel="stylesheet" type="text/css">
<link href="styles/font-awesome.min.css"     rel="stylesheet" type="text/css">
<link href="styles/slick.min.css"            rel="stylesheet" type="text/css">
<link href="styles/lightgallery.css"   rel="stylesheet" type="text/css">

<script type="text/javascript" src="scripts/jquery.js?803"></script>
<script type="text/javascript" src="scripts/jqueryui.js?803"></script>
<script type="text/javascript" src="scripts/framework.plugins.js?803"></script>
<script type="text/javascript" src="scripts/plugins.js?803"></script>
<script type="text/javascript" src="scripts/slick.min.js?803"></script>

<script type="text/javascript" src="scripts/lightgallery.min.js?803"></script>
<script type="text/javascript" src="scripts/lg-thumbnail.min.js?803"></script>

<script type="text/javascript" src="scripts/designer.js?803"></script>


</head>
<body>

<div id="preloader">
    <div id="status">
        <p class="center-text">
            Loading...
            <em>加载取决于网络速度</em>
        </p>
    </div>
</div>

<div class="hide-content"></div>
<div class="all-elements">
    <div class="snap-drawers">
        <div class="snap-drawer snap-drawer-left">
            <a href="/homepage" class="selected-item"><i class="fa fa-home"></i>Home</a>
            <a href="/collections"><i class="fa fa-star"></i>Shop</a>
            <a href="/designer_list"><i class="fa fa-user"></i>Designer</a>
            <a href="/flipbook_view"><i class="fa fa-book"></i>FLIP Book</a>
            <a href="/music_view"><i class="fa fa-music"></i>3D Music</a>
            <a href="https://kdt.im/HFYzTr"><i class="fa fa-shopping-cart"></i>Store</a>
            <!-- <a href="#"><i class="fa fa-rss"></i>FASHION</a> -->
            <!-- <a href="/about_view"><i class="fa fa-info"></i>About Us</a> -->
            <a href="#" class="sidebar-close"><i class="fa fa-times"></i>Close</a>
        </div>
    </div>


    <a id="red-footer-ball" href="#" class="footer-ball"><i class="fa fa-navicon"></i></a>



    <!-- Page Content-->
    <div id="content" class="snap-content">
            <div style="display: none;" id="curr_did">${did}</div>

            <div class="homescreen-content-fullscreen">
               <div class="homescreen-page-profile">
                    <div class="homescreen-page-profile-header" style="background-image: url(${profile_images.get('background_url')})">
                        <img src="${profile_images.get('icon_url')}" alt="img">
                        <h3>${name}</h3>
                        <em><i class="fa fa-location-arrow"></i>${origin}</em>
                        <div class="homescreen-overlay homescreen-bg-black"></div>
                        <div class="homescreen-follow-buttons">
                            <a href="#" onclick="javascript:like(this, ${did});">+ Like</a>
                            <a href="#" onclick="javascript:wish(this, ${did});">Wish</a>
                        </div>
                   </div>
               </div>
            </div>

            <div class="content">
                <div class="homescreen-page-profile-followers">
                        <a href="#">
                            <i class="fa fa-thumbs-o-up"></i>
                            <div id="like_count">${likes_and_wishes.get('likes')} Likes</div>
                        </a>
                        <a href="#">
                            <i class="fa fa-heart-o"></i>
                            <div id="wish_count">${likes_and_wishes.get('wishes')} Wishes</div>
                        </a>
                        <a href="#" class="show-message-bottom">
                            <i class="fa fa-envelope-o"></i>
                            Text Me
                        </a>
                </div>

                <div class="decoration"></div>

                <div class="one-half-responsive last-column">
                    <div id="experience_${did}">
                        % for url in experience_content.get('brands'):
                            <div><img class="homescreen-responsive-image" src="${url}"></div>
                        % endfor
                    </div>
                </div>

                <%
                    bio_paragraphs = [p.strip() for p in bio.split('|')]
                %>
                <div id="bio_${did}" class="left-if-mobile no-bottom">
                    % for para in bio_paragraphs:
                        <p>${para}</p>
                    % endfor
                </div>

                <div class="empty-space"></div>
                <div class="decoration"></div>

                <div><h4 class="experience-header">设计师作品浏览</h4><em class="experience-header">&nbsp;(点击浏览更多)</em></div>

                <div id="staff-slider-${did}" class="staff-slider" data-snap-ignore="true">
                    <%
                        thumbnails_pics = experience_content.get('thumbnails')
                    %>
                    <div class="staff-item">
                        <div class="homescreen-gallery square-thumbs" data-snap-ignore="true">
                            % for index, pic_url in enumerate(thumbnails_pics):
                            <a href="#" onclick="javascript:load_works(this, ${did}, ${index});" class="homescreen-scale-hover experience-gallery">
                                <img class="homescreen-responsive-image" src="${pic_url}" alt="img">
                            </a>
                            % endfor
                        </div>
                    </div>
                </div>
                <div style="text-align:right">资料均由设计师提供</div>
                <div class="empty-space"></div>
                <div class="empty-space"></div>


                <div id="exclusive_${did}" class="exclusive-slider" data-snap-ignore="true">
                    % for pic_url in exclusive_content.get('pics'):
                    <div>
                        <img src="${pic_url}" class="responsive-image" alt="img">
                    </div>
                    % endfor
                </div>
                <div class="empty-space"></div>
                <div class="empty-space"></div>


                % if on_market:

                    % for collection in collections:
                    <div class="staff-item">
                        <h4>${collection.get('title')}</h4>
                    </div>

                    % if bool(collection.get('desc')):
                    <div class="left-if-mobile no-bottom">
                        <p>${collection.get('desc')}</p>
                    </div>
                    % endif

                    % if bool(collection.get('signatrue_pics')):
                    <div class="col_sig_pic_${did} exclusive-slider" data-snap-ignore="true">
                        % for pic in collection.get('signatrue_pics'):
                        <div>
                            <img style="padding: 0px 0px 0px 3px;" src="${pic}" class="responsive-image" alt="img">
                        </div>
                        % endfor
                    </div>
                    % endif

                    % if bool(collection.get('signatrue_videos')):
                        % for video in collection.get('signatrue_videos'):
                        <video class="col_sig_video_${did}" poster="${video.get('poster')}" onclick="this.play();" width="100%" height="auto" controls preload="none">
                            <source src="${video.get('url')}" type="video/mp4">
                        </video>
                        % endfor

                    % endif
                    <div class="decoration"></div>
                    <div class="empty-space"></div>

                    <div class="portfolio-one">
                        % for garment in collection.get('garments'):
                        <div class="portfolio-one-item full-bottom">
                            <div class="portfolio-one-image">
                                <a href="#" onclick="javascript:load_gallery(this, ${did}, ${collection.get('cid')}, ${garment.get('gid')});"><i class="fa fa-plus"></i></a>
                                <img src="${garment.get('pic').get('image')}" class="responsive-image">
                            </div>
                            <div class="portfolio-one-details">
                                <a>${garment.get('pic').get('title')}</a>
                                <a href="${garment.get('shop_link')}" class="portfolio-one-shop-links"><i class="fa fa-shopping-cart"></i> 点击购买</a>
                            </div>
                        </div>
                        <div class="decoration"></div>
                        % endfor
                    </div>
                    % endfor

                    <!-- <a href="#" class="next-product"></a>
                    <a href="#" class="prev-product"></a>
                    <div class="product-slider" data-snap-ignore="true">
                        % for product in signatrue_products:
                        <div>
                            <div class="product-item">
                                <img src="${product.get('picture')}" alt="img">
                                <h4>${product.get('title')}</h4>
                                <em>${product.get('subtitle')}</em>
                                <strong>${product.get('desc')}</strong>
                                <a href="#" class="button button-blue center-button"><i class="fa fa-shopping-cart"></i>购买</a>
                            </div>
                        </div>
                        % endfor
                    </div>
                    <p></p>
                    <div class="decoration"></div> -->


                    <!-- <div class="one-half-responsive">
                        <img src="images/modeflip/music/music_ui.png" alt="img" class="responsive-image">
                    </div>

                    <div class="one-third-responsive last-column">
                        <p class="user-list-socials">
                            <img src="images/pictures/1s.jpg" alt="img">
                            <strong>Ugly Is Beautiful<br><em>David Usher</em></strong>
                            <a href="#" class="icon1 mail-color"><i class="fa fa-play"></i></a>
                            <a href="#" class="icon2 facebook-color"><i class="fa fa-share-square-o"></i></a>
                        </p>
                        <p class="user-list-socials">
                            <img src="images/pictures/2s.jpg" alt="img">
                            <strong>Ugly Is Beautiful<br><em>David Usher</em></strong>
                            <a href="#" class="icon1 mail-color"><i class="fa fa-play"></i></a>
                            <a href="#" class="icon2 facebook-color"><i class="fa fa-share-square-o"></i></a>
                        </p>
                        <p class="user-list-socials">
                            <img src="images/pictures/3s.jpg" alt="img">
                            <strong>Ugly Is Beautiful<br><em>David Usher</em></strong>
                            <a href="#" class="icon1 mail-color"><i class="fa fa-play"></i></a>
                            <a href="#" class="icon2 facebook-color"><i class="fa fa-share-square-o"></i></a>
                        </p>
                        <p class="user-list-socials">
                            <img src="images/pictures/4s.jpg" alt="img">
                            <strong>Ugly Is Beautiful<br><em>David Usher</em></strong>
                            <a href="#" class="icon1 mail-color"><i class="fa fa-play"></i></a>
                            <a href="#" class="icon2 facebook-color"><i class="fa fa-share-square-o"></i></a>
                        </p>
                        <div class="decoration"></div>
                    </div> -->

                % else:

                    <div class="portfolio-one">

                        <div class="portfolio-one-item full-bottom">
                            <div class="portfolio-one-image-soon">
                                <div class="soon-page">
                                    <h1>Coming Soon</h1>
                                    <!-- <h4>We're still working on this product!</h4> -->
                                    <p>
                                        距七月限量主题系列产品发售还有
                                    </p>
                                    <div id="countdown_${did}" class="countdown"></div><div style="display: none;" id="target_date_${did}">${pre_mkt_content.get('target_date')}</div>
                                </div>
                                <a href="#"><i class="fa fa-clock-o"></i></a>
                                <img src="${pre_mkt_content.get('target_pic')}" class="responsive-image">
                            </div>
                        </div>
                        <div class="decoration"></div>
                    </div>
                % endif

        </div>

        <!-- Page Footer-->
        <div class="footer">
            <p class="center-text">Copyright 2016. All rights reserved.</p>
            <div class="footer-socials half-bottom">
                <a href="https://kdt.im/HFYzTr" class="footer-facebook"><i class="fa fa-shopping-cart"></i></a>
                <a href="/faq_view" class="footer-twitter"><i class="fa fa fa-question"></i></a>
                <a href="#" class="footer-transparent"></a>
                <a href="#" class="footer-share show-share-bottom"><i class="fa fa-share-alt"></i></a>
                <a href="#" class="footer-up"><i class="fa fa-angle-double-up"></i></a>
            </div>
        </div>

    </div>

    <div class="message-bottom">
        <h3>给设计师留言</h3>
        <div class="text-me-bottom">
            <a href="#">
                <div class="formTextareaWrap">
                    <textarea id="text_area" placeholder="我们会尽快审核并传递您的留言, 谢谢!" name="contactMessageTextarea" class="contactTextarea"></textarea>
                </div>
                <input id="submit_text" type="button" class="buttonWrap button button-green contactSubmitButton" value="发送"/>
            </a>
        </div>
        <a href="#" class="close-message-bottom">Close</a>
    </div>

    <div class="share-bottom">
        <h3>长按二维码保存并分享</h3>
        <div class="share-qr"><img src="http://assets.modeflip.com/ui/qr.jpg" alt="img"></div>
        <a href="#" class="close-share-bottom">Close</a>
    </div>

</div>

</body>

