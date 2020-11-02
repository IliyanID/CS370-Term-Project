import spark.Spark;
import spark.Request;
import spark.Response;

public class RestfulServer
{
    public RestfulServer()
    {

    }

    private void configureRestfulApiServer()
    {
        spark.port(8080);
        System.out.println("Server configured to listen on port 8080");
    }

    private void processRestfulApiRequests()
    {
        Spark.get(path:"/", this::echoRequest);

    }

    private String echoRequest(Request request, Response response)
    {
        response.type(contentType:"application/json");
        response.header(header:"Acess-Control-Allow-Origin", value:"*");
        response.status(statusCode: 200);

        return "";

    }

    private String HttpRequestToJson(Request request)
    {

    }


}
