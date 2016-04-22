<?php

namespace dbUREC\Command;

class AddUserRest {


    public function execute()
    {
    
        $banner = $_REQUEST['student'];
//	$cid	= $_POST['cid'];
	$fname = $_POST['firstName'];
	$mname = $_POST['MidName'];
	$lname = $_POST['lastName'];
	$bday = $_POST['bDay'];
	$address = $_POST['climbAdd'];
	$phoneNum = $_POST['phoneNum'];
//	$email = $_POST['email'];
	
        $db = \Database::newDB();
        $pdo = $db->getPDO();

        $sql = "INSERT INTO dbUREC_student 
                values(:banner, null, :fname, :mname, :lname, :bday, :address, :phoneNumber, 'default@gmail.com')";


        $sth = $pdo->prepare($sql);

        $sth->execute(array('banner'=>$banner, 'fname'=>$fname, 
                            'mname'=>$mname,'lname'=>$lname, 
                            'bday'=>$bday, 'address'=>$address, 
                            'phoneNumber'=>$phoneNum));
				//'email'=>$email
        return \PHPWS_Core::reroute('index.php?module=dbUREC&action=menu&student='.$banner);

    }

}
