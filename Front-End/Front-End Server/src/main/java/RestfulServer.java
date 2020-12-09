
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
    }



    private void configureRestfulApiServer() {
        Spark.port(80);
        System.out.println("Server configured to listen on port 80");

        Spark.staticFileLocation("/public/build");
    }



    public static void main(String[] args){
        RestfulServer restfulServer = new RestfulServer(); //This should never return.
    }

}
