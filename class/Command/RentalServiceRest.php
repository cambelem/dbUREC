<?php

namespace dbUREC\Command;

class RentalServiceRest {

    public function execute()
    {
        switch($_SERVER['REQUEST_METHOD']){
            case 'GET':
                if(isset($_REQUEST['type'])){
                    $data = $this->getAvailGear($_REQUEST['type']);
                } else {
                    $data = $this->getClimberGear();
                }

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

    // Grabs Climber Rental Gear
    public function getClimberGear()
    {
        $banner = $_REQUEST['student'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT * 
                FROM dbUREC_equipment
                WHERE renterid=:id";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('id'=>$banner));
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);

        return $result;
    }

    public function getAvailGear($eType)
    {
        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT name, count(*) as count, e_type
                FROM dbUREC_equipment
                WHERE e_type = :eType AND renterid IS NULL AND employeeid IS NULL
                GROUP BY name";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('eType'=>$eType));
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);

        return $result;
    }

    public function put()
    {
        
        $gear = $_REQUEST['gear'];
        $banner = $_REQUEST['student'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "SELECT id 
                FROM dbUREC_equipment
                WHERE name=:gear AND renterid IS NULL AND employeeid IS NULL
                LIMIT 1";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('gear'=>$gear));
        $result = $sth->fetch(\PDO::FETCH_ASSOC);



        $sql = "UPDATE dbUREC_equipment
                SET renterid=:banner
                WHERE id = :id";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('banner'=>$banner, 'id'=>$result['id']));

    }

    public function delete()
    {
        
        $eid = $_REQUEST['eid'];

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "UPDATE dbUREC_equipment
                SET renterid = NULL and employeeid = NULL
                WHERE id = :eid";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('eid'=>$eid));
    }

    public function post()
    {




        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "INSERT INTO dbUREC_equipment
                VALUES(:id, null, null, :name, :e_type)";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('name'=>$postarray['equipmentName'], 'e_type'=>$postarray['equipmentType'], 
                            'id'=>$postarray['equipmentID']));
  
    }
}
