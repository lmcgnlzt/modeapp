#coding=utf-8

import logging
import requests
import json
import urlparse
from datetime import datetime

from pyramid.httpexceptions import exception_response
from pyramid.renderers import render_to_response

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
				state = urlparse.parse_qs(parsed.query)['state']
				if state == 'merchant_login':
					open_id = source
					'''
					if open_id authorised: # call /merchant/{open_id}/authorized
						directly show enter page
					else:
						show login page


					'''

					return render_to_response('modeapp:static/auth.mako', {}, request=self.request)


			elif mtype == 'scan':
				key = msg.key
				ticket = msg.ticket

				LOGGER.warning('key: {}'.format(key))
				LOGGER.warning('ticket: {}'.format(ticket))

				# send message back to scanner
				# ACCESS_TOKEN = 'zftwG1TEvnNCOF5RhbG1Qc-8uwUCWMDU1l5z5_FfQkAcBXWeEuUX0kGMGy8ei8Lwr6-xLxaabiUBLxXxeE18bYfYHxcfoe3WJLbFB3ZDlHoBKCTc4DCKbKICHQfn1Dr1NVAfAIAJRW'
				# send_url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s'%ACCESS_TOKEN
				# body = {
				#     "touser":source,
				#     "msgtype":"text",
				#     "text":
				#     {
				#          "content":u"恭喜获得积分"
				#     }
				# }
				# res = requests.post(send_url, data=json.dumps(body, ensure_ascii=False).encode('utf8'))
				# LOGGER.warning('Message sent back to scanner %s [%s]', source, res.status_code)

		except ParseError as e:
			LOGGER.exception(e)
		return ''

	def merchant_auth_view(self):
	    client = self.request.user_agent_classified
	    # if client.is_pc: # user_agent detect
	    #     return render_to_response('modeapp:static/block.mako', {}, request=request)

	    username = self.request.params.get('username')
	    password = self.request.params.get('password')
	    if self.request.method == 'POST':
	    	print username, password
	        if password == '123':
	            return render_to_response('modeapp:static/index.mako', {}, request=self.request)
	    return {}



def includeme(config):
	config.add_route('merchant_auth', '/merchantlogin')
	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'merchant_auth_view',
		route_name = 'merchant_auth',
		renderer='auth.mako',
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




import json
import requests
ACCESS_TOKEN = 'okhveeR9k8rCGyLjWrxf8vclQ__B8eSMfOWq1AMm2mEkG8qYkZzTK-xr2X3wh2qI1267yzPq3g_0BLdakcF2CcHwk-oNWm8scFQ7Cvd9Qa_Snlhp1hi0apyBw2f8GoSSPKBgADAZUL'

def update_access_token():
	url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'%(APPID, APPSECRET)
	res = requests.get(url)
	data = json.loads(res.text)
	print data
	print data['access_token']


def generate_code():
	ticket_url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=%s' % ACCESS_TOKEN
	body = {"expire_seconds": 604800, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": 123}}}
	res = requests.post(ticket_url, data=json.dumps(body))
	print res
	data = json.loads(res.text)
	print data




# update_access_token()
# generate_code()