<?php

namespace dbUREC\Command;

class EditFacilityRest {

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
        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT * 
                FROM dbUREC_facility";

        $sth = $pdo->prepare($sql);

        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);

        return $result;
    }

    public function put()
    {
        
        $req = \Server::getCurrentRequest();
        $postarray = json_decode($req->getRawData(), true);

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "UPDATE dbUREC_facility
                SET name=:name, f_type=:f_type
                WHERE id = :id";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('name'=>$postarray['facilityName'], 'f_type'=>$postarray['facilityType'], 
                            'id'=>$postarray['facilityID']));

    }

    public function delete()
    {
        
        $fid = $_REQUEST['fid'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "DELETE FROM dbUREC_facility
                WHERE id = :fid";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('fid'=>$fid));
    }

    public function post()
    {
        $req = \Server::getCurrentRequest();
        $postarray = json_decode($req->getRawData(), true);

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "INSERT INTO dbUREC_facility
                VALUES(:name, :f_type, :id)";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('name'=>$postarray['facilityName'], 'f_type'=>$postarray['facilityType'], 
                            'id'=>$postarray['facilityID']));
  
    }
}
