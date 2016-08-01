import logging

from pyramid.httpexceptions import exception_response
from pyramid.renderers import render_to_response

from wechat_sdk import WechatConf
from wechat_sdk import WechatBasic
from wechat_sdk.exceptions import ParseError

LOGGER = logging.getLogger(__name__)


APPID = 'wx007c42b9e3f7413d'
APPSECRET = '015cc6487b24128615e2ed395f04de52'
ENCODING_AES_KEY = 'fLRkv4uRIGFZUTtKbe5xy55jKhFJhwVA5IezXd0nqT6'


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
		    encrypt_mode='safe',
		    encoding_aes_key=ENCODING_AES_KEY
		)
		return WechatBasic(conf=conf)

	def auth(self):
		LOGGER.warning('Authorizing .....')
		signature = self.request.params.get('signature')
		timestamp = self.request.params.get('timestamp')
		nonce = self.request.params.get('nonce')
		echostr = self.request.params.get('echostr', '')
		if self.wechat.check_signature(signature, timestamp, nonce):
			LOGGER.warning('Accept')
			LOGGER.warning(echostr)
			return echostr
		else:
			LOGGER.warning('Something gone wrong')
			return 'Access verification fail'

	def process(self):
		LOGGER.warning('Processing POST request .....')
		data = self.request.json_body
		try:
		    self.wechat.parse_data(data)

		    msg = self.wechat.message
		    mid = msg.id
		    target = msg.target
		    source = msg.source
		    time = msg.time
		    mtype = msg.type
		    raw = msg.raw

		    LOGGER.warning('{} {} {} {} {} {}'.format(mid, target, source, time, mtype, raw))
		except ParseError:
			LOGGER.error('Invalid Body Text')
		return 'OK'


# def add_view(config, route_name, method, attr):
# 	handler = 'modeapp.wechat_handler.WechatView'
# 	config.add_view(
# 		handler,
# 		attr=attr,
# 		route_name=route_name,
# 		request_method=method,
# 		xhr=True,
# 		renderer='string'
# 	)


def includeme(config):
	config.add_route('wechat', '/wechat')
	# add_view(config, 'process', 'GET', 'auth')
	# add_view(config, 'process', 'POST', 'process')


	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'auth',
		route_name = 'wechat',
		request_method = 'GET',
		xhr=True,
		renderer='string'
	)

	config.add_view(
		'modeapp.wechat_handler.WechatView',
		attr = 'wechat_view',
		route_name = 'wechat',
		request_method = 'POST',
		xhr=True,
		renderer='string'
	)