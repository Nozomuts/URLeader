<?php
require __DIR__ . '/../jwt/JWT.php';
require __DIR__ . '/../jwt/ExpiredException.php';
require __DIR__ . '/../jwt/SignatureInvalidException.php';
require __DIR__ . '/../jwt/BeforeValidException.php';

use \Firebase\JWT\JWT;

class JwtHandler
{
    protected $jwt_secret;
    protected $token;
    protected $issued_at;
    protected $expire;
    protected $jwt;

    public function __construct()
    {
        date_default_timezone_set('Asia/Kolkata');
        $this->issued_at = time();
        $this->expire = $this->issued_at + 3600;
        $this->jwt_secret = 'this_is_my_secret';
    }

    public function _jwt_encode_data($iss, $data)
    {
        $this->token = [
            'iss' => $iss,
            'aud' => $iss,
            'iat' => $this->issued_at,
            'exp' => $this->expire,
            'data' => $data,
        ];
        
        $this->jwt = JWT::encode($this->token, $this->jwt_secret);
        return $this->jwt;
    }

    protected function _err_msg($msg)
    {
        return [
            'auth' => 0,
            'message' => $msg,
        ];
    }

    public function _jwt_decode_data($jwt_token)
    {
        try {
            $decode = JWT::decode($jwt_token, $this->jwt_secret, ['HS256']);
            return [
                'auth' => 1,
                'data' => $decode->data,
            ];
        } catch (\Firebase\JWT\ExpiredException $e) {
            return $this->_err_msg($e->getMessage());
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            return $this->_err_msg($e->getMessage());
        } catch (\Firebase\JWT\BeforeValidException $e) {
            return $this->_err_msg($e->getMessage());
        } catch (\DomainException $e) {
            return $this->_err_msg($e->getMessage());
        } catch (\InvalidArgumentException $e) {
            return $this->_err_msg($e->getMessage());
        } catch (\UnexpectedValueException $e) {
            return $this->_err_msg($e->getMessage());
        }

    }
}
