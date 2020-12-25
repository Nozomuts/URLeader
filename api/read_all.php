<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once 'db_connection.php';

$result = $db->query('SELECT * FROM todos')->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
