<?php
namespace dbUREC\UI;

class MainUI implements UI
{
    public function display()
    {       
        $tpl = array();       
        javascriptMod('dbUREC', 'viewMain', array('BANNER_ID' => $_REQUEST['student']));
        
        return \PHPWS_Template::process($tpl, 'dbUREC', 'main.tpl');
    }
}
