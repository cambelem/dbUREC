<?php

namespace dbUREC\Command;

class MenuRest {

    public function execute()
    {
        switch($_SERVER['REQUEST_METHOD']){
            case 'GET':
                $data = $this->get();
                echo (json_encode($data));
                exit;
            default:
                header('HTTP/1.1 405 Method Not Allowed');
                exit;
        }
    }

    public function get()
    {
        $banner = $_REQUEST['student'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT * 
                FROM dbUREC_student
                WHERE bannerid = :banner";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('banner'=>$banner));
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);


        if(sizeof($result) == 0){
            return;
        }

        return $result;
    }
}

