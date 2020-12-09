
import spark.Spark.*;
import spark.Spark;
import spark.Request;
import spark.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

import static spark.Spark.*;


import org.json.*;




public class RestfulServer
{
    final static boolean debug = false;
    private final Logger log = LoggerFactory.getLogger(RestfulServer.class);

    public RestfulServer()
    {
        this.configureRestfulApiServer();
        this.processRestfulApiRequests();
    }



    private void configureRestfulApiServer() {
        Spark.port(80);
        System.out.println("Server configured to listen on port 80");

        Spark.staticFileLocation("/public/build");


    }

    private void processRestfulApiRequests()
    {

        //Validate User
        post("/user", this::authenticateUser);

        //Get all Inventory for User
        get("/inventory", this::getInventory);
        get("/inventory/:user",this::getInventory);
        get("/inventory/:user/:index",this::getInventory);
        post("/inventory/:user",this::addInventory);
        put("/inventory/:user",this::updateInventory);
        delete("/inventory/:user/:id",this::deleteInventory);

        //api for usernames
        get("/username",this::getUser);
        get("/username/:user",this::getUser);
        post("/username",this::addUser);
        put("/username",this::updateUser);
        delete("/username/:user",this::deleteUser);
    }
    private JSONObject authenticateUser(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success



        String user = null;
        String pass = null;
        if(!request.body().equals("")) {
            JSONObject userCred = new JSONObject(request.body());
            user = userCred.getString("username");
            pass = userCred.getString("password");
        }
        System.out.println(request.body());
        System.out.println("Username: " + user);
        System.out.println("Password: " + pass);


        JSONObject authenticated = new JSONObject();
        boolean verified = false;

        try {
            ResultSet users = queryDB("SELECT credentials.Password FROM database.credentials WHERE credentials.Username=\"" + user + "\";");
            System.out.println("printing results: ");
            if (users.next()) {
                String storedpass = users.getString("Password");
                if (pass.equals(storedpass))
                    verified = true;
            } else {
                System.err.println("User " + user + " does not exist");
            }
        } catch (Exception throwables) {
            throwables.printStackTrace();
        }





        authenticated.put("authenticated",verified);
        authenticated.put("userToken",user);
        return authenticated;
    }



    private JSONArray getInventory(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String user = request.params("user");
        String index = request.params("index");
        //System.out.println(user);


        JSONArray allInventory = new JSONArray();
        ResultSet inventory = null;
        try{
        if(index == null) {
            inventory = queryDB("SELECT inventory.description, inventory.id, inventory.url FROM database.inventory WHERE inventory.username='"+ user +"';");
            //System.out.println("Got here");
        }
        else {
            inventory = queryDB("SELECT inventory.description, inventory.id, inventory.url FROM database.inventory WHERE inventory.username='" + user + "' AND inventory.id='" + index + "';");
        }

            while (inventory.next()) {
                JSONObject item = new JSONObject();
                item.put("description", inventory.getString("description"));
                item.put("id",inventory.getString("id"));
                item.put("displayed",false);
                item.put("url",inventory.getString("url"));
                allInventory.put(item);
            }


        }catch(Exception e){e.printStackTrace();}
        return allInventory;
    }
    private JSONObject addInventory(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        System.out.println(request.body());

        String id=null,description=null,url=null,username=null;
        Boolean displayed=false;
        if(!request.body().equals("")) {
            JSONObject userCred = new JSONObject(request.body());
            id = userCred.getString("id");
            description = userCred.getString("description");
            url = userCred.getString("url");
            username = request.params("user");
        }

        JSONObject success = new JSONObject();
        try{
            ResultSet users =  queryDB("INSERT INTO `database`.`inventory` (`id`, `description`, `displayed`, `url`, `username`) VALUES ('" + id + "', '" + description + "', 'false', '" + url + "', '" + username + "');");
            success.put("success", true);
            success.put("id", id);
            success.put("description", description);
            success.put("url", url);
            success.put("Username", username);
        }
        catch(Exception e){
           // e.printStackTrace();
            success.put("success", false);
        }

        return success;
    }
    private JSONObject updateInventory(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String id=null,description=null,url=null,username=null;
        Boolean displayed=false;
        if(!request.body().equals("")) {
            JSONObject userCred = new JSONObject(request.body());
            id = userCred.getString("id");
            description = userCred.getString("description");
            url = userCred.getString("url");
            username = userCred.getString("username");
        }


        JSONObject success = new JSONObject();
        try {
            //Checks to See if it's in database, if not it will error out
            queryDB( "SELECT inventory.id FROM database.inventory WHERE inventory.id=\"" + id + "\"");

            //Updates selected users password
            queryDB("UPDATE `database`.`inventory` SET `description` = '" + description + "', `url` = '" + url + "' WHERE (`id` = '" + id + "');");

            success.put("success", true);
            success.put("id", id);
            success.put("description", description);
            success.put("url", url);
            success.put("Username", username);
        }
        catch(Exception e){
            success.put("success",false);
        }
        return success;
    }
    private JSONObject deleteInventory(Request request, Response response){
       // response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        //DELETE FROM database.credentials WHERE ("Usernames" = "test");
        String username = request.params("user");
        String id = request.params("id");


        JSONObject success = new JSONObject();
        try{
            queryDB( "SELECT inventory.id FROM database.inventory WHERE inventory.username=\"" + username + "\"");

            queryDB("DELETE FROM `database`.`inventory` WHERE (`id` = '" + id + "');");
            success.put("success",true);
            success.put("idDeleted",id);
        }
        catch(Exception e){
            e.printStackTrace();
            success.put("success",false);
        }



        return success;
    }


    private JSONArray getUser(Request request,Response response){





        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String username = request.params(":user");




        JSONArray allUsers = new JSONArray();
        if(username == null)
        {


            try {
                ResultSet users =  queryDB( "SELECT credentials.Username,credentials.Password FROM database.credentials");
                while(users.next()){
                    JSONObject user = new JSONObject();
                    user.put("Username", users.getString("Username"));
                    user.put("Password", users.getString("Password"));
                    allUsers.put(user);
                }
            }
            catch (Exception throwables) {
                //throwables.printStackTrace();
            }
        }
        else{

            try {
                ResultSet users =  queryDB( "SELECT credentials.Username,credentials.Password FROM database.credentials WHERE credentials.Usernames=\"" + username + "\"");
                if(users != null)
                while(users.next()){
                    JSONObject user = new JSONObject();
                    user.put("Username" , users.getString("Username"));
                    user.put("Password" , users.getString("Password"));
                    allUsers.put(user);
                }
            }
            catch (Exception throwables) {
                throwables.printStackTrace();
            }
        }
        return allUsers;
    }
    private JSONObject addUser(Request request,Response response){

        //INSERT INTO database.credentials (Usernames, Password) VALUES ("test2", "test2s");


        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String user = null;
        String pass = null;
        if(!request.body().equals("")) {
            JSONObject userCred = new JSONObject(request.body());
            user = userCred.getString("username");
            pass = userCred.getString("password");
        }

        JSONObject success = new JSONObject();
        try{
            ResultSet users =  queryDB("INSERT INTO database.credentials (Username, Password) VALUES (\"" + user + "\", \"" + pass +"\")");
            success.put("success", true);
            success.put("Username", user);
            success.put("Password", pass);
        }
        catch(Exception e){
            success.put("success", false);
        }

        return success;
    }
    private JSONObject updateUser(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String user = null;
        String pass = null;
        if(!request.body().equals("")) {
            JSONObject userCred = new JSONObject(request.body());
            user = userCred.getString("username");
            pass = userCred.getString("password");
        }


        JSONObject userUpdated = new JSONObject();
        try {
            //Checks to See if it's in database, if not it will error out
            queryDB( "SELECT credentials.Username,credentials.Password FROM database.credentials WHERE credentials.Usernames=\"" + user + "\"");

            //Updates selected users password
            queryDB("UPDATE `database`.`credentials` SET `Password` = '" + pass +"' WHERE (`Usernames` = '" + user +"');");


            userUpdated.put("success", true);
            userUpdated.put("ModifiedUser", user);
            userUpdated.put("ModifiedPass", pass);
        }
        catch(Exception e){
            userUpdated.put("success",false);
        }
        return userUpdated;
    }
    private JSONObject deleteUser(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        //DELETE FROM database.credentials WHERE ("Usernames" = "test");

        String username = request.params("user");
        JSONObject success = new JSONObject();
        try{
            queryDB( "SELECT credentials.Username,credentials.Password FROM database.credentials WHERE credentials.Usernames=\"" + username + "\"");

            queryDB("DELETE FROM `database`.`credentials` WHERE (`Usernames` = '" + username +"');");
            success.put("success",true);
            success.put("UserDeleted",username);
        }
        catch(Exception e){
            success.put("success",false);
        }



        return success;
    }




    private ResultSet queryDB(String query)throws Exception{
        String url = "jdbc:mysql://localhost:3306/database";
        String dbuser = "root";
        String dbpass = "password";
        ResultSet results = null;

            //Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection connection = DriverManager.getConnection(url, dbuser, dbpass);
            Statement queryStatement = connection.createStatement();
            results = queryStatement.executeQuery(query);

        return results;
    }




    public static void main(String[] args){
        RestfulServer restfulServer = new RestfulServer(); //This should never return.
    }

}
