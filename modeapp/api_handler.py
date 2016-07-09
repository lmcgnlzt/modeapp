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
		did = int(self.request.GET.get('did'))
		cid = int(self.request.GET.get('cid'))
		gid = int(self.request.GET.get('gid'))
		ret = self.requester.get('/garments/{}/{}/{}'.format(did, cid, gid))
		return ret.json()

	def get_experience_data(self):
		did = int(self.request.GET.get('did'))
		ret = self.requester.get('/experience/{}'.format(did))
		return ret.json()

	def get_experience_sig_pics(self):
		did = int(self.request.GET.get('did'))
		ret = self.requester.get('/experience/sig_pics/{}'.format(did))
		return ret.json()

	def get_experience_pics(self):
		did = int(self.request.GET.get('did'))
		ret = self.requester.get('/experience/pics/{}'.format(did))
		return ret.json()

	def increment_likes(self):
		did = int(self.request.matchdict.get('did'))
		ret = self.requester.put('/designers/{}/like'.format(did))
		return ret.json()

	def increment_wishes(self):
		did = int(self.request.matchdict.get('did'))
		ret = self.requester.put('/designers/{}/wish'.format(did))
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

	config.add_route('experience_sig_pics', '/api/experience/sig_pics')
	add_view(config, 'experience_sig_pics', 'GET', 'get_experience_sig_pics')

	config.add_route('experience_pics', '/api/experience/pics')
	add_view(config, 'experience_pics', 'GET', 'get_experience_pics')

	config.add_route('do_like', '/api/designers/{did:\d+}/like')
	add_view(config, 'do_like', 'GET', 'increment_likes')

	config.add_route('do_wish', '/api/designers/{did:\d+}/wish')
	add_view(config, 'do_wish', 'GET', 'increment_wishes')
