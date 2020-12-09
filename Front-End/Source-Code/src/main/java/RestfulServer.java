import spark.Spark.*;
import spark.Spark;
import spark.Request;
import spark.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.xpath.XPath;



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
        System.out.println("Server configured to listen on port 8080");
        if(debug)
        {
            Spark.staticFileLocation("/static/React-App-Source-Code/public");
        }
        else{
            Spark.staticFileLocation("/static/build");
        }
        Spark.get("/user", "application/json", (request, response)-> {
            String user = request.queryParams("userName");
            String pass = request.queryParams("passWord");

            boolean verified = false;
            if(user.equals("admin") && pass.equals("password"))
            {
                verified = true;
            }

            System.out.println(verified);
            return verified;
        });
    }

    private void processRestfulApiRequests()
    {
        Spark.get("/",this::echoRequest);

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
