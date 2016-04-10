<?php

namespace dbUREC;

class UniversityRec {

    private $content;

    public function __construct()
    {

    }

    public function getContent()
    {
        return $this->content;
    }

    public function handleRequest()
    {
        // Fetch the action from the REQUEST.
        if (!isset($_REQUEST['action'])) {
            $req = "";
        } else {
            $req = $_REQUEST['action'];
        }

        // Show requested page.
        switch ($req) {
            
            case 'newUser':
                //$ctrl = new Command\AddUser();
                //$ctrl->execute();
                $addUser = new UI\AddUserUI();
                $this->content = $addUser->display();
                break;          
            case 'search':
                $searchUser = new UI\SearchUserUI();
                $this->content = $searchUser->display();
                break;
	    case 'showClimber':
		$showClimber = new UI\ShowClimberUI();
		$this->content = $showClimber->display();
		break;
            case 'showClimberRest':
            //var_dump("made it");
            //exit;
                $ctrl = new Command\ShowClimberRest();
                $ctrl->execute();
                break;
            /*
            case 'UpdatePermissions':
                $ctrl = new Command\UpdatePermissions();
                $ctrl->execute();
                break;
            */
            default:
                $menu = new UI\MainUI();
                $this->content = $menu->display();
                break;
        }
    }
}

