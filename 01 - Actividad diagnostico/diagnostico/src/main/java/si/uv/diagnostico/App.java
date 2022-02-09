package si.uv.diagnostico;

import static spark.Spark.*;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.ModelAndView;
import spark.template.velocity.VelocityTemplateEngine;
import com.google.gson.Gson;

public class App 
{
    public static void main( String[] args )
    {
        port(getHerokuAssignedPort());
        staticFiles.location("/");
        init();
        get("/", (req, res) -> {
            Map<String, Object> model = new HashMap<>();
            
            
            return new ModelAndView(model, "/diagnostico.vm");
        }, new VelocityTemplateEngine());
        //Sumas consecutivas
        get("/sumasParciales", (req, res) -> {
            String numString = req.queryParams("num");
            int result=0;
            int num=Integer.valueOf(numString);
            for (int i = 0; i<=num; i++) {
                result=result+i;
            }
            return result;
        });
        //Lenguaje de la F
        get("/lenguajeF", (req, res) -> {
            String text = req.queryParams("txt");
            String traduccion="";
            for (int nu = 0; nu < text.length (); nu++) {
                char c = text.charAt(nu);
                switch (c) {
                    case 'a':
                        traduccion=traduccion+"afa";
                    break;
                    case 'e':
                        traduccion=traduccion+"efe";    
                    break;
                    case 'i':
                        traduccion=traduccion+"ifi";    
                    break;
                    case 'o':
                        traduccion=traduccion+"ofo";    
                    break;
                    case 'u':
                        traduccion=traduccion+"ufu";    
                    break;
                    default:
                        traduccion=traduccion+c;
                    break;
                }
            }
            return traduccion;
        });
    }
    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; // return default port if heroku-port isn't set (i.e. on localhost)
    }
}
