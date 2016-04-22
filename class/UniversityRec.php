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
            case 'menu':
                //$searchUser = new UI\SearchUserUI();
                //$this->content = $searchUser->display();
                $menu = new UI\MainUI();
        		$this->content = $menu->display();
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
            case 'showCheckIn':
                $showCheckIn = new UI\CheckInUI();
                $this->content = $showCheckIn->display();
                break;
            case 'showRentalService':
                $showRentalService = new UI\RentalServiceUI();
                $this->content = $showRentalService->display();
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
            case 'checkInRest':
                $ctrl = new Command\CheckInRest();
                $ctrl->execute();
                break;
            case 'rentalServiceRest':
                $ctrl = new Command\RentalServiceRest();
                $ctrl->execute();
                break;
            default:
                //$menu = new UI\MainUI();
                //$this->content = $menu->display();
                $searchUser = new UI\SearchUserUI();
		$this->content = $searchUser->display();
		break;
        }
    }
}

