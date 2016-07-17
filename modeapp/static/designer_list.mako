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

<title>Top Designers x MODE FLIP</title>

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
<script type="text/javascript" src="scripts/slick.min.js"></script>

<script type="text/javascript" src="scripts/lightgallery.min.js"></script>
<script type="text/javascript" src="scripts/lg-thumbnail.min.js"></script>

<script type="text/javascript" src="scripts/designer_list.js"></script>


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
            <!-- <a href="#"><i class="fa fa-rss"></i>FASHION</a>
            <a href="#"><i class="fa fa-info"></i>MODE FLIP</a> -->
            <a href="#" class="sidebar-close"><i class="fa fa-times"></i>Close</a>
        </div>
    </div>


    <a id="red-footer-ball" href="#" class="footer-ball"><i class="fa fa-navicon"></i></a>



    <!-- Page Content-->
    <div id="content" class="snap-content">

        <div id="designer_page" class="content">

            <!-- <div class="content-heading">
                <h1>Top Designers x MODEF LIP</h1>
            </div> -->

            <div class="decoration"></div>
            <div style="display: none;" id="did_list">${dids}</div>

            % for index, designer in enumerate(designers):
            <div id="designer-${designer.get('did')}" class="one-half-responsive">
                % if index % 2 == 0:
                <p class="thumb-left no-bottom">
                % else:
                <p class="thumb-right no-bottom">
                <!-- <p class="thumb-left no-bottom"> -->
                % endif
                    <a href="/designer_view?did=${designer.get('did')}"><img src="${designer.get('profile_images').get('icon_url')}" alt="img"></a>
                    <strong>${designer.get('name')}</strong>
                    <br>
                    <em id="bio_${designer.get('did')}" class="more">${designer.get('intro')}</em>
                </p>
                <div class="designer_experience">
                    % for brand in designer.get('experience_content').get('brands'):
                    <div><img class="homescreen-responsive-image" src="${brand}"></div>
                    % endfor
                </div>
                <div class="thumb-clear"></div>
            </div>
            <div class="decoration"></div>
            % endfor


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

    <div class="share-bottom">
        <h3>长按二维码保存并分享</h3>
        <div class="share-qr"><img src="http://assets.modeflip.com/ui/qr.jpg" alt="img"></div>
        <a href="#" class="close-share-bottom">Close</a>
    </div>

</div>

</body>

