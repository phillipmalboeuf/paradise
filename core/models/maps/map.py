
from core import app
from flask import request, abort

from core.helpers.json import to_json
from core.models.core.model import Model
from core.models.core.has_routes import HasRoutes
from core.models.core.with_templates import WithTemplates

from core.helpers.validation_rules import validation_rules
from core.tasks.trigger import trigger_tasks

from bson.objectid import ObjectId



with app.app_context():
	class Map(WithTemplates, HasRoutes, Model):

		collection_name = 'maps'
		collection_sort = [('updated_at', -1), ('created_at', -1)]

		schema = {
			'title': validation_rules['text'],
			'tags': validation_rules['text_list'],
			'style': validation_rules['text'],
			'center': validation_rules['coordinate'],
			'zoom': validation_rules['number'],
			'direction': validation_rules['int'],
			'metadata': validation_rules['metadata']
		}


		endpoint = '/maps'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET']
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'update_view',
				'methods': ['PATCH', 'PUT'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_user': True
			}
		]

		templates = [
			{
				'view_function': 'list_view',
				'template': 'maps/maps.html',
				'response_key': 'maps'
			},
			{
				'view_function': 'get_view',
				'template': 'maps/map.html',
				'response_key': 'map'
			}
		]



		@classmethod
		def create(cls, document):

			

			document['_id'] = ObjectId()


			trigger_tasks.apply_async(('map_created', {
				'map': document
			}))


			return super().create(document)



		@classmethod
		def update(cls, _id, document, other_operators={}, projection={}):


			document = super().update(_id, document, other_operators, projection)


			trigger_tasks.apply_async(('map_updated', {
				'map': document
			}))


			return document




		@classmethod
		def preprocess(cls, document):


			return super().preprocess(document)



		@classmethod
		def postprocess(cls, document):

			return document




		# VIEWS

		@classmethod
		def tagged_view(cls, tag):
			limit = int(request.args.get('limit', 0))
			skip = int(request.args.get('skip', 0))

			return cls._format_response({
				'tag': tag,
				'maps': cls.list({'tags': tag}, limit=limit, skip=skip)
			})


