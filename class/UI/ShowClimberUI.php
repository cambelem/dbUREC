<?php
namespace dbUREC\UI;

class ShowClimberUI implements UI
{
    public function display()
    {       
        $tpl = array();       
        javascriptMod('dbUREC', 'showClimber', array('BANNER_ID'=>$_REQUEST['student']));
	        
        return \PHPWS_Template::process($tpl, 'dbUREC', 'showClimber.tpl');
    }
}
