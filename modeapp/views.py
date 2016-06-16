from pyramid.view import view_config
import logging

from wechat_sdk import WechatConf
from wechat_sdk import WechatBasic

# # @view_config(route_name='home', renderer='templates/mytemplate.pt')
# @view_config(route_name='home', renderer='staic/index.mako')
# def my_view(request):
#     return {'project': 'mode'}

def handshake(params):
	conf = WechatConf(
	    token='modefliptwentysixteen',
	    appid='wx007c42b9e3f7413d',
	    appsecret='015cc6487b24128615e2ed395f04de52',
	    encrypt_mode='safe',
	    encoding_aes_key='UNippv5nGwtw0zgeSROQ82qzDhFcFfCdpGTkZ9nEbBn'
	)
	wechat = WechatBasic(conf=conf)
	signature = params.get('signature')
	timestamp = params.get('timestamp')
	nonce = params.get('nonce')
	print 'echostr:', params.get('echostr')
	if wechat.check_signature(signature, timestamp, nonce):
		return params.get('echostr')
	return None


def index(request):
	# echostr = handshake(request.params)
	print 'INDEX!!!'
	return {'success' : True}


def collections(request):
	print 'Collections!!!'
	return {'success' : True}