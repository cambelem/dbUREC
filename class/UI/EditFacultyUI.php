<?php
namespace dbUREC\UI;

class EditFacultyUI implements UI
{
	public function display()
	{
		$tpl = array(); //assign empty array to template variable
		javascriptMod("dbUREC", "editFaculty"); //takes module name in url, goes into edit faculty folder in javascript directory to grab javascript

		return \PHPWS_Template::process($tpl, 'dbUREC', 'editFaculty.tpl');
	}
}

		