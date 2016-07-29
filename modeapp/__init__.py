from pyramid.config import Configurator

from pyramid.renderers import render_to_response
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.view import view_config



@view_config(route_name='auth', renderer='auth.mako')
def auth_view(request):
    # client = request.user_agent_classified
    # if client.is_pc: # user_agent detect
    #     return render_to_response('modeapp:static/block.mako', {}, request=request)
    return render_to_response('modeapp:static/index.mako', {}, request=request)

    # password = request.params.get('password')
    # if request.method == 'POST':
    #     if password == '12345':
    #         return render_to_response('modeapp:static/index.mako', {}, request=request)
    # return {}


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.include('pyramid_useragent')


    authn_policy = AuthTktAuthenticationPolicy('sosecret', hashalg='sha512')
    authz_policy = ACLAuthorizationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    config.add_route('auth', '/')


    config.include('modeapp.api_handler')
    config.include('modeapp.view_handler')


    static_dir = settings.get('static_directory')
    config.add_static_view('images', static_dir + '/images')
    config.add_static_view('styles', static_dir + '/styles')
    config.add_static_view('scripts', static_dir + '/scripts')
    config.add_static_view('fonts', static_dir + '/fonts')

    config.scan()
    return config.make_wsgi_app()
