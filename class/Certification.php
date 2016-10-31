<?php

namespace dbUREC;

// Creates a certification onject..
class Certification {
	
	public c_id;
	public name;
	public type;
	
	public function __construct(c_id, name, type)
	{
		$this->c_id = c_id;
		$this->name = name;
		$this->type = type;

	}

}