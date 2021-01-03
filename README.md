<h1 align="center"><a href="http://kazhuu.com/" target="_blank"/>Inventory Managment</a></h1>
<p align="center">An inventory management website that supports the creation modification, and deletion of inventory as well as supporting multiple users. Application is built on top of Java Spark, React, and mySQL. Website and database are run separately in Docker Containers. The Docker Containers are run inside a Kubernets Cluster</p>

![demo](https://raw.githubusercontent.com/IliyanID/Inventory-Managment/master/Resources/font-page.PNG)

## 🖱️ REST API Documentation

* User Manipulation
   * Get Specefic User Credentials: ```GET www.kazhuu.com/username/[USERNAME]```
   * Get All Users Credentials: ```GET www.kazhuu.com/username```
   * Delete User Account: ```DELETE www.kazhuu.com/username/[USERNAME]```
   * Change User Password: ```PUT www.kazhuu.com/username/[USERNAME]```
      * Form Data:
      ```
         {
            password:[NEW PASSWORD]
         }
      ```
   * Create New User: ```POST www.kazhuu.com/username```
      * Form Data:
      ```
         {
            username:[NEW USER USERNAME]
            password:[NEW USER PASSWORD]
         }
      ```
      
* Inventory Manipulation
   * Get All Inventory: ```GET www.kazhuu.com/inventory/[USERNAME]```
   * Get Specefic Inventory: ```GET www.kazhuu.com/inventory/[USERNAME]/[INVENTORY ID]```
   * Delete Specefic Inventory: ```DELETE www.kazhuu.com/inventory/[USERNAME]/[INVENTORY ID]```
   * Update Specefic Inventory: ```PUT www.kazhuu.com/inventory/[USERNAME]```
      * Form Data:
      ```
         {
            id:[INVENTORY ID]
            description:[INVENTORY DESCRIPTION]
            url:[INVENTORY URL IMAGE]
         }
      ```
   * Add New Inventory: ```POST www.kazhuu.com/inventory/[USERNAME]```
      * Form Data:
      ```
         {
            id:[INVENTORY ID]
            description:[INVENTORY DESCRIPTION]
            url:[INVENTORY URL IMAGE]
         }
      ```
* Expected Response: ```success:[true/false]``` 
   * ```[true]: Operation Was Successful```
   * ```[false]: Form Data is Malformed or Internal Server Failure ```

## 🛠 Installation & Set Up

1. Install Docker

   ```sh
   sudo apt install docker
   ```

2. Create Website Docker Image

   ```sh
   docker build -t spring-boot-app:latest .
   ```

3. Create mySQL Docker Image

   ```sh
   docker run -e MYSQL_ROOT_PASSWORD=password --network myNetwork --name=database -d -p 127.0.0.1:3306:3306 mysql:latest
   ```

## 🚀 Building and Running for Production

1. Connect and Create Database Schema

   ```sh
   mysql -uroot -ppassword -h 127.0.0.1 -P3306
   ```

1. Connect to the Website

   ```sh
   http://localhost
   ```
