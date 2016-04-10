<?php
namespace dbUREC\UI;

class AddUserUI implements UI
{
    public function display()
    {       
        $tpl = array();       
        javascriptMod('dbUREC', 'addUser');
        
        return \PHPWS_Template::process($tpl, 'dbUREC', 'addUser.tpl');
    }
}
