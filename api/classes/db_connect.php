<?php
class Database
{
    private $db_host = 'db';
    private $db_name = 'react_auth';
    private $db_username = 'root';
    private $db_password = 'secret';

    public function db_connection()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_name, $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo 'Connection error ' . $e->getMessage();
            exit;
        }
    }
}
