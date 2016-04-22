<?php
namespace dbUREC\UI;

class RentalServiceUI implements UI
{
    public function display()
    {       
        $tpl = array();       
        javascriptMod('dbUREC', 'rentalService', array('BANNER_ID' => $_REQUEST['student']));
        
        return \PHPWS_Template::process($tpl, 'dbUREC', 'rentalService.tpl');
    }
}
