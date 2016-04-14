<?php
namespace dbUREC\UI;

class EditFacilityUI implements UI
{
	public function display()
	{
		$tpl = array(); //assign empty array to template variable
		javascriptMod("dbUREC", "editFacility"); //takes module name in url, goes into edit faculty folder in javascript directory to grab javascript

		return \PHPWS_Template::process($tpl, 'dbUREC', 'editFacility.tpl');
	}
}

		