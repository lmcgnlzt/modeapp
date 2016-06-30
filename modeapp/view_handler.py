from pyramid.httpexceptions import exception_response
from modeapp.utils.api_requests import ApiRequester


class RendersView(object):

	def __init__(self, context, request):
		self.request = request
		self.requester = ApiRequester('http://127.0.0.1:6543/modeapi')

	def index_view(self):
		return {'success' : True}

	def _did_list(self):
		return self.requester.get('/dids').json()

	def collections_view(self):
		r = self.requester.get('/portfolios/1')
		ret = r.json()
		ret['dids'] = self._did_list()
		return ret

	def designer_list_view(self):
		r = self.requester.get('/designers')
		ret = r.json()
		return {'designers':ret, 'dids':self._did_list()}

	def designer_view(self):
		did = int(self.request.params.get('did'))
		r = self.requester.get('/portfolios/{}'.format(did))
		return r.json()


def includeme(config):
	config.add_route('collections', '/collections')
	config.add_view(
		'modeapp.view_handler.RendersView',
		attr = 'collections_view',
		route_name = 'collections',
		renderer = 'modeapp:static/collections.mako'
	)

	config.add_route('designer_list', '/designer_list')
	config.add_view(
		'modeapp.view_handler.RendersView',
		attr = 'designer_list_view',
		route_name = 'designer_list',
		renderer = 'modeapp:static/designer_list.mako'
	)

	config.add_route('designer', '/designer_view')
	config.add_view(
		'modeapp.view_handler.RendersView',
		attr = 'designer_view',
		route_name = 'designer',
		renderer = 'modeapp:static/designer.mako'
	)