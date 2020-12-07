
import spark.Spark.*;
import spark.Spark;
import spark.Request;
import spark.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
        Spark.port(8080);
        System.out.println("Server configured to listen on port 8080");

        Spark.staticFileLocation("/static/React-App-Source-Code/build/index.html");


    }

    private void processRestfulApiRequests()
    {

        //API for Users
        post("/user", "application/json", this::authenticateUser);



        //Get all Inventory for User
        get("/inventory","application/json", this::getInventory);
        get("/inventory/:index",this::getInventory);

        //api for usernames
        get("/username",this::getUser);
        get("/username/:user",this::getUser);
        post("/username",this::addUser);
        delete("/username/:user",this::deleteUser);













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
        if(user != null && pass != null)
            if(user.equals("admin") && pass.equals("password"))
            verified = true;

        System.out.println(request.body());

        authenticated.put("authenticated",verified);
        authenticated.put("userToken",0);
        return authenticated;
    }




    private JSONArray getInventory(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success


        String index = request.params("index");


        JSONArray allInventory = new JSONArray();
        if(index == null)
        for(int i = 0; i< 20;i++)
            {
             JSONObject item = new JSONObject();
             item.put("description","Name of Board and Components");
             item.put("id",i);
             item.put("displayed",false);
              item.put("url","");
               allInventory.put(item);
            }
        else{
            JSONObject item = new JSONObject();
            item.put("description","Name of Board and Components");
            item.put("id",index);
            item.put("displayed",false);
            item.put("url","");
            allInventory.put(item);
        }
        return allInventory;
    }




    private JSONArray getUser(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String username = request.params(":user");

        JSONArray allEmails = new JSONArray();
        if(username == null)
        {
            for(int i = 0; i< 10;i ++)
            {
                JSONObject email = new JSONObject();
                email.put("Username", i);
                allEmails.put(email);
            }
        }
        else{
            JSONObject email = new JSONObject();
            email.put("Username",username);
            email.put("Password","password");
            allEmails.put(email);
        }
        return allEmails;
    }
    private JSONObject addUser(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String User = request.body();

        JSONObject success = new JSONObject();
        success.put("success",true);
        success.put("index",0);
        success.put("User",User);
        return success;
    }
    private JSONObject deleteUser(Request request,Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        String username = request.params("user");

        JSONObject success = new JSONObject();
        success.put("success",true);
        success.put("UserDeleted",username);

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
