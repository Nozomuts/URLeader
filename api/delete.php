<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require_once 'db_connection.php';

$id = json_decode(file_get_contents('php://input'));

if (isset($id)) {
    $delete = $db->prepare('DELETE FROM todos WHERE id=?');
    $delete->execute([$id]);
    $result = $db->query('SELECT * FROM todos')->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}
