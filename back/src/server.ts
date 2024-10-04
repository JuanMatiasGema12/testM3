import  express, {Application}  from "express";
import router  from "./routes/index";
import morgan from "morgan";
import cors from "cors";


const app: Application = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


app.use(router)




export default app