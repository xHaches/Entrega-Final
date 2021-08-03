CREATE DATABASE EStore;

USE EStore;

CREATE TABLE Status_s(
	 id int NOT NULL IDENTITY (1,1),
	 description_ varchar (10) NOT NULL,
	 PRIMARY KEY (id)
	 );

CREATE TABLE Categorys (
	 id int NOT NULL IDENTITY (1,1),
	 description_ varchar (50) NOT NULL,
	 PRIMARY KEY (id)
	 );

CREATE TABLE Pay_Methods (
	 id int NOT NULL IDENTITY (1,1),
     description varchar (50) NOT NULL,
	 PRIMARY KEY (id)
	 );


CREATE TABLE User_s (
    id int NOT NULL IDENTITY (1,1),
    name varchar (30) NOT NULL,
    surnames varchar (50) NOT NULL,
    email varchar (50) NOT NULL,
	password varchar(60),
    phone_number varchar(20) NOT NULL,
    adress varchar (100) NOT NULL,
	id_status int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_status) REFERENCES Status_s(id)
    );


CREATE TABLE Products (
	 id int NOT NULL IDENTITY (1,1),
	 description_ varchar(100) NOT NULL,
	 price decimal NOT NULL,
	 img text NOT NULL,
	 stock int NOT NULL,
	 id_category int NOT NULL,
	 id_status int NOT NULL,
	 id_user int NOT NULL,
	 PRIMARY KEY (id),
	 FOREIGN KEY (id_category) REFERENCES Categorys(id),
	 FOREIGN KEY (id_user) REFERENCES User_s(id),
	 FOREIGN KEY (id_status) REFERENCES Status_s(id)
	 );


CREATE TABLE Purchases (
    id int NOT NULL IDENTITY (1,1),
    ammount int NOT NULL,
	date_ date NOT NULL,
	total_price decimal NOT NULL,
	id_user INT NOT NULL,
	id_pay_method INT NOT NULL,
	id_product INT NOT NULL
	PRIMARY KEY (id),
	FOREIGN KEY (id_user) REFERENCES User_s(id),
	FOREIGN KEY (id_pay_method) REFERENCES Pay_Methods(id),
	FOREIGN KEY (id_product) REFERENCES Products(id)
	);



	INSERT INTO Status_s VALUES ('INACTIVO');
	INSERT INTO Status_s VALUES ('ACTIVO');

	INSERT INTO Categorys VALUES ('Videojuegos');
	INSERT INTO Categorys VALUES ('Electronica');

	INSERT INTO Pay_Methods VALUES ('Paypal');
	INSERT INTO Pay_Methods VALUES ('Mercado Pago');