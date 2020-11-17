import spark from 'spark';

class RestfulServer
{
    //Logger log = LoggerFactory.getLogger(RestfulServer.class);

     RestfulServer()
    {
        this.configureRestfulApiServer();
        this.processRestfulApiRequests();
    }

    const configureRestfulApiServer = () =>
    {
        Spark.port(8080);
        System.out.println("Server configured to listen on port 8080");
        Spark.get("/hello", (request, response) -> "Hello World!");
    }

    private void processRestfulApiRequests()
    {
        Spark.get("/",this::echoRequest);

    }

    private String echoRequest(Request request, Response response)
    {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin","*");
        response.status(200); //Success

        return HttpRequestToJson(request);

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