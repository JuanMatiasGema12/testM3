import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
    .then(res => {
        console.log("Conexion a la BDD realizada con éxito.")
        app.listen(PORT , () => {
            console.log(`Server listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log("No se pudo realizar la conexión a la BDD.",error)
    })
