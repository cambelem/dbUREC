<?php

namespace dbUREC;

// This creates a checkin object
class CheckIn {
	
	public $id;
	public $time_in;
	public $time_out;
	public $studentid;
	public $employeeid;
	
	public function __construct($id, $time_in, $time_out, $studentid = null, $employeeid = null)
	{
		$this->id = $id;
		$this->time_in = $time_in;
		$this->time_out = $time_out;
		$this->studentid = $studentid;
		$this->employeeid = $employeeid;
	}

}