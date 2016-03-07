<?php
namespace usercontrol\Command;

class AddUser {
	
    public function __construct()
    {

    }

    public function execute()
    {      
        $db_host = 'localhost';
		$db_user = '';
		$db_pass = '';
		$filename = 'useradd.log';
		$user_id = null;
		$group_id = null;
		$username = 'eberhardtm';
		$display_name = 'Ted Eberhard';
		$email = 'eberhardtm@appstate.edu';
		$auth_script = 2;

		$db_con = mysql_connect($db_host, $db_user, $db_pass) or die("Unable to connect to Mysql");
		echo 'Connected to server...'."\n";

		//$handle = fopen($filename, 'r+');

		$db_list = mysql_query("SHOW DATABASES");
		$db_names = array();

		if(!empty($db_list)){
		  while($row= mysql_fetch_assoc($db_list)){
		    $db_names[] = $row['Database'];  
		  }
		}
		/* test db names
		foreach($db_names as $value)
		  echo $value . "\n";
		*/
		$log = '';
		echo 'running query on db\'s...'."\n";
		foreach($db_names as $value){
		  $db = $value;
		  $user_id = NULL;
		  $group_id = NULL;

		  $select = mysql_select_db($db,$db_con);
		  if($select){
		    // check if we have an existing user
		    $query = "select * from users where username='$username'";
		    $user_exists = mysql_query($query);

		    if($user_exists && !mysql_fetch_row($user_exists)){
		      // check the users sequence number and set user id
		      $query = 'SELECT * FROM users_auth_scripts WHERE display_name="shibbolethnocreate.php"';
		      $result = mysql_query($query);
		      if($result){
		        $row = mysql_fetch_assoc($result);
		        if($row)
		          $auth_script = $row['id'];
		        else
		          $auth_script = 1;
		      }
		      $query = 'select * from users_seq';
		      $result = mysql_query($query);
		      if($result){
			$row = mysql_fetch_row($result);
			$user_id = $row[0]+1;
		      }
		      // check the users group sequence number and set group id
		      $query = 'select * from users_groups_seq';
		      $result = mysql_query($query);
		      if($result){
			$row = mysql_fetch_row($result);
			$group_id = $row[0]+1;
		      }
		      
		      if(!empty($user_id) && !empty($group_id)){
			$current_time = time();
			$user_query = "insert into users set id=$user_id, authorize=$auth_script, created=$current_time, updated=$current_time, active=1, approved=1, username='$username', display_name='$display_name', email='$email', deity=1";
			$group_query = "insert into users_groups set id=$group_id, active=1, name='$username', user_id=$user_id";
			$user_seq_update = "update users_seq set id=$user_id";
			$group_seq_update = "update users_groups_seq set id=$group_id";
			
			$user_result = mysql_query($user_query);
			$group_result = mysql_query($group_query);
			$user_seq_result = mysql_query($user_seq_update);
			$group_seq_result = mysql_query($group_seq_update);
		      }
		    }else{
		      echo "User exists on db $db"."\n";
		    }
		  }
		}
		/*
		if($handle){
		  fwrite($handle, $log);
		  fclose($handle);
		}
		*/
		mysql_close($db_con);
    }
}