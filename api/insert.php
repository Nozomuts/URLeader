<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require_once 'db_connection.php';

$data = json_decode(file_get_contents('php://input'));

if (isset($data->title)) {
    $insert = $db->prepare('INSERT INTO todos SET title=?,text=?');
    $insert->execute([$data->title, $data->text]);
    $result = $db->query('SELECT * FROM todos')->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
