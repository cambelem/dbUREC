<?php
namespace dbUREC\UI;

class MainUI implements UI
{
    public function display()
    {       
        $tpl = array();       
        javascriptMod('dbUREC', 'viewMain');
        
        return \PHPWS_Template::process($tpl, 'dbUREC', 'main.tpl');
    }
}
