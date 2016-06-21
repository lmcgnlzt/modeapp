# from vr.common.graphite.metrics import MetricsClient
import logging
import re
import requests

LOGGER = logging.getLogger(__name__)
KWARGS_MAX_LENGTH = 1000 # max number of characters of `repr(kwargs)` that should be included in log statement

class ApiRequester(object):
	invalid_metric_chars_re = re.compile(r'[^a-zA-Z_\-0-9\.]')

	def __init__(self, base_url, metrics_prefix=None):
		self.base_url = base_url
		if not metrics_prefix:
			metrics_prefix = self._sanitize_key_segment(self.base_url)
		# self.metrics = MetricsClient(metrics_prefix)

	@classmethod
	def _sanitize_key_segment(cls, key):
		'''
		Sanitize key based on https://github.com/etsy/statsd/blob/e2aec69a89ae45fa47e879be4d001c81623a2ef6/backends/graphite.js#L107
		'''
		return cls.invalid_metric_chars_re.sub('', key.replace('.', '_').replace('/', '-'))

	def request(self, method, route, **kwargs):
		escaped_route = self._sanitize_key_segment(route)
		method_and_route = method + escaped_route
		# self.metrics.incr(method_and_route + '.requests')
		try:
			# with self.metrics.timer(method_and_route + '.time'):
				resp = requests.request(method, self.base_url + route, **kwargs)
		except requests.exceptions.RequestException:
			# note: do not assume resp is defined in this block
			# self.metrics.incr(method_and_route + '.errors')
			LOGGER.exception('request to %s %s failed with %.*r', method, self.base_url + route, KWARGS_MAX_LENGTH, kwargs)
			raise
		if resp.status_code != 200:
			# self.metrics.incr(method_and_route + '.http_errors')
			LOGGER.error('%s %s returned %s with %.*r', method, resp.url, resp.status_code, KWARGS_MAX_LENGTH, kwargs)
		else:
			LOGGER.info('%s %s returned successfully', method, resp.url)
		return resp

	def head(self, route, **kwargs):
		return self.request('HEAD', route, **kwargs)

	def get(self, route, **kwargs):
		return self.request('GET', route, **kwargs)

	def post(self, route, **kwargs):
		return self.request('POST', route, **kwargs)

	def put(self, route, **kwargs):
		return self.request('PUT', route, **kwargs)

	def patch(self, route, **kwargs):
		return self.request('PATCH', route, **kwargs)

	def delete(self, route, **kwargs):
		return self.request('DELETE', route, **kwargs)
