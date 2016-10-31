<?php

namespace dbUREC;

// Creates an employee object
class Equipment {
	
	public eq_id;
	public name;
	
	public function __construct(eq_id, name)
	{
		$this->eq_id = eq_id;
		$this->name = name;
	}

}