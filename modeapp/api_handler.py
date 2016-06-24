from pyramid.httpexceptions import exception_response
from modeapp.utils.api_requests import ApiRequester
from pyramid.renderers import render


class APIView(object):

	def __init__(self, context, request):
		self.request = request
		self.requester = ApiRequester('http://127.0.0.1:6543')

	def get_dids(self):
		return self.requester.get('/dids').json()

	def get_collections_data(self):
		curr_did = int(self.request.matchdict.get('curr_did'))
		res = self.requester.get('/designers/next/{}'.format(curr_did))
		data = res.json()
		html_content = render('modeapp:static/collection_block.mako', data['designer'], request=self.request)
		data['designer'] = html_content # update designer with rendered html view
		# return {'view': html_content, 'has_next': data['has_next']}
		return data



def add_view(config, route_name, method, attr):
	handler = 'modeapp.api_handler.APIView'
	config.add_view(
		handler,
		attr=attr,
		route_name=route_name,
		request_method=method,
		renderer='json'
	)


def includeme(config):
	config.add_route('dids', '/api/dids')
	add_view(config, 'dids', 'GET', 'get_dids')

	config.add_route('next_collections', '/api/next_collections/{curr_did:\d+}')
	add_view(config, 'next_collections', 'GET', 'get_collections_data')
