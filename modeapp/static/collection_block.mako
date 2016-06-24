<%block name="collection_block">
<img src="${profile_images.get('image_url')}" alt="img" class="responsive-image">


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
    % for page in experience_content.get('pages'):
    <div class="staff-item">
        <div class="homescreen-gallery square-thumbs" data-snap-ignore="true">
            % for pic in page.get('pics'):
            <a href="${pic.get('image')}" class="homescreen-scale-hover experience-gallery" title="${pic.get('title')}">
                <img class="homescreen-responsive-image" src="${pic.get('thumbnail')}" alt="img">
            </a>
            % endfor
        </div>
    </div>
    % endfor
</div>
<div class="empty-space"></div>
<div class="decoration"></div>


% for col_index, collection in enumerate(collections):
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
% for video in collection.get('signatrue_videos'):
<div class="history_videos">
    <video id="sig_video_${did}" poster="${video.get('thumbnail')}" width="100%" height="100%" controls="controls" preload="none">
        <source src="${video.get('url')}" type="video/mp4">
    </video>
</div>
<div class="decoration"></div>
<div class="empty-space"></div>
% endfor
% endif

<div class="portfolio-one">
    % for gar_index, garment in enumerate(collection.get('garments')):
    <div class="portfolio-one-item full-bottom">
        <div class="portfolio-one-image">
            <a href="#" onclick="javascript:load_gallery(this, ${did}, ${collection.get('cid')}, ${garment.get('gid')});""><i class="fa fa-plus"></i></a>
            <img src="${garment.get('pic').get('image')}" class="responsive-image">
        </div>
        <div class="portfolio-one-text">
            <div class="portfolio-one-details">
                <a>${garment.get('pic').get('title')}</a>
                <a><i class="fa fa-jpy"></i>&nbsp;990</a>
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
</%block>