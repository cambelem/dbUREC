<?php

namespace dbUREC\Command;

class ShowClimberRest {

    public function execute()
    {
        switch($_SERVER['REQUEST_METHOD']){
            case 'GET':
                $data = $this->get();
                echo (json_encode($data));
                exit;
            case 'PUT':
                $this->put();
                exit;
            case 'DELETE':
                $this->delete();
                exit;
            case 'POST':
                $this->post();
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

        return $result;
    }

    public function put()
    {
        
        $req = \Server::getCurrentRequest();
        $postarray = json_decode($req->getRawData(), true);



        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "UPDATE dbUREC_student
                SET fname=:fname, mname=:mname, lname=:lname, bday=:bday, address=:address, phoneNumber=:phoneNumber
                WHERE bannerid = :banner";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('banner'=>$postarray['bannerid'], 'fname'=>$postarray['fname'], 
                            'mname'=>$postarray['mname'],     'lname'=>$postarray['lname'], 
                            'bday'=>$postarray['bday'],       'address'=>$postarray['address'], 
                            'phoneNumber'=>$postarray['phoneNumber']));

        echo json_encode(1);
    }

    public function delete()
    {
        /*
        $banner = $_REQUEST['student'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "DELETE FROM dbUREC_student
                WHERE bannerid = :banner";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('banner'=>$banner));
        */
    }
}
