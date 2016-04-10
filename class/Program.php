<?php

namespace dbUREC;

class Program {
	
	public p_id;
	public name;
	public type;
	
	public function __construct(p_id, name, type)
	{
		$this->p_id = p_id;
		$this->name = name;
		$this->type = type;

	}

}