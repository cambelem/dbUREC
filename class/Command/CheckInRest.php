<?php

namespace dbUREC\Command;

class CheckInRest {

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

        $sql = "SELECT id, time_in, time_out 
                FROM dbUREC_time
                WHERE studentid = :banner OR employeeid = :banner
                GROUP BY id DESC";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('banner'=>$banner));
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);


        if(sizeof($result) == 0){
            return;
        }

        foreach($result as $key => $r)
        {
        	$result[$key]['time_in'] = date("n/j/Y - G:i:s a", $r['time_in']);
        	
        	if ($r['time_out'] != null)
        	{
        		$result[$key]['time_out'] = date("n/j/Y - G:i:s a", $r['time_out']);
        	}
        }

        return $result;
        
    }

    public function post()
    {
        
        //$req = \Server::getCurrentRequest();
       // $postarray = json_decode($req->getRawData(), true);
		
		$banner = $_REQUEST['student'];
		$timeIn = time();


        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "INSERT INTO dbUREC_time
                VAlUES (NULL, :time_in, NULL, :studentid, NULL)";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('time_in'=>$timeIn, 'studentid'=>$banner));

                            //'mname'=>$postarray['mname']
        
    }

    public function put()
    {
        
        $req = \Server::getCurrentRequest();
        $postarray = json_decode($req->getRawData(), true);

        foreach ($postarray as $p)
        {
        	if ($p != -1)
        	{
        		$id = $p;
        	}
        }

		//$id = $_REQUEST['id'];



		$timeOut = time();

        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "UPDATE dbUREC_time
                SET time_out=:time_out
                WHERE id = :id";

        $sth = $pdo->prepare($sql);

        $sth->execute(array('id'=>$id, 'time_out'=>$timeOut));
        
    }

}
