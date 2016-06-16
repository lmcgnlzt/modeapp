from pyramid.view import view_config


# # @view_config(route_name='home', renderer='templates/mytemplate.pt')
# @view_config(route_name='home', renderer='staic/index.mako')
# def my_view(request):
#     return {'project': 'mode'}


def index(request):
	print 'INDEX!!!'
	return {'success' : True}

def collections(request):
	print 'Collections!!!'
	return {'success' : True}