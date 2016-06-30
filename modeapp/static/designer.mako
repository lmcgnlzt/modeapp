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
<link href="styles/framework.css"        rel="stylesheet" type="text/css">
<link href="styles/owl.theme.css"        rel="stylesheet" type="text/css">
<link href="styles/swipebox.css"         rel="stylesheet" type="text/css">
<link href="styles/font-awesome.css"     rel="stylesheet" type="text/css">
<link href="styles/animate.css"          rel="stylesheet" type="text/css">
<link href="styles/slick.css"            rel="stylesheet" type="text/css">
<link href="styles/lightgallery.css"   rel="stylesheet" type="text/css">

<script type="text/javascript" src="scripts/jquery.js"></script>
<script type="text/javascript" src="scripts/jqueryui.js"></script>
<script type="text/javascript" src="scripts/framework.plugins.js"></script>
<script type="text/javascript" src="scripts/plugins.js"></script>
<script type="text/javascript" src="scripts/slick.js"></script>

<script type="text/javascript" src="scripts/lightgallery.min.js"></script>
<script type="text/javascript" src="scripts/lg-thumbnail.min.js"></script>
<script type="text/javascript" src="scripts/lg-video.min.js"></script>

<script type="text/javascript" src="scripts/designer.js"></script>


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
            <a href="#"><i class="fa fa-book"></i>FLIP Book</a>
            <a href="#"><i class="fa fa-music"></i>3D Music</a>
            <a href="#"><i class="fa fa-shopping-cart"></i>Store</a>
            <a href="#"><i class="fa fa-rss"></i>FASHION</a>
            <a href="#"><i class="fa fa-info"></i>MODE FLIP</a>
            <a href="#" class="sidebar-close"><i class="fa fa-times"></i>Close</a>
        </div>
    </div>


    <a id="red-footer-ball" href="#" class="footer-ball"><i class="fa fa-navicon"></i></a>



    <!-- Page Content-->
    <div id="content" class="snap-content">
            <div style="display: none;" id="curr_did">${did}</div>

        <!-- <div id="designer_page" class="content"> -->

            <div class="homescreen-content-fullscreen">
               <div class="homescreen-page-profile">
                    <div class="homescreen-page-profile-header" style="background-image: url(${profile_images.get('background_url')})">
                        <img src="${profile_images.get('icon_url')}" alt="img">
                        <!-- <img src="images/modeflip/icon/touxiang.jpg" alt="img"> -->
                        <h3>${name}</h3>
                        <em><i class="fa fa-location-arrow"></i>${origin}</em>
                        <div class="homescreen-overlay homescreen-bg-black"></div>
                        <div class="homescreen-follow-buttons">
                            <a href="#">Like</a>
                            <a href="#">Follow</a>
                        </div>
                   </div>
               </div>
            </div>

            <div class="content">
                <div class="homescreen-page-profile-followers">
                        <a href="#">
                            <i class="fa fa-facebook"></i>
                            ${likes} Likes
                        </a>
                        <a href="#">
                            <i class="fa fa-twitter"></i>
                            ${subscribers} Followers
                        </a>
                        <a href="#">
                            <i class="fa fa-envelope-o"></i>
                            13k  Subscribers
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

                <div id="bio_${did}" class="left-if-mobile no-bottom">
                    ${bio}
                </div>

                <div class="empty-space"></div>
                <div class="decoration"></div>

                <h4>作品浏览</h4>
                <a id="next-staff-${did}" href="#" class="next-staff"></a>
                <a id="prev-staff-${did}" href="#" class="prev-staff"></a>

                <div id="staff-slider-${did}" class="staff-slider" data-snap-ignore="true">
                    <%
                        pics = experience_content.get('pics')
                    %>
                    % for page_index in range(0, len(pics), 8):
                    <div class="staff-item">
                        <div class="homescreen-gallery square-thumbs" data-snap-ignore="true">
                            % for index, pic in enumerate(pics[page_index : page_index + 8]):
                            <a href="#" onclick="javascript:load_works(this, ${did}, ${page_index} + ${index});" class="homescreen-scale-hover experience-gallery" title="${pic.get('title')}">
                                <img class="homescreen-responsive-image" src="${pic.get('thumbnail')}" alt="img">
                            </a>
                            % endfor
                        </div>
                    </div>
                    % endfor
                </div>
                <div class="empty-space"></div>
                <div class="decoration"></div>


                <h5>${exclusive_content.get('title')}</h5>

                <div id="exclusive_${did}" class="exclusive-slider" data-snap-ignore="true">
                    % for pic_url in exclusive_content.get('pics'):
                    <div>
                        <img src="${pic_url}" class="responsive-image" alt="img">
                    </div>
                    % endfor
                </div>
                <div class="empty-space"></div>

                % for index, video in enumerate(exclusive_content.get('videos')):
                <h5>${video.get('title')}</h5>
                <div class="exclusive_videos">
                    <div style="display:none;" id="excl-video-${did}-${index}">
                        <video class="lg-video-object lg-html5 video-js vjs-default-skin" width="100%" height="100%" controls preload="none">
                            <source src="${video.get('url')}" type="video/mp4">
                        </video>
                    </div>
                    <ul id="exclusive-video-${did}-${index}">
                        <li data-poster="${video.get('poster')}" data-sub-html="${video.get('title')}" data-html="#excl-video-${did}-${index}" >
                            <img class="responsive-image" src="${video.get('thumbnail')}" />
                        </li>
                    </ul>
                </div>
                % endfor

                <div class="decoration"></div>
                <div class="empty-space"></div>


                <br>
                <br>
                <br>


                % for collection in collections:
                <div class="staff-item">
                    <h4>${collection.get('title')}</h4>
                </div>
                % if collection.get('new_arrival'):
                <div id="sig_pic_${did}" class="exclusive-slider" data-snap-ignore="true">
                    % for pic in collection.get('signatrue_pics'):
                    <div>
                        <img src="${pic}" class="responsive-image" alt="img">
                    </div>
                    % endfor
                </div>
                % for index, video in enumerate(collection.get('signatrue_videos')):
                <div class="collection_videos">
                    <div style="display:none;" id="col-video-${did}-${index}">
                        <video class="lg-video-object lg-html5 video-js vjs-default-skin" width="100%" height="100%" controls preload="none">
                            <source src="${video.get('url')}" type="video/mp4">
                        </video>
                    </div>
                    <ul id="collection-video-${did}-${index}">
                        <li data-poster="${video.get('poster')}" data-sub-html="${video.get('title')}" data-html="#col-video-${did}-${index}" >
                            <img class="responsive-image" src="${video.get('thumbnail')}" />
                        </li>
                    </ul>
                </div>
                <div class="decoration"></div>
                <div class="empty-space"></div>
                % endfor
                % endif


                <div class="portfolio-one">
                    % for garment in collection.get('garments'):
                    <div class="portfolio-one-item full-bottom">
                        <div class="portfolio-one-image">
                            <a href="#" onclick="javascript:load_gallery(this, ${did}, ${collection.get('cid')}, ${garment.get('gid')});""><i class="fa fa-plus"></i></a>
                            <img src="${garment.get('pic').get('image')}" class="responsive-image">
                        </div>
                        <div class="portfolio-one-text">
                            <div class="portfolio-one-details">
                                <a>${garment.get('pic').get('title')}</a>
                                <a><i class="fa fa-jpy"></i>&nbsp;${garment.get('price')}</a>
                                <div class="portfolio-two-links">
                                    <a href="#"><i class="fa fa-shopping-cart"></i> 点击购买</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="decoration"></div>
                    % endfor
                </div>
                % endfor


                <a href="#" class="next-product"></a>
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
                <div class="decoration"></div>


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


        </div>
        <!-- Page Footer-->
        <div class="footer">
            <p class="center-text">Copyright 2016. All rights reserved.</p>
            <div class="footer-socials half-bottom">
                <a href="#" class="footer-facebook"><i class="fa fa-question"></i></a>
                <a href="#" class="footer-twitter"><i class="fa fa-phone"></i></a>
                <a href="#" class="footer-transparent"></a>
                <a href="#" class="footer-share show-share-bottom"><i class="fa fa-share-alt"></i></a>
                <a href="#" class="footer-up"><i class="fa fa-angle-double-up"></i></a>
            </div>
        </div>

    </div>

    <div class="share-bottom">
        <h3>Share Page</h3>
        <div class="share-socials-bottom">
            <a href="https://www.facebook.com/sharer/sharer.php?u=http://www.themeforest.net/">
                <i class="fa fa-facebook facebook-color"></i>
                Facebook
            </a>
            <a href="https://twitter.com/home?status=Check%20out%20ThemeForest%20http://www.themeforest.net">
                <i class="fa fa-twitter twitter-color"></i>
                Twitter
            </a>
            <a href="https://plus.google.com/share?url=http://www.themeforest.net">
                <i class="fa fa-google-plus google-color"></i>
                Google
            </a>

            <a href="https://pinterest.com/pin/create/button/?url=http://www.themeforest.net/&media=https://0.s3.envato.com/files/63790821/profile-image.jpg&description=Themes%20and%20Templates">
                <i class="fa fa-pinterest-p pinterest-color"></i>
                Pinterest
            </a>
            <a href="sms:">
                <i class="fa fa-comment-o sms-color"></i>
                Text
            </a>
            <a href="mailto:?&subject=Check this page out!&body=http://www.themeforest.net">
                <i class="fa fa-envelope-o mail-color"></i>
                Email
            </a>
        </div>
        <a href="#" class="close-share-bottom">Close</a>
    </div>

</div>

</body>

