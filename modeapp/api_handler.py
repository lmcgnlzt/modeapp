from pyramid.httpexceptions import exception_response
from modeapp.utils.api_requests import ApiRequester
from pyramid.renderers import render


class APIView(object):

	def __init__(self, context, request):
		self.request = request
		self.requester = ApiRequester('http://127.0.0.1:6543/modeapi')

	def get_dids(self):
		return self.requester.get('/dids').json()

	def get_collections_data(self):
		curr_did = int(self.request.matchdict.get('curr_did'))
		res = self.requester.get('/portfolios/{}/next'.format(curr_did))
		data = res.json()
		html_content = render('modeapp:static/collection_block.mako', data['designer'], request=self.request)
		data['designer'] = html_content # update designer with rendered html view
		return data

	def get_garments_data(self):
		did = int(self.request.params.get('did'))
		cid = int(self.request.params.get('cid'))
		gid = int(self.request.params.get('gid'))
		ret = self.requester.get('/garments/{}/{}/{}'.format(did, cid, gid))
		return ret.json()

	def get_experience_data(self):
		did = int(self.request.params.get('did'))
		ret = self.requester.get('/experience/{}'.format(did))
		return ret.json()



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

	config.add_route('garments', '/api/garments')
	add_view(config, 'garments', 'GET', 'get_garments_data')

	config.add_route('experience', '/api/experience')
	add_view(config, 'experience', 'GET', 'get_experience_data')
