<?php
namespace dbUREC\UI;

class CheckInUI implements UI
{
	public function display()
	{
		$tpl = array(); //assign empty array to template variable
		javascriptMod("dbUREC", "checkIn", array('BANNER_ID'=>$_REQUEST['student'])); //takes module name in url, goes into edit faculty folder in javascript directory to grab javascript

		return \PHPWS_Template::process($tpl, 'dbUREC', 'checkIn.tpl');
	}
}

		