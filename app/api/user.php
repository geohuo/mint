<?php
require_once "../db/user.php";
require_once "../redis/function.php";
require_once "../public/function.php";

$model = new User(redis_connect());

switch ($_REQUEST["_method"]) {
	case 'index':
		# get
		$model->index();
		break;
	case 'list':
		# post
		$model->list();
		break;
	case 'create':
		# post
		$model->create();
		break;
	case 'show':
		# get
		$model->show();
		break;	
	case 'update':
		# post
		$model->update();
		break;	
	case 'delete':
		# get
		$model->delete();
		break;
	case 'reset_email':
		# get
		$model->reset_password_send_email();
		break;	
	default:
		# code...
		break;
}


?>