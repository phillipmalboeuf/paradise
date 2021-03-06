
from flask import Flask
import os
import sys

from flask_pymongo import PyMongo

from celery import Celery
from elasticsearch import Elasticsearch, Urllib3HttpConnection
# import certifi


if getattr(sys, 'frozen', False):
    app_path = os.path.abspath(os.path.dirname(sys.executable))
elif __file__:
    app_path = os.path.abspath(os.path.dirname(__file__))+'/..'


app = Flask(__name__, static_folder=app_path+'/files', template_folder=app_path+'/layouts')

app.path = app_path
app.config.from_pyfile(app.path+'/config/environment.py')
try:
	app.config.from_pyfile(app.path+'/config/environment_dev.py')
except FileNotFoundError:
	pass

app.jinja_env.add_extension('jinja2.ext.do')
app.jinja_env.add_extension('jinja2.ext.loopcontrols')

app.mongo = PyMongo(app)
app.caches = {}


# app.search = Elasticsearch(
# 	app.config['ELASTICSEARCH_HOST'].split(','),
# 	connection_class=Urllib3HttpConnection,
# 	http_auth=(app.config['ELASTICSEARCH_USER'], app.config['ELASTICSEARCH_PASSWORD']),
# 	use_ssl=True,
# 	verify_certs=True,
# 	ca_certs=certifi.where()
# )


celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
celery.config_from_object(app.config)

from core.tasks.execute import execute_task
from core.tasks.trigger import trigger_tasks
from core.tasks.scheduled import scheduled_tasks
from core.tasks.search import search_index, search_delete

from core.pages.pages import *
from core.pages.errors import *

from core.helpers.verify_headers import *
from core.helpers.access_control_origin import *
from core.helpers.filters import *



from core.models.utilities.upload import Upload
from core.models.utilities.search import Search

Upload.define_routes()
Search.define_routes()


from core.models.auth.token import Token
from core.models.auth.session import Session
from core.models.auth.user import User

Token.define_routes()
Session.define_routes()
User.define_routes()


from core.models.maps.map import Map
from core.models.maps.spot import Spot

Map.define_routes()
Spot.define_routes()


from core.models.tasks.scheduled import ScheduledTask
from core.models.tasks.triggered import TriggeredTask

ScheduledTask.define_routes()
TriggeredTask.define_routes()






