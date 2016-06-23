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

<title>ModeFlip</title>

<link href="styles/style.css"            rel="stylesheet" type="text/css">
<link href="styles/framework.css"        rel="stylesheet" type="text/css">
<link href="styles/owl.theme.css"        rel="stylesheet" type="text/css">
<link href="styles/swipebox.css"         rel="stylesheet" type="text/css">
<link href="styles/font-awesome.css"     rel="stylesheet" type="text/css">
<link href="styles/animate.css"          rel="stylesheet" type="text/css">
<link href="styles/slick.css"            rel="stylesheet" type="text/css">
<link href="styles/jquery.videocontrols.css"   rel="stylesheet" type="text/css">

<link href="styles/lightGallery.css"   rel="stylesheet" type="text/css">

<script type="text/javascript" src="scripts/jquery.js"></script>
<script type="text/javascript" src="scripts/jqueryui.js"></script>
<script type="text/javascript" src="scripts/framework.plugins.js"></script>
<script type="text/javascript" src="scripts/plugins.js"></script>
<script type="text/javascript" src="scripts/mustache.js"></script>
<script type="text/javascript" src="scripts/jquery.videocontrols.js"></script>
<script type="text/javascript" src="scripts/slick.js"></script>

<script type="text/javascript" src="scripts/lightgallery.min.js"></script>
<script type="text/javascript" src="scripts/lg-thumbnail.min.js"></script>
<script type="text/javascript" src="scripts/lg-fullscreen.min.js"></script>

<script type="text/javascript" src="scripts/collections.js"></script>


<script id="col_temp" type="text/mustache">
    <img src="{{profile_images.image_url}}" alt="img" class="responsive-image">

    <div class="one-half-responsive last-column">
        <div id="experience_{{did}}">
            {{#experience_content.brands}}
                <div><img class="homescreen-responsive-image" src="{{.}}"></div>
            {{/experience_content.brands}}
        </div>
    </div>

    <div id="bio_{{did}}" class="left-if-mobile no-bottom">
        {{bio}}
    </div>

    <div class="empty-space"></div>
    <div class="decoration"></div>

    <h4>作品浏览</h4>
    <a id="next-staff-{{did}}" href="#" class="next-staff"></a>
    <a id="prev-staff-{{did}}" href="#" class="prev-staff"></a>
    {{#experience_content}}
    <div id="staff-slider-{{did}}" class="staff-slider" data-snap-ignore="true">
        {{#pages}}
        <div class="staff-item">
            <div class="homescreen-gallery square-thumbs" data-snap-ignore="true">
                {{#pics}}
                <a href="{{image}}" class="homescreen-scale-hover experience-gallery" title="{{title}}">
                    <img class="homescreen-responsive-image" src="{{thumbnail}}" alt="img">
                </a>
                {{/pics}}
            </div>
        </div>
        {{/pages}}
    </div>
    {{/experience_content}}

    <div class="empty-space"></div>
    <div class="decoration"></div>

    {{#collections}}
    <div class="staff-item">
        <h4>{{title}}</h4>
    </div>
    {{#new_arrival}}
    <div id="sig_pic_{{did}}" class="exclusive-slider" data-snap-ignore="true">
        {{#signatrue_pics}}
        <div>
            <img src="{{.}}" class="responsive-image" alt="img">
        </div>
        {{/signatrue_pics}}
    </div>
    {{#signatrue_videos}}
    <div class="history_videos">
        <video id="sig_video_{{did}}" poster="{{thumbnail}}" width="100%" height="100%" controls="controls" preload="none">
            <source src="{{url}}" type="video/mp4">
        </video>
    </div>
    <div class="decoration"></div>
    <div class="empty-space"></div>
    {{/signatrue_videos}}
    {{/new_arrival}}


    <!-- <div class="adaptive-style">
        <a id="adaptive-three-activate-{{did}}-{{cid}}" class="adaptive-three-activate" href="#"><i class="fa fa-th"></i></a>
        <a id="adaptive-two-activate-{{did}}-{{cid}}" class="adaptive-two-activate" href="#"><i class="fa fa-th-large"></i></a>
        <a id="adaptive-one-activate-{{did}}-{{cid}}" class="adaptive-one-activate active-adaptive-style" href="#"><i class="fa fa-navicon"></i></a>
    </div>
    <div id="portfolio-adaptive-{{did}}-{{cid}}" class="portfolio-adaptive adaptive-one">
        {{#garments}}
        <div id="garment_{{did}}_{{cid}}_{{gid}}" class="adaptive-item">
            {{#pic}}
            <a href="{{image}}" class="garment_swiper" title="{{title}}">
                <img class="responsive-image" src="{{thumbnail}}" alt="img">
            </a>
            {{/pic}}
            <div style="display: none;">
                {{#more_pics}}
                <a href="{{image}}" class="garment_swiper" title="{{title}}"></a>
                {{/more_pics}}
            </div>
            <p class="category-title">
                <a href="{{shop_link}}" class="badge-cart"><i class="fa fa-shopping-cart"></i></a>
                <a href="#" class="badge-share show-share-bottom color-red-dark"><i class="fa fa-heart"></i></a>
            </p>
        </div>
        {{/garments}}

    </div>
    <div class="decoration"></div>
    {{/collections}} -->

    <!-- <div class="portfolio-one">
        <div class="portfolio-one-item full-bottom">
            <div class="portfolio-one-image">
                <a href="images/pictures/3.jpg" class="swipeboxtest" title="Caption Here">
                    <i class="fa fa-plus"></i>
                </a>
                <img src="images/pictures/3.jpg" class="responsive-image">
            </div>
            <div class="portfolio-one-text">
                <h3 class="title">990</h3>
                <em class="subtitle">Awesome one column portfolio</em>
                <div class="portfolio-one-details">
                    <a href="#">10 September 2055</a>
                    <a href="#">Mobile</a>
                    <a href="#">Envato Item</a>
                </div>
                <p class="half-bottom">
                    Lorem ipsum dolor sit amet, consectetur est adipiscing elit. Pellentesque lacus ex,
                    sollid um facilisis elementum quis, vulputate nec urna. In scelerisque tincidunt
                    enim, eutsmax.
                </p>
                <div class="portfolio-one-links">
                    <a href="#"><i class="fa fa-shopping-cart"></i> 点击购买</a>
                    <a href="#">Details <i class="fa fa-link"></i></a>
                </div>
            </div>
        </div>
        <div class="decoration"></div>
        <div class="portfolio-one-item full-bottom">
            <div class="portfolio-one-image">
                <a href="images/pictures/5.jpg" class="swipeboxtest" title="Caption Here">
                    <i class="fa fa-plus"></i>
                </a>
                <img src="images/pictures/5.jpg" class="responsive-image">
            </div>
            <div class="portfolio-one-text">
                <h3 class="title">990</h3>
                <em class="subtitle">Awesome one column portfolio</em>
                <div class="portfolio-one-details">
                    <a href="#">10 September 2055</a>
                    <a href="#">Mobile</a>
                    <a href="#">Envato Item</a>
                </div>
                <p class="half-bottom">
                    Lorem ipsum dolor sit amet, consectetur est adipiscing elit. Pellentesque lacus ex,
                    sollid um facilisis elementum quis, vulputate nec urna. In scelerisque tincidunt
                    enim, eutsmax.
                </p>
                <div class="portfolio-one-links">
                    <a href="#"><i class="fa fa-shopping-cart"></i> 点击购买</a>
                    <a href="#">Details <i class="fa fa-link"></i></a>
                </div>
            </div>
        </div>
    <div class="decoration"></div> -->




</script>

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
            <a href="/homepage"><i class="fa fa-home"></i>首页</a>
            <a href="/collections" class="selected-item"><i class="fa fa-shopping-cart"></i>产品</a>
            <a href="#"><i class="fa fa-user"></i>设计师</a>
            <a href="#"><i class="fa fa-book"></i>Book</a>
            <a href="#"><i class="fa fa-music"></i>3D 音乐</a>
            <a href="#"><i class="fa fa-newspaper-o"></i>时尚速递</a>
            <a href="#"><i class="fa fa-info"></i>关于Mode</a>
            <a href="#" class="sidebar-close"><i class="fa fa-times"></i>隐藏</a>
        </div>
    </div>

    <a href="#" class="footer-ball"><i class="fa fa-navicon"></i></a>

    <!-- Page Content-->
    <div id="content" class="snap-content">

        <div class="slider-container full-bottom">
            <div class="homepage-slider" data-snap-ignore="true">
                <div>
                    <div class="overlay"></div>
                    <div class="homepage-slider-caption homepage-left-caption">
                        <h3>Max Mara时尚概念</h3>
                        <p>独家定制</p>
                    </div>
                    <img src="http://assets.modeflip.com/collections/header1.jpg" class="responsive-image" alt="img">
                </div>
                <div>
                    <div class="overlay"></div>
                    <div class="homepage-slider-caption homepage-center-caption">
                        <h3>优质面料</h3>
                        <p>精致纯手工制作工艺</p>
                    </div>
                    <img src="http://assets.modeflip.com/collections/header2.jpg" class="responsive-image" alt="img">
                </div>
                <div>
                    <div class="overlay"></div>
                    <div class="homepage-slider-caption homepage-right-caption">
                        <h3>限量主题系列</h3>
                        <p>来自纽约，米兰</p>
                    </div>
                    <img src="http://assets.modeflip.com/collections/header3.jpg" class="responsive-image" alt="img">
                </div>
            </div>
        </div>



        <div id="mainbody" class="content">
            <div id='designer${did}'>

            <img src="${profile_images.get('image_url')}" alt="img" class="responsive-image">

            <div class="one-half-responsive last-column">
                <div id="experience_${did}">
                    <!-- {{#experience_content.brands}} -->
                    % for url in experience_content.get('brands'):
                        <!-- <div><img class="homescreen-responsive-image" src="{{.}}"></div> -->
                        <div><img class="homescreen-responsive-image" src="${url}"></div>
                    % endfor
                    <!-- {{/experience_content.brands}} -->
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

            <!-- {{#experience_content}} -->
            <div id="staff-slider-${did}" class="staff-slider" data-snap-ignore="true">
                % for page in experience_content.get('pages'):
                <!-- {{#pages}} -->
                <div class="staff-item">
                    <div class="homescreen-gallery square-thumbs" data-snap-ignore="true">
                        <!-- {{#pics}} -->
                        % for pic in page.get('pics'):
                        <!-- <a href="{{image}}" class="homescreen-scale-hover experience-gallery" title="{{title}}"> -->
                        <a href="${pic.get('image')}" class="homescreen-scale-hover experience-gallery" title="${pic.get('title')}">
                            <img class="homescreen-responsive-image" src="${pic.get('thumbnail')}" alt="img">
                        </a>
                        <!-- {{/pics}} -->
                        % endfor
                    </div>
                </div>
                <!-- {{/pages}} -->
                % endfor
            </div>
            <!-- {{/experience_content}} -->
            <div class="empty-space"></div>
            <div class="decoration"></div>


            <a id="dynamic" href="#" class="button center-button button-dark full-bottom detected-button">加载更多</a>

            <!-- <div id="lightgallery">
              <a href="images/resources/sophia/collections/201607/garments/1/pre1.jpg">
                  <img src="images/resources/sophia/collections/201607/garments/1/pre1.jpg" />
              </a>
              <a href="images/resources/sophia/collections/201607/garments/1/details/1.jpg">
                  <img src="images/resources/sophia/collections/201607/garments/1/details/1.jpg" />
              </a>
              <a href="images/resources/sophia/collections/201607/garments/1/details/2.jpg">
                  <img src="images/resources/sophia/collections/201607/garments/1/details/2.jpg" />
              </a>
            </div> -->







            <!-- <div class="portfolio-one">
                <div class="portfolio-one-item full-bottom">
                    <div class="portfolio-one-image">
                        <a href="images/resources/sophia/collections/201607/garments/1/pre1.jpg" class="swipeboxtest" title="蕾丝花边裙">
                            <i class="fa fa-plus"></i>
                        </a>
                        <img src="images/resources/sophia/collections/201607/garments/1/pre1.jpg" class="responsive-image">
                        <div style="display: none;">
                            <a href="images/resources/sophia/collections/201607/garments/1/details/1.jpg" class="swipeboxtest" title="111"></a>
                            <a href="images/resources/sophia/collections/201607/garments/1/details/2.jpg" class="swipeboxtest" title="222"></a>
                            <a href="images/resources/sophia/collections/201607/garments/1/details/3.jpg" class="swipeboxtest" title="333"></a>
                        </div>
                    </div>
                    <div class="portfolio-one-text">
                        <div class="portfolio-one-details">
                            <a>蕾丝花边裙</a>
                            <a><i class="fa fa-jpy"></i>&nbsp;990</a>
                            <div class="portfolio-two-links">
                                <a href="#"><i class="fa fa-shopping-cart"></i> 点击购买</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="decoration"></div>
            </div> -->




            </div>

            <div id='designer2'></div>

            <div id='designer3'></div>

            <div id='designer4'></div>


        </div>

        <!-- <div id="loaderbtn">
            <a id="loadmore" href="#" class="button center-button button-dark full-bottom detected-button"><i id="loadgif" class="fa fa-arrow-down"></i>加载更多</a>
        </div> -->


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

