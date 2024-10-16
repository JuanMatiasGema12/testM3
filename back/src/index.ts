import app from "./server";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";

AppDataSource.initialize()
    .then(res => {
        console.log("Conexion a la BDD realizada con éxito.")
        app.listen(() => {
            console.log(`Server listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log("No se pudo realizar la conexión a la BDD.",error)
    })
