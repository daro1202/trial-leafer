<?php
require_once './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

preg_match('|'.dirname($_SERVER["SCRIPT_NAME"]).'/([\w%/]*)|', $_SERVER["REQUEST_URI"], $matches);
$paths = explode('/',$matches[1]);
$file = array_shift($paths);

$file_path = dirname( __FILE__ ) . '/controllers/'.ucfirst($file).'Controller.php';
if(file_exists($file_path)){
    include($file_path);
    $class_name = ucfirst($file)."Controller";
    $method_name = strtolower($_SERVER["REQUEST_METHOD"]);
    $object = new $class_name();
    $response = json_encode($object->$method_name(...$paths));
    $response_code = $object->code ?? 200;
    //header("Access-Control-Allow-Origin: *");
    //header("Content-Type: application/json; charset=utf-8", true, $response_code);
    echo $response;
}else{
    header("HTTP/1.1 404 Not Found");
    exit;
}
