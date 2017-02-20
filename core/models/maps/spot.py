
from core import app
from flask import request, abort

from core.helpers.json import to_json
from core.models.core.child_model import ChildModel
from core.models.core.has_child_routes import HasChildRoutes
from core.models.core.with_templates import WithTemplates

from core.models.maps.map import Map

from core.helpers.validation_rules import validation_rules
from core.tasks.trigger import trigger_tasks

from bson.objectid import ObjectId



with app.app_context():
	class Spot(HasChildRoutes, ChildModel):

		parent = Map
		list_name = 'models'

		schema = {
			'title': validation_rules['text'],
			'category': validation_rules['text'],
			'description': validation_rules['text'],
			'coordinates': validation_rules['coordinate'],
			'metadata': validation_rules['metadata']
		}


		endpoint = '/spots'
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






