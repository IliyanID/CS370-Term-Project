# Circuit Inventory Mangement

<ins>Description</ins>

Circuit board production for small businesses is a nightmare. Lead times on parts can be
up to 6 months. This means that if any of the hundred chips, diodes, resistors, or capacitors that
go into a final product are accidentally not ordered in time, production can be halted for months.
Currently large businesses use their own specific software for inventory management not
available to the public, and software that is available is not specialized enough.
Many small businesses are running into the problem that they can’t access the database
containing their inventory while working from home. A containerized system would help with this.
It is also important that anyone be able to run a ‘build’ and remove parts from inventory. (An
example of this would be to build an order of 100 boards by automatically removing the total
number of each part that would be required from the inventory.)

<ins>Usage</ins>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To run the jar file type:
java -cp target/TD-Circuit-Boards-1.0-SNAPSHOT-jar-with-dependencies.jar RestfulServer

When running to access the RESTful Webserver type into Postman localhost:8080
To Send data type into the body section using the raw preferance
The response will be sent back via terminal with STDOUT as well as printed on the main page in HTML

<ins>Docker</ins>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To run the program as a Docker container in terminal type:
 
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;docker build -t marco/irock:1.0-SNAPSHOT .

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To run the Docker image type

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;docker run -p 8080:8080 marco/irock:1.0-SNAPSHOT