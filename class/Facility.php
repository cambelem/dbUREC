<?php<?php

namespace dbUREC;

class Facility {
	
	public f_id;
	public name;
	public type;
	
	public function __construct(f_id, name, type)
	{
		$this->f_id = f_id;
		$this->name = name;
		$this->type = type;

	}

}