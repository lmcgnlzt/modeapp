import logging

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
			LOGGER.warning('raw: {}'.format(msg.raw))
		except ParseError as e:
			LOGGER.exception(e)


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