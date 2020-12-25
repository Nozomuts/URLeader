<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/classes/db_connect.php';
require __DIR__.'/middlewares/auth.php';

$all_headers = getallheaders();
$db_connection = new Database();
$conn = $db_connection->db_connection();
$auth = new Auth($conn,$all_headers);

$return_data = [
    "success" => 0,
    "status" => 401,
    "message" => "Unauthorized"
];

if($auth->is_auth()){
    $return_data = $auth->is_auth();
}

echo json_encode($return_data);