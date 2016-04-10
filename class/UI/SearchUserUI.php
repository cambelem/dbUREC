<?php
namespace dbUREC\UI;

class SearchUserUI implements UI
{
    public function display()
    {       
        $tpl = array();       
        javascriptMod('dbUREC', 'searchUser');
        
        return \PHPWS_Template::process($tpl, 'dbUREC', 'searchUser.tpl');
    }
}
