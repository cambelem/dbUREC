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
			case 'edit_faculty':
                $edit_faculty = new UI\EditFacultyUI();
                $this->content = $edit_faculty->display();
                break;
            case 'showEditProgram':
        		$showEditProgram = new UI\EditProgramsUI();
        		$this->content = $showEditProgram->display();
        		break;
            case 'showEditCert':
                $showEditCert = new UI\EditCertificationsUI();
                $this->content = $showEditCert->display();
                break;
			case 'showEditFacility':
                $showEditFacility = new UI\EditFacilityUI();
                $this->content = $showEditFacility->display();
                break;
			case 'showEditEquipment':
                $showEditEquipment = new UI\EditEquipmentUI();
                $this->content = $showEditEquipment->display();
                break;
            case 'showClimberRest':
                $ctrl = new Command\ShowClimberRest();
                $ctrl->execute();
                break;
            case 'addUserRest':
                $ctrl = new Command\AddUserRest();
                $ctrl->execute();
                break;
            case 'editFacilityRest':
                $ctrl = new Command\EditFacilityRest();
                $ctrl->execute();
                break;
			case 'editEquipmentRest':
                $ctrl = new Command\EditEquipmentRest();
                $ctrl->execute();
                break;
            default:
                $menu = new UI\MainUI();
                $this->content = $menu->display();
                break;
        }
    }
}

