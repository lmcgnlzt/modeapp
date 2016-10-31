import json
from pyramid.httpexceptions import exception_response
from modeapp.utils.api_requests import ApiRequester
from pyramid.renderers import render


class APIView(object):

	def __init__(self, context, request):
		self.request = request
		self.modeapi_requester = ApiRequester('http://127.0.0.1:6543/modeapi')
		self.membershipapi_requester = ApiRequester('http://127.0.0.1:6543/membership_api')

	def get_dids(self):
		return self.modeapi_requester.get('/dids').json()

	# def get_collections_data(self):
	# 	curr_did = int(self.request.matchdict.get('curr_did'))
	# 	res = self.modeapi_requester.get('/portfolios/{}/next'.format(curr_did))
	# 	data = res.json()
	# 	html_content = render('modeapp:static/collection_block.mako', data['designer'], request=self.request)
	# 	data['designer'] = html_content # update designer with rendered html view
	# 	return data

	def get_collections_data(self):
		did = int(self.request.matchdict.get('did'))
		res = self.modeapi_requester.get('/portfolios/{}'.format(did))
		data = res.json()
		html_content = render('modeapp:static/collection_block.mako', data, request=self.request)
		data['designer'] = html_content # update designer with rendered html view
		return data

	def get_garments_data(self):
		did = int(self.request.GET.get('did'))
		cid = int(self.request.GET.get('cid'))
		gid = int(self.request.GET.get('gid'))
		ret = self.modeapi_requester.get('/garments/{}/{}/{}'.format(did, cid, gid))
		return ret.json()

	def get_experience_data(self):
		did = int(self.request.GET.get('did'))
		ret = self.modeapi_requester.get('/experience/{}'.format(did))
		return ret.json()

	def get_experience_sig_pics(self):
		did = int(self.request.GET.get('did'))
		ret = self.modeapi_requester.get('/experience/sig_pics/{}'.format(did))
		return ret.json()

	def get_experience_pics(self):
		did = int(self.request.GET.get('did'))
		ret = self.modeapi_requester.get('/experience/pics/{}'.format(did))
		return ret.json()

	def increment_likes(self):
		did = int(self.request.matchdict.get('did'))
		ret = self.modeapi_requester.put('/designers/{}/like'.format(did))
		return ret.json()

	def increment_wishes(self):
		did = int(self.request.matchdict.get('did'))
		ret = self.modeapi_requester.put('/designers/{}/wish'.format(did))
		return ret.json()

	def get_item_tags(self):
		ret = self.membershipapi_requester.get('/merchant/items/tags')
		return ret.json()

	def get_item(self):
		tag = int(self.request.matchdict.get('tag'))
		ret = self.membershipapi_requester.get('/merchant/items/{}'.format(tag))
		return ret.json()

	def generate_qr(self):
		payload = self.request.json_body
		qr_image_url = self.membershipapi_requester.post('/merchant/generate', json=payload)
		# qr_image_url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEz8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1NreEJ4djdtejU2Mi1mUmFkbVJRAAIEkIoNWAMEAAAAAA=='
		return qr_image_url



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

	config.add_route('next_collections', '/api/next_collections/{did:\d+}')
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

	config.add_route('item_tags', '/api/sales/tags')
	add_view(config, 'item_tags', 'GET', 'get_item_tags')

	config.add_route('item', '/api/sales/items/{tag}')
	add_view(config, 'item', 'GET', 'get_item')

	config.add_route('generate_qr', '/api/generate_qr')
	add_view(config, 'generate_qr', 'POST', 'generate_qr')
