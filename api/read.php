<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'db_connection.php';

$data = $db->prepare('SELECT * FROM todos WHERE id=?');
$data->execute([$_GET['id']]);
$result = $data->fetch(PDO::FETCH_ASSOC);

echo json_encode($result);
