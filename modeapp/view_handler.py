from pyramid.httpexceptions import exception_response
from modeapp.utils.api_requests import ApiRequester


class RendersView(object):

	def __init__(self, context, request):
		self.request = request
		self.requester = ApiRequester('http://127.0.0.1:6543')

	def index_view(self):
		return {'success' : True}

	def collections_view(self):

		print 'collections_view'

		r = self.requester.get('/designers/1')
		ret = r.json()

		dids = self.requester.get('/dids').json()
		ret['dids'] = dids

		return ret

	# def collection_block_view(self):
	# 	did = int(self.request.matchdict.get('did'))
	# 	r = self.requester.get('/designers/next/{}'.format(did))




def includeme(config):
	config.add_route('collections', '/collections')
	config.add_view(
		'modeapp.view_handler.RendersView',
		attr = 'collections_view',
		route_name = 'collections',
		renderer = 'modeapp:static/collections.mako'
	)

	# config.add_route('collection_block', '/collection_block/{did:\d+}')
	# config.add_view(
	# 	'modeapp.view_handler.RendersView',
	# 	attr = 'collection_block_view',
	# 	route_name = 'collection_block',
	# 	renderer = 'modeapp:static/collection_block.mako')