BEGIN;

set foreign_key_checks=0;

create table dbUREC_student (

	bannerid int(9) NOT NULL,	
	cid int,
    fname varchar(20) NOT NULL,
	mname varchar(20),
	lname varchar(20) NOT NULL,
	bday date NOT NULL,
	address char(35) NOT NULL,
	phoneNumber char(10) NOT NULL, 
	email char(30) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (bannerid),
	CONSTRAINT FOREIGN KEY (cid) REFERENCES dbUREC_certification(id)
);


CREATE TABLE dbUREC_employee (

	bannerid int(9) NOT NULL,
	fid int(9) NOT NULL,
	superssn int(9),
	cid int,
	fname varchar(20) NOT NULL,
	mname varchar(20),
	lname varchar(20) NOT NULL,
	isStudent int(1) NOT NULL,
	gender char(1) NOT NULL,
	address char(35) NOT NULL,
	email char(30) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (bannerid),
	CONSTRAINT FOREIGN KEY (fid) REFERENCES dbUREC_facility(id),
	CONSTRAINT FOREIGN KEY (superssn) REFERENCES dbUREC_employee(bannerid),
	CONSTRAINT FOREIGN KEY (cid) REFERENCES dbUREC_certification(id)
);

CREATE TABLE dbUREC_employee_phoneNumbers (

	bannerid int(9) NOT NULL,
	phoneNumber char(10) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (phoneNumber, bannerid),
	CONSTRAINT FOREIGN KEY (bannerid) REFERENCES dbUREC_employee(bannerid)
);


CREATE TABLE dbUREC_equipment (
	
	id int NOT NULL,
	renterid int(9),
	employeeid int(9),
	
	name varchar(20) NOT NULL, 
	
	
	CONSTRAINT PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (renterid) REFERENCES dbUREC_student (bannerid),
	CONSTRAINT FOREIGN KEY (employeeid) REFERENCES dbUREC_employee(bannerid)
);


CREATE TABLE dbUREC_certification (

	id int NOT NULL,
	name varchar(20) NOT NULL,
	c_type varchar(20) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (id)
);



create table dbUREC_facility (
	
	name varchar(20) NOT NULL,
	f_type varchar(20) NOT NULL,
	id int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (id)
);

CREATE TABLE dbUREC_program (

	id int NOT NULL,
	name varchar(20) NOT NULL,
	p_type varchar(20) NOT NULL,
	start_date date NOT NULL,
	teacherid int(9) NOT NULL,
	f_id int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (teacherid) REFERENCES dbUREC_employee(bannerid),
	CONSTRAINT FOREIGN KEY (f_id) REFERENCES dbUREC_facility(id)

);

CREATE TABLE dbUREC_time (

	id int NOT NULL,
	time_in date NOT NULL,
	time_out date NOT NULL,
	studentid int,
	employeeid int,
	
	CONSTRAINT PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (studentid) REFERENCES dbUREC_employee(bannerid),
	CONSTRAINT FOREIGN KEY (employeeid) REFERENCES dbUREC_student(bannerid)
);

CREATE TABLE dbUREC_studProg (

	studentid int(9) NOT NULL,
	programid int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (studentid, programid),
	CONSTRAINT FOREIGN KEY (studentid) REFERENCES dbUREC_student(bannerid),
	CONSTRAINT FOREIGN KEY (programid) REFERENCES dbUREC_program(id)

);

CREATE TABLE dbUREC_empProg (

	employeeid int(9) NOT NULL,
	programid int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (employeeid, programid),
	CONSTRAINT FOREIGN KEY (employeeid) REFERENCES dbUREC_employee(bannerid),
	CONSTRAINT FOREIGN KEY (programid) REFERENCES dbUREC_program(id)

);

set foreign_key_checks=1;

COMMIT;
