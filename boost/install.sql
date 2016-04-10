BEGIN;

set foreign_key_checks=0;

create table dbUREC_student (
	bannerid int(9) NOT NULL,
	
    fname varchar(20) NOT NULL,
	mname varchar(20),
	lname varchar(20) NOT NULL,
	
	bday date NOT NULL,
	
	address char(35) NOT NULL,
	
	phoneNumber char(10) NOT NULL, 
	
	CONSTRAINT PRIMARY KEY (bannerid)
	
);


CREATE TABLE dbUREC_employee (
	bannerid int(9) NOT NULL,
	fid int(9) NOT NULL,
	eid int(9),
	
	fname varchar(20) NOT NULL,
	mname varchar(20),
	lname varchar(20) NOT NULL,
	
	isStudent int(1) NOT NULL,
	
	gender char(1) NOT NULL,
	
	address char(35) NOT NULL,
	
	email char(30) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (bannerid),
	CONSTRAINT FOREIGN KEY (fid) REFERENCES dbUREC_facility(id),
	CONSTRAINT FOREIGN KEY (eid) REFERENCES dbUREC_employee(bannerid)
);

CREATE TABLE dbUREC_employee_phoneNumbers (

	bannerid int(9) NOT NULL,
	phoneNumber char(10) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (phoneNumber, bannerid),
	CONSTRAINT FOREIGN KEY (bannerid) REFERENCES dbUREC_employee(bannerid)
);


CREATE TABLE dbUREC_equipment (
	
	id int NOT NULL,
	renterid int(9) NOT NULL,
	employeeid int(9) NOT NULL,
	
	name varchar(20) NOT NULL, 
	
	
	CONSTRAINT PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (renterid) REFERENCES dbUREC_student (bannerid),
	CONSTRAINT FOREIGN KEY (employeeid) REFERENCES dbUREC_employee(bannerid)
);


CREATE TABLE dbUREC_certification (

	name varchar(20) NOT NULL,
	c_type varchar(20) NOT NULL,
	id int NOT NULL,
	studentid int(9) NOT NULL,
	employeeid int(9) NOT NULL,
	
	CONSTRAINT PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (studentid) REFERENCES dbUREC_student(bannerid),
	CONSTRAINT FOREIGN KEY (employeeid) REFERENCES dbUREC_employee(bannerid)

);



create table dbUREC_facility (
	
	name varchar(20) NOT NULL,
	f_type varchar(20) NOT NULL,
	id int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (id)
	
);

CREATE TABLE dbUREC_program (

	name varchar(20) NOT NULL,
	p_type varchar(20) NOT NULL,
	id int NOT NULL,
	teacherid int(9) NOT NULL,
	f_id int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (id),
	CONSTRAINT FOREIGN KEY (teacherid) REFERENCES dbUREC_employee(bannerid),
	CONSTRAINT FOREIGN KEY (f_id) REFERENCES dbUREC_facility(id)

);

CREATE TABLE dbUREC_studProg (

	sid int(9) NOT NULL,
	pid int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (sid, pid),
	CONSTRAINT FOREIGN KEY (sid) REFERENCES dbUREC_student(bannerid),
	CONSTRAINT FOREIGN KEY (pid) REFERENCES dbUREC_program(id)

);

CREATE TABLE dbUREC_empProg (

	eid int(9) NOT NULL,
	pid int NOT NULL,
	
	CONSTRAINT PRIMARY KEY (eid, pid),
	CONSTRAINT FOREIGN KEY (eid) REFERENCES dbUREC_employee(bannerid),
	CONSTRAINT FOREIGN KEY (pid) REFERENCES dbUREC_program(id)

);

set foreign_key_checks=1;

COMMIT;
