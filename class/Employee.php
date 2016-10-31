<?php

namespace dbUREC;

// Creates an employee object
class Employee {
	
	public first_name;
	public m_name;
	public last_name;
	public gender;
	public banner;
	public address;
	public salary;
	public email;
	public bDay;
	
	
	public function __construct(fName, mName, lName, gender, banner, address, salary, email, bDay)
	{
		$this->first_name = fName;
		$this->m_name = mName;
		$this->last_name = lName;
		$this->gender = gender;
		$this->banner = banner;
		$this->salary = salary;
		$this->address = address;
		$this->email = email;
		$this->bDay = bDay;
	}

}