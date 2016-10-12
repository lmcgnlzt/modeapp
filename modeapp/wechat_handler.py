#coding=utf-8

import logging
import requests
import json

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
			raw = msg.raw

			LOGGER.warning('mtype: {}'.format(mtype))
			LOGGER.warning('target: {}'.format(target))
			LOGGER.warning('source: {}'.format(source))

			if mtype == 'scan':
				key = msg.key
				ticket = msg.ticket

				LOGGER.warning('key: {}'.format(key))
				LOGGER.warning('ticket: {}'.format(ticket))

				# send message back to scanner
				ACCESS_TOKEN = 'N_KqqIhlHaszelmT2VBLLwoQfikwdv2j8hSnzVm_NDDsPEzwezuJhxGyOwE6IRh0DtLeU0YYTFs-6PMvZZQowpqSFdhxaBp8APhU7PmVlCOrjUJGq-BFJtHrByI_nA9YVRDeAFAJFR'
				send_url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s'%ACCESS_TOKEN
				content = u"恭喜您获得积分".encode('utf-8')
				data = {
				    "touser":source,
				    "msgtype":"text",
				    "text":
				    {
				         "content":content
				    }
				}
				res = requests.post(send_url, data=json.dumps(data))
				LOGGER.warning('Message sent back to scanner %s [%s]', source, res.status_code)

		except ParseError as e:
			LOGGER.exception(e)
		return ''


def includeme(config):
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
ACCESS_TOKEN = 'N_KqqIhlHaszelmT2VBLLwoQfikwdv2j8hSnzVm_NDDsPEzwezuJhxGyOwE6IRh0DtLeU0YYTFs-6PMvZZQowpqSFdhxaBp8APhU7PmVlCOrjUJGq-BFJtHrByI_nA9YVRDeAFAJFR'

def update_access_token():
	url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'%(APPID, APPSECRET)
	res = requests.get(url)
	data = json.loads(res.text)
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