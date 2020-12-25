<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message,
    ], $extra);
}

require __DIR__ . '/classes/db_connect.php';

$db_connection = new Database();
$conn = $db_connection->db_connection();
$data = json_decode(file_get_contents('php://input'));
$return_data = [];

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    $return_data = msg(0, 404, 'Page Not Found!');
} elseif (!isset($data->name) || !isset($data->email) || !isset($data->password) || empty(trim($data->name)) || empty(trim($data->email)) || empty(trim($data->password))) {
    $fields = ['fields' => ['name', 'email', 'password']];
    $return_data = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
} else {
    $name = trim($data->name);
    $email = trim($data->email);
    $password = trim($data->password);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $return_data = msg(0, 422, 'Invalid Email Address!');
    } elseif (strlen($password) < 8) {
        $return_data = msg(0, 422,
            'Your password must be at least 8 characters long!');
    } else {
        try {
            $check_email_stmt = $conn->prepare('SELECT email FROM users WHERE email=?');
            $check_email_stmt->bindValue(1, $email, PDO::PARAM_STR);
            $check_email_stmt->execute();

            if ($check_email_stmt->rowCount()) {
                $return_data = msg(0, 422, 'This E-mail already in use!');
            } else {
                $insert_stmt = $conn->prepare(
                    'INSERT INTO users SET name=?,email=?,password=?');
                // DATA BINDING
                $insert_stmt->bindValue(1, htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(2, $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(3, password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
                $insert_stmt->execute();
                $return_data = msg(1, 201, 'You have successfully registered.');
            }
        } catch (PDOException $e) {
            $return_data = msg(0, 500, $e->getMessage());
        }

    }

}

echo json_encode($returnData);
