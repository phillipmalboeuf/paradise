
from core import app
from core.helpers.json import to_json, json_formater

from flask import request, abort
from flask import render_template, json

from werkzeug.contrib.cache import SimpleCache

import os



def page():
	cached_template = app.caches['/pages'].get(request.path)
	if cached_template is None or app.config['DEBUG']:
		response = {
			'current_path': request.path,
			'root': request.host_url,
			'debugging': app.config['DEBUG']
		}

		render = render_template('pages/' + request.endpoint + '.html', **response)
		app.caches['/pages'].set(request.path, render, timeout=0)
		return render

	else:
		return cached_template


app.caches['/pages'] = SimpleCache()
for file in os.listdir(app.template_folder+'/pages'):
	if file == 'index.html':
		app.add_url_rule('/', 'index', methods=['GET'])
		app.view_functions['index'] = page

	else:
		route = file.replace('.html', '')
		app.add_url_rule('/' + route, route, methods=['GET'])
		app.view_functions[route] = page

		




