<?php

namespace dbUREC;

class Equipment {
	
	public eq_id;
	public name;
	
	public function __construct(eq_id, name)
	{
		$this->eq_id = eq_id;
		$this->name = name;
	}

}