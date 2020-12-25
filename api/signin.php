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
require __DIR__ . '/classes/jwt_handler.php';

$db_connection = new Database();
$conn = $db_connection->db_connection();

$data = json_decode(file_get_contents('php://input'));
$return_data = [];

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    $return_data = msg(0, 404, 'Page Not Found!');
} elseif (!isset($data->email) || !isset($data->password) || empty(trim($data->email)) || empty(trim($data->password))) {
    $fields = ['fields' => ['email', 'password']];
    $return_data = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
} else {
    $email = trim($data->email);
    $password = trim($data->password);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $return_data = msg(0, 422, 'Invalid Email Address!');
    } elseif (strlen($password) < 8) {
        $return_data = msg(0, 422,
            'Your password must be at least 8 characters long!');
    } else {
        try {
            $query_stmt = $conn->prepare('SELECT * FROM users WHERE email=?');
            $query_stmt->bindValue(1, $email, PDO::PARAM_STR);
            $query_stmt->execute();

            if ($query_stmt->rowCount()) {
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);

                if ($check_password) {
                    $jwt = new JwtHandler();
                    $token = $jwt->_jwt_encode_data('http://localhost/', ['user_id' => $row['id']]);
                    $return_data = [
                        'success' => 1,
                        'message' => 'You have successfully logged in.',
                        'token' => $token,
                    ];
                } else {
                    $return_data = msg(0, 422, 'Invalid Password!');
                }
            } else {
                $return_data = msg(0, 422, 'Invalid Email Address!');
            }
        } catch (PDOException $e) {
            $return_data = msg(0, 500, $e->getMessage());
        }
    }
}

echo json_encode($return_data);
