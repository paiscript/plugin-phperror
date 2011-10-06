<?php

if (!defined('E_USER_DEPRECATED')) { define('E_USER_DEPRECATED', 16384); }

function pai_error_handler($level, $message, $file, $line) {
	if (!error_reporting()) { return; }
	
	$message = strip_tags($message);
	if (substr($message, 0, 5) == 'PAI: ') {
		$line = (int) substr($message, strrpos($message, ' ')+1);
		$file = substr($message, strrpos($message, ' in ')+4, -strlen($line)-9);
		$message = substr($message, 0, -(strlen($file)+strlen($line)+13));
	}
	
	$name = null;
	$die = false;
	
	switch($level) {
	case E_USER_ERROR: $name = 'Error'; $die = true; break;
	case E_USER_WARNING: $name = 'Warning'; break;
	case E_USER_NOTICE: $name = 'Notice'; break;
	case E_USER_DEPRECATED: $name = 'Deprecated'; break;
	}
	
	
	if ($name) {
		$message = "$name: $message";
	}
	
	if (@constant('PAI_AJAX')) {
		global $pai_ajax_response;
		if (!isset($pai_ajax_response['php-errors'])) {
			$pai_ajax_response['php-errors'] = array();
		}
		$pai_ajax_response['php-errors'][] = array($level, $message, $file, $line);
		return true;
	}
	else {
		if ($die) { 
			echo "$message in $file on line $line";
			die(1); 
		}
		
		global $pai_errors;
		if (!isset($pai_errors)) { $pai_errors = array(); }
		$pai_errors[] = array($level, $message, $file, $line);
		return true;
	}
}

function php_error_footer() {
	global $pai_errors;
	if (isset($pai_errors)) {
		echo '<script>';
		foreach($pai_errors AS $info) {
			echo 'PAI("PHPError", '.json_encode($info[0]).', '.json_encode($info[1]).', '.json_encode($info[2]).', '.json_encode($info[3]).');';
		}
		echo '</script>';
	}
}

pai_add_action('footer', 'php_error_footer', 99);

set_error_handler('pai_error_handler');
