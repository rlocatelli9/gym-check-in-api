import { env } from "env";
import { app } from "src/app";

app.listen({
  host: '0.0.0.0',
  port: env.PORT
}).then(() =>{
    console.log("server started on port: 3333")
})