#coding=utf-8

import logging
import requests
import json
import urlparse
from datetime import datetime

from pyramid.httpexceptions import exception_response
from pyramid.renderers import render_to_response
from modeapp.utils.api_requests import ApiRequester

from wechat_sdk import WechatConf
from wechat_sdk import WechatBasic
from wechat_sdk.exceptions import ParseError

LOGGER = logging.getLogger(__name__)


APPID = 'wx007c42b9e3f7413d'
APPSECRET = '015cc6487b24128615e2ed395f04de52'
ENCODING_AES_KEY = '53auzEkabG10LoUxAJrzUAWiURobcLlQdl3ssDMlXKZ'


class WechatView(object):

	def __init__(self, context, request):
		self.request = request
		self.wechat = WechatView._handshake()
		self.requester = ApiRequester('http://127.0.0.1:6543/membership_api')

	@staticmethod
	def _handshake():
		conf = WechatConf(
		    token='modefliptwentysixteen',
		    appid=APPID,
		    appsecret=APPSECRET,
		    encrypt_mode='normal',
		    encoding_aes_key=ENCODING_AES_KEY
		)
		return WechatBasic(conf=conf)

	def wechat_view(self):
		"""
		signature: 812f66bf7d8921fa88074df318fe87b8e5d330f4
		timestamp: 1470026375
		nonce: 1073925489
		echostr: 5192829631555622807
		"""
		signature = self.request.params.get('signature')
		timestamp = self.request.params.get('timestamp')
		nonce = self.request.params.get('nonce')
		echostr = self.request.params.get('echostr', '')
		LOGGER.warning('signature: {}'.format(signature))
		LOGGER.warning('timestamp: {}'.format(timestamp))
		LOGGER.warning('nonce: {}'.format(nonce))
		LOGGER.warning('echostr: {}'.format(echostr))
		if self.wechat.check_signature(signature, timestamp, nonce):
			LOGGER.warning('Accept')
		else:
			LOGGER.warning('Something gone wrong')
		return echostr

	def post_view(self):
		body = self.request.body
		try:
			self.wechat.parse_data(body)
			msg = self.wechat.message

			mtype = msg.type
			target = msg.target
			source = msg.source

			LOGGER.warning('mtype: {}'.format(mtype))
			LOGGER.warning('target: {}'.format(target))
			LOGGER.warning('source: {}'.format(source))

			if mtype == 'view':
				key = msg.key
				parsed_url_info = urlparse.urlparse(key)
				LOGGER.warning('parsed_url_info: {}'.format(parsed_url_info))
				state = urlparse.parse_qs(parsed_url_info.query).get('state', [])
				LOGGER.warning('state: {}'.format(state))
				if 'merchant_login' in state:
					open_id = source
					LOGGER.warning('open_id: {}'.format(open_id))

			elif mtype == 'scan':
				key = msg.key
				LOGGER.warning('[Scan event captured] from [%s], scene_key: %s', source, key)

				if bool(key):
					payload = {'scene_key': key, 'scanner_open_id': source}
					self.requester.post('/member/scan', json=payload) # this can be refactored later to accept all kinds of scan

		except ParseError as e:
			LOGGER.exception(e)
		return ''

	def auth_by_open_id_view(self):
		open_id = self.request.matchdict['open_id']
		return render_to_response('modeapp:static/index.mako', {}, request=self.request)

	def merchant_auth_view(self):
	    client = self.request.user_agent_classified
	    if client.is_pc: # user_agent detect
	        return render_to_response('modeapp:static/block.mako', {}, request=self.request)

	    if self.request.method == 'GET':
		    CODE = self.request.params.get('code')
		    data = requests.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid={}&secret={}&code={}&grant_type=authorization_code'.format(APPID, APPSECRET, CODE)).json()
		    open_id = data.get('openid', '')
		    access_token = data.get('access_token')
		    LOGGER.warning('[Wechat oauth] CODE: {}, openid: {}, access_token: {}'.format(CODE, open_id, access_token))
		    if bool(open_id):
			    authorized = self.requester.get('/merchant/{}/authorized'.format(open_id)).json()
			    if authorized:
			    	return render_to_response('modeapp:static/about.mako', {}, request=self.request)

	    elif self.request.method == 'POST':
	    	username = self.request.params.get('username', '')
	    	password = self.request.params.get('password', '')
	    	open_id = self.request.params.get('open_id', '')


	    	# open_id = 'olBwZt_NW0IBseUIa5fImCCj_dn4'


	    	LOGGER.warning('[Login attempted] username: {}, password: {}, open_id: {}'.format(username, password, open_id))
	    	if all([username.strip(), password.strip(), open_id.strip()]):
	    		payload = {'user_name': username, 'plaintext_passwd': password, 'open_id': open_id}
	    		LOGGER.warning('[Merchant login] payload: {%s}', payload)
		    	verified = self.requester.post('/merchant/login', json=payload).json()
		        if verified:
		        	return render_to_response('modeapp:static/sales.mako', {'merchant_name': username}, request=self.request)

	    return {'open_id': open_id}

	def member_view(self):
		client = self.request.user_agent_classified
		if client.is_pc: # user_agent detect
			return render_to_response('modeapp:static/block.mako', {}, request=self.request)
		CODE = self.request.params.get('code')
		data = requests.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid={}&secret={}&code={}&grant_type=authorization_code'.format(APPID, APPSECRET, CODE)).json()
		open_id = data.get('openid', '')
		access_token = data.get('access_token')
		LOGGER.warning('[Member View] CODE: {}, openid: {}, access_token: {}'.format(CODE, open_id, access_token))

		# open_id = 'olBwZt_NW0IBseUIa5fImCCj_dn4'

		if bool(open_id):
			info_dict = self.requester.get('/member/{}'.format(open_id)).json()
			if info_dict is not None:
				return {'total_points': info_dict['total_points'], 'last_updated_on': info_dict['last_updated_on']}
			else:
				return {'total_points': 0, 'last_updated_on': None}



def includeme(config):
	config.add_route('merchant_auth', '/merchantlogin')
	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'merchant_auth_view',
		route_name = 'merchant_auth',
		renderer='auth.mako',
	)

	config.add_route('auth_by_open_id', '/open_id/{open_id}')
	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'auth_by_open_id_view',
		route_name = 'auth_by_open_id',
		request_method='GET'
	)

	config.add_route('wechat', '/wechat')
	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'wechat_view',
		route_name = 'wechat',
		renderer='string',
		request_method='GET'
	)

	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'post_view',
		route_name = 'wechat',
		renderer='string',
		request_method='POST'
	)


	config.add_route('member_page', '/member')
	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'member_view',
		route_name = 'member_page',
		renderer='points.mako',
	)




# import json
# import requests
# ACCESS_TOKEN = 'kRRRHEkTbvGOi8IvwM_miEyirmpktwVBAa0LkP3tCwWDIz1fTxfLGv19zDlh9pCfci0GSTgica3XIz7qBCqZo698jmF_-Bfg2m3tG4LidbVQemcr5daq2AvrImSBn9cpOPQfAAAFGH'

# def update_access_token():
# 	url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'%(APPID, APPSECRET)
# 	res = requests.get(url)
# 	data = json.loads(res.text)
# 	print data
# 	print data['access_token']


# def generate_code():
# 	ticket_url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=%s' % ACCESS_TOKEN
# 	# body = {"expire_seconds": 3600, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": 777}}}
# 	body = {"expire_seconds": 60, "action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": 'TRANSACTION-444'}}}
# 	res = requests.post(ticket_url, data=json.dumps(body))
# 	print res
# 	data = json.loads(res.text)
# 	print data


# update_access_token()
# generate_code()