from pyramid.config import Configurator


def index_routes(config):
	config.add_route('index', '/')
	config.add_view(
		'mode.views.index',
		route_name = 'index',
		renderer = 'mode:static/index.mako'
	)

def collections_routes(config):
	config.add_route('collections', '/collections')
	config.add_view(
		'mode.views.collections',
		route_name = 'collections',
		renderer = 'mode:static/collections.mako'
	)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)

    config.include(index_routes)
    config.include(collections_routes)

    static_dir = settings.get('static_directory')
    config.add_static_view('images', static_dir + '/images')
    config.add_static_view('styles', static_dir + '/styles')
    config.add_static_view('scripts', static_dir + '/scripts')
    config.add_static_view('fonts', static_dir + '/fonts')

    config.scan()
    return config.make_wsgi_app()
