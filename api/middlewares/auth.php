<?php
require __DIR__ . '/../classes/jwt_handler.php';
class Auth extends JwtHandler
{

    protected $db;
    protected $headers;
    protected $token;
    public function __construct($db, $headers)
    {
        parent::__construct();
        $this->db = $db;
        $this->headers = $headers;
    }

    public function is_auth()
    {
        if (array_key_exists('Authorization', $this->headers) && !empty(trim(
            $this->headers['Authorization']))) {
            $this->token = explode(' ', trim($this->headers['Authorization']));

            if (isset($this->token[1]) && !empty(trim($this->token[1]))) {
                $data = $this->_jwt_decode_data($this->token[1]);

                if (isset($data['auth']) && isset($data['data']->user_id) && $data['auth']) {
                    $user = $this->fetch_user($data['data']->user_id);
                    return $user;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    protected function fetch_user($user_id)
    {
        try {
            $query_stmt = $this->db->prepare(
                'SELECT name,email FROM users WHERE id=?');
            $query_stmt->bindValue(1, $user_id, PDO::PARAM_INT);
            $query_stmt->execute();

            if ($query_stmt->rowCount()) {
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                return [
                    'success' => 1,
                    'status' => 200,
                    'user' => $row,
                ];
            } else {
                return null;
            }
        } catch (PDOException $e) {
            return null;
        }

    }

}
