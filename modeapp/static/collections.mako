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
<!-- <link href="http://vjs.zencdn.net/4.12/video-js.css" rel="stylesheet" type="text/css"> -->

<script type="text/javascript" src="scripts/jquery.js"></script>
<script type="text/javascript" src="scripts/jqueryui.js"></script>
<script type="text/javascript" src="scripts/framework.plugins.js"></script>
<script type="text/javascript" src="scripts/plugins.js"></script>
<script type="text/javascript" src="scripts/slick.js"></script>

<script type="text/javascript" src="scripts/lightgallery.min.js"></script>
<script type="text/javascript" src="scripts/lg-thumbnail.min.js"></script>
<!-- <script type="text/javascript" src="http://vjs.zencdn.net/4.12/video.js"></script> -->
<script type="text/javascript" src="scripts/lg-video.min.js"></script>

<script type="text/javascript" src="scripts/collections.js"></script>

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
            % for index, did in enumerate(dids):
                % if index == 0:
                <div id='designer${did}'>
                    <%include file="modeapp:static/collection_block.mako"/>
                </div>
                % else:
                <div id='designer${did}'></div>
                % endif
            % endfor
            <div style="display: none;" id="curr_did">${dids[0]}</div>
        </div>




        <div id="loaderbtn">
            <a id="loadmore" href="#" class="button center-button button-dark full-bottom detected-button"><i id="loadgif" class="fa fa-arrow-down"></i>加载更多</a>
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

