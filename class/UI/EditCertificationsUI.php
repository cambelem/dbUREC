<?php
namespace dbUREC\UI;

class EditCertificationsUI implements UI
{
    public function display(){
        $tpl = array();
        javascriptMod("dbUREC", "editCertifications");

        return \PHPWS_Template::process($tpl, "dbUREC", 'editCertifications.tpl');
    }
}
