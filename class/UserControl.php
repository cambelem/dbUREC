<?php

namespace usercontrol;

class UserControl {

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
            case 'AddUser':
                $ctrl = new Command\AddUser();
                $ctrl->execute();
                break;
            case 'DeleteUser':
                $ctrl = new Command\DeleteUser();
                $this->execute();
                break;
            case 'UpdatePermissions':
                $ctrl = new Command\UpdatePermissions();
                $ctrl->execute();
                break;
            default:
                $menu = new UI\MainUI();
                $this->content = $menu->display();
                break;
        }
    }
}

