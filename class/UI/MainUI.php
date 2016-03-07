<?php
namespace usercontrol\UI;

class MainUI implements UI
{
    public static function display()
    {       
        $tpl = array();       
        javascriptMod('usercontrol', 'viewMain');
        
        return \PHPWS_Template::process($tpl, 'usercontrol', 'main.tpl');
    }
}