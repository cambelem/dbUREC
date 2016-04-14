<?php

namespace dbUREC\Command;

class EditEquipmentRest {

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
                FROM dbUREC_equipment";

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

        $sql = "UPDATE dbUREC_equipment
                SET name=:name, e_type=:e_type
                WHERE id = :id";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('name'=>$postarray['equipmentName'], 'e_type'=>$postarray['equipmentType'], 
                            'id'=>$postarray['equipmentID']));

    }

    public function delete()
    {
        
        $eid = $_REQUEST['eid'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "DELETE FROM dbUREC_equipment
                WHERE id = :eid";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('eid'=>$eid));
    }

    public function post()
    {
        $req = \Server::getCurrentRequest();
        $postarray = json_decode($req->getRawData(), true);

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "INSERT INTO dbUREC_equipment
                VALUES(:id, null, null, :name, :e_type)";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('name'=>$postarray['equipmentName'], 'e_type'=>$postarray['equipmentType'], 
                            'id'=>$postarray['equipmentID']));
  
    }
}
