<!DOCTYPE HTML>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimal-ui" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<link rel="apple-touch-icon" sizes="196x196" href="images/store/splash/apple-touch-icon-196x196.png">
<link rel="apple-touch-icon" sizes="180x180" href="images/store/splash/apple-touch-icon-180x180.png">
<link rel="apple-touch-icon" sizes="152x152" href="images/store/splash/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="144x144" href="images/store/splash/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="120x120" href="images/store/splash/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="114x114" href="images/store/splash/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="76x76" href="images/store/splash/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="72x72" href="images/store/splash/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="60x60" href="images/store/splash/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="57x57" href="images/store/splash/apple-touch-icon-57x57.png">
<link rel="icon" type="image/png" href="images/store/splash/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="images/store/splash/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="images/store/splash/favicon-16x16.png" sizes="16x16">
<link rel="shortcut icon" href="images/store/splash/favicon.ico" type="image/x-icon" />
<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Raleway:900,800,700' rel='stylesheet' type='text/css'>

<title>MODE FLIP</title>

<link href="styles/store/style.css" rel="stylesheet" type="text/css">
<link href="styles/store/framework.css" rel="stylesheet" type="text/css">
<link href="styles/font-awesome.css" rel="stylesheet" type="text/css">

<script type="text/javascript" src="scripts/store/jquery.js"></script>
<script type="text/javascript" src="scripts/store/plugins.js"></script>
<script type="text/javascript" src="scripts/store/points.js"></script>
</head>

<body class="has-cover">

<div class="gallery-fix"></div>         <!-- Fix Gallery next/prev error on Android -->
<div class="sidebar-tap-close"></div>   <!-- Overlay for content to close Sidebar -->

<div class="header-fixed">
    <a href="#" class="points-logo">Points</a>
    <!-- <a href="#" class="header-icon-3 open-right-sidebar"><i class="fa fa-navicon"></i></a> -->
</div>

<div class="header-search">
    <input type="text" value="Looking for something?">
    <a class="close-search-bar" href="#"><i class="fa fa-times"></i></a>
</div>


<!-- <div class="sidebar-right">
    <div class="sidebar-scroll">
        <div class="sidebar-header right-sidebar-header">
            <h3>其他</h3>
            <a class="close-sidebar" href="#"><i class="fa fa-times"></i></a>
            <div class="clear"></div>
        </div>
        <div class="sidebar-divider full-bottom">
            In your cart
        </div>
        <div class="sidebar-cart">

        </div>
        <div class="sidebar-menu">
            <a class="menu-item" href="#">
                <i class="fa fa-shopping-cart"></i>
                See all cart items
                <i class="fa fa-circle"></i>
            </a>
        </div>
        <div class="sidebar-divider">
            Recommended categories
        </div>
        <div class="sidebar-recommend">
            <a href="#">Tech & Devices<em class="bg-red-dark">1</em></a>
            <a href="#">Mobile & Tablets<em class="bg-green-dark">5</em></a>
            <a href="#">Design & Graphics<em class="bg-blue-dark">8</em></a>
            <a href="#">Coding & Development<em class="bg-magenta-dark">15</em></a>
        </div>
        <div class="sidebar-divider">
            Let's get social
        </div>
        <div class="sidebar-menu">
            <a class="menu-item" href="#">
                <i class="fa fa-facebook"></i>
                Facebook
                <i class="fa fa-circle"></i>
            </a>
            <a class="menu-item" href="#">
                <i class="fa fa-twitter"></i>
                Twitter
                <i class="fa fa-circle"></i>
            </a>
            <a class="menu-item" href="#">
                <i class="fa fa-google-plus"></i>
                Google
                <i class="fa fa-circle"></i>
            </a>
            <div class="sidebar-divider">
                GET IN TOUCH
            </div>
            <a class="menu-item" href="#">
                <i class="fa fa-phone"></i>
                Call Us
                <i class="fa fa-circle"></i>
            </a>
            <a class="menu-item" href="#">
                <i class="fa fa-fax"></i>
                Fax Us
                <i class="fa fa-circle"></i>
            </a>
            <a class="menu-item" href="#">
                <i class="fa fa-envelope-o"></i>
                Mail Us
                <i class="fa fa-circle"></i>
            </a>
            <div class="sidebar-divider">
                BONUS! 50 extra pages included
            </div>
            <a class="menu-item" href="page-sitemap.html">
                <i class="fa fa-gift"></i>
                Extra Pages
                <i class="fa fa-circle"></i>
            </a>
        </div>
        <em class="sidebar-copyright">Copyright 2016. All Rights Reserved</em>
    </div>
</div> -->

<div id="page-content">
    <div id="page-content-scroll"><!--Enables this element to be scrolled -->

        <div class="coverpage-slider coverpage-news half-bottom">
            <div class="cover-slide cover-screen" style="background-image:url(http://assets.modeflip.com/auth/background.jpg)">
                <div class="cover-news">
                    <h4>您当前线下消费积分为：<b>${total_points}</b></h4>
                    % if total_points != 0:
                    <h5>最近一次获得积分：<a href="#">${last_updated_on}</a></h5>
                    % endif
                    <p class="half-bottom">
                        在MODE FLIP实体店消费，使用销售人员提供的二维码即可获得线下积分。
                        积分相关活动敬请关注后续通知，感谢您关注MODE FLIP。
                    </p>
                    <p class="half-bottom">
                        Find The Perfect Design at MODE
                    </p>
                    <a href="www.modeflip.com" class="button-more-cover">MODE 主页</a>
                    <!-- <a href="#" class="button-love-cover"><i class="color-red-dark fa fa-heart"></i></a>
                    <a href="#" class="button-share-cover show-share-bottom"><i class="color-white fa fa-retweet"></i></a> -->
                </div>
                <div class="overlay overlay-news"></div>
            </div>
            <!-- <div class="cover-slide cover-screen" style="background-image:url(images/store/pictures/3.jpg)">
                <div class="cover-news">
                    <h4>Designed as coverslider but with multiple variatins added!</h4>
                    <h5>1 hour ago <a href="#">by Enabled</a></h5>
                    <p class="half-bottom">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis nec sapien ac cursus. Vestibulum in imperdiet augue.
                    </p>
                    <a href="#" class="button-more-cover">Read More</a>
                    <a href="#" class="button-love-cover"><i class="color-red-dark fa fa-heart"></i></a>
                    <a href="#" class="button-share-cover show-share-bottom"><i class="color-white fa fa-retweet"></i></a>
                </div>
                <div class="overlay overlay-news"></div>
            </div> -->

        </div>

    </div>
    <a href="#" class="back-to-top-badge"><i class="fa fa-caret-up"></i>Back to top</a>
</div>

</body>