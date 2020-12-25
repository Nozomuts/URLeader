<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require_once 'db_connection.php';

$data = json_decode(file_get_contents('php://input'));

if (isset($data->id)) {
    $update = $db->prepare('UPDATE todos SET title=?,text=? WHERE id=?');
    $update->execute([$data->title, $data->text, $data->id]);
}
