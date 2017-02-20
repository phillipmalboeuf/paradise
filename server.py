
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

from core import app
import webbrowser


if __name__ == '__main__':
	if app.config['DEBUG']:
		app.run(port=8080, threaded=True)

	else:
		server = HTTPServer(WSGIContainer(app))
		server.listen(5000)
		IOLoop.instance().start()