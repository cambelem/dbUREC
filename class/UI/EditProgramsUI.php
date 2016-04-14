<?php

    namespace dbUREC\UI;

    class EditProgramsUI implements UI {

        public function display() {

            $tpl = array();
            javascriptMod("dbUREC", "EditPrograms");
            return \PHPWS_Template::process($tpl, "dbUREC", 'editPrograms.tpl');
            
        }
    }
