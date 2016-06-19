from pyramid.config import Configurator


from pyramid.renderers import render_to_response # remove
from pyramid.authentication import AuthTktAuthenticationPolicy # remove
from pyramid.authorization import ACLAuthorizationPolicy # remove
from pyramid.view import view_config # remove



@view_config(route_name='auth', renderer='main.mako')
def login_view(request): # remove
    # login = request.params.get('login')
    password = request.params.get('password')
    if request.method == 'POST':
        # if login and USERS.get(login) == password:
        if password == '2016':
            return render_to_response('modeapp:static/index.mako', {}, request=request)
    return {}



# def index_routes(config):
# 	config.add_route('index', '/')
# 	config.add_view(
# 		'modeapp.views.index',
# 		route_name = 'index',
# 		renderer = 'modeapp:static/index.mako'
# 	)


def home_routes(config): # remove
	'''
	This is temporary for redirecting to home page, remove after getting rid of auth and enable index_routes
	'''
	config.add_route('homepage', '/homepage')
	config.add_view(
		'modeapp.views.homepage',
		route_name = 'homepage',
		renderer = 'modeapp:static/index.mako'
	)


def collections_routes(config):
	config.add_route('collections', '/collections')
	config.add_view(
		'modeapp.views.collections',
		route_name = 'collections',
		renderer = 'modeapp:static/collections.mako'
	)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_mako')


    authn_policy = AuthTktAuthenticationPolicy('sosecret', hashalg='sha512') # remove
    authz_policy = ACLAuthorizationPolicy() # remove
    config.set_authentication_policy(authn_policy) # remove
    config.set_authorization_policy(authz_policy) # remove
    config.add_route('auth', '/') # remove


    # config.include(index_routes)
    config.include(home_routes) # remove
    config.include(collections_routes)

    static_dir = settings.get('static_directory')
    config.add_static_view('images', static_dir + '/images')
    config.add_static_view('styles', static_dir + '/styles')
    config.add_static_view('scripts', static_dir + '/scripts')
    config.add_static_view('fonts', static_dir + '/fonts')

    config.scan()
    return config.make_wsgi_app()
