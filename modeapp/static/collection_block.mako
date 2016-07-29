<%block name="collection_block">

<a href="/designer_view?did=${did}"><img src="${profile_images.get('image_url')}" alt="img" class="responsive-image"></a>


<div class="one-half-responsive last-column">
    <div id="experience_${did}">
        % for url in experience_content.get('brands'):
            <div><img class="homescreen-responsive-image" src="${url}"></div>
        % endfor
    </div>
</div>


<div id="bio_${did}" class="left-if-mobile no-bottom">
    ${intro}
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


<div class="empty-space"></div>
<div class="decoration"></div>
<div class="empty-space"></div>


<div><h4 class="experience-header">设计师独家签约限量系列</h4><em style="float:right;">Exclusive Collections</em></div>
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
                <a href="${garment.get('shop_link')}" class="portfolio-one-shop-links"><i class="fa fa-shopping-cart"></i>&nbsp;SHOP NOW</a>
            </div>
        </div>
        <div class="decoration"></div>
        % endfor
    </div>
    % endfor


% else:

    <div class="portfolio-one">
        <div class="portfolio-one-item full-bottom">
            <div class="portfolio-one-image-soon">
                <div class="soon-page">
                    <h1>Coming Soon</h1>
                    <p>
                        距设计师产品上线还有
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

<div class="empty-space"></div>
<div class="empty-space"></div>
<div class="empty-space"></div>

</%block>