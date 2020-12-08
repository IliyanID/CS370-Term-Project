
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
        Spark.port(8000);
        System.out.println("Server configured to listen on port 8080");

        Spark.staticFileLocation("/static/React-App-Source-Code/build/index.html");



    }
    private void processRestfulApiRequests()
    {

        //API for Users
        post("/user", "application/json", this::authenticateUser);


        //Get all Inventory for User
        get("/inventory","application/json", this::getInventory);

        //api for usernames
        get("/username",this::getEmails);
        get("/username/:index",this::getEmails);
        post("/username",this::addEmail);
        delete("/username/:index",this::deleteEmail);













        //Spark.get("/",this::echoRequest);

    }
    private JSONObject authenticateUser(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success


        JSONObject authenticated = new JSONObject();

        String user = request.queryParams("username");
        String pass = request.queryParams("password");

        boolean verified = false;
        ResultSet users = queryDB("SELECT users.password FROM sys.users WHERE users.username=\"" + user + "\";");
        try {
            System.out.println("printing results: ");
            if (users.next()) {
                String storedpass = users.getString(1);
                if (pass.equals(storedpass))
                    verified = true;
            } else {
                System.err.println("User " + user + " does not exist");
            }
        } catch (Exception throwables) {
            throwables.printStackTrace();
        }
        if (user != null && pass != null)
            if (user.equals("admin") && pass.equals("password"))
                verified = true;
        //System.out.println(verified);

        System.out.println(request.body());

        authenticated.put("authenticated",verified);
        authenticated.put("userToken",0);
        return authenticated;
    }
    private ResultSet queryDB(String query) {
        String url = "jdbc:mysql://localhost:3306/sys";
        String dbuser = "root";
        String dbpass = "cs370DBPassword9>1!";
        ResultSet results = null;
        try {
            //Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection connection = DriverManager.getConnection(url, dbuser, dbpass);
            Statement queryStatement = connection.createStatement();
            results = queryStatement.executeQuery(query);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            System.out.println(":(");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }




        private JSONArray getInventory(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success


        String user = request.params("user");

        JSONArray allInventory = new JSONArray();
        for(int i = 0; i< 20;i++)
        {
            JSONObject item = new JSONObject();
            item.put("description","Name of Board and Components");
            item.put("id",i);
            item.put("displayed",false);
            item.put("url","");
            allInventory.put(item);
        }
        return allInventory;
    }




    private JSONArray getEmails(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        int index = Integer.valueOf(request.params(":index"));

        JSONArray allEmails = new JSONArray();
        if(index < 0)
        {
            for(int i = 0; i< 10;i ++)
            {
                JSONObject email = new JSONObject();
                email.put("Email", i);
                allEmails.put(email);
            }
        }
        else{
            JSONObject email = new JSONObject();
            email.put("EmailIndex",index);
            allEmails.put(email);
        }
        return allEmails;
    }
    private JSONObject addEmail(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String email = request.params("email");

        JSONObject success = new JSONObject();
        success.put("success",true);
        success.put("index",0);
        success.put("email",email);
        return success;
    }
    private JSONObject deleteEmail(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success


        JSONObject success = new JSONObject();
        success.put("success",true);
        success.put("index",request.params(":index"));
        success.put("emailDeleted","testEmail");

        return success;
    }




    private String echoRequest(Request request, Response response)
    {
        response.type("text/html");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        return "<h1>hello</h1>";

    }

    private String HttpRequestToJson(Request request)
    {
        /*return(
            "{\n"
            + "\"attributes\":\"" + request.attributes() + "\",\n"
            + "\"body\":\"" + request.body() +"\" \n"
            + "\"contentLength\":\"" + request.contentLength() + "\",\n"
            + "\"contentType\":\"" + request.contentType() + "\", \n"
            + "\"contextPath\":\"" + request.contextPath() + "\",\n"
            + "\"cookies\":\"" + request.cookies() + "\",\n"
            + "\"headers\":\"" + request.headers() + "\" ,\n"
            + "\"host\":\"" + request.host() + "\", \n"
            + "\"ip\":\"" + request.ip() + "\", \n"
            + "\"params\":\"" + request.params() +"\",\n"
            + "\"pathInfo\":\"" + request.pathInfo() + "\"\n"
            + "\"serverPort\":\"" + request.port() + "\", \n"
            + "\"protocol\":\"" + request.protocol() + "\", \n"
            + "\"queryParams\":\"" + request.queryParams() + "\",\n"
            + "\"requestMethod\":\"" + request.requestMethod() + "\",\n"
            + "\"scheme\":\"" + request.scheme() + "\", \n"
            + "\"servletPath\":\"" + request.servletPath() + "\",\n"
            + "\"session\":\"" + request.session() + "\",\n"
            + "\"uri\":\"" + request.uri() + "\",\n"
            + "\"url\":\"" + request.url() + "\",\n"
            + "\"userAgent\":\"" + request.userAgent() + "\",\n"
            + "}");*/

            log.info(request.body());
            return "body: " + request.body();
    }

    public static void main(String[] args)
    {
        RestfulServer restfulServer = new RestfulServer(); //This should never return.
    }

}
