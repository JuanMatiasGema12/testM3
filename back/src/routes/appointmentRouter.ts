
import { Request, Response, Router } from "express";
import {getAppointmentsController, getAppointmentByIdController, createAppointmentController, cancelAppointmentController} from "../controllers/appointmentController"
import {AppointmentRegisterDTO} from "../dto/AppointmentDTO"


const router: Router = Router()


router.get("/", (req:Request, res: Response) => getAppointmentsController(req,res))
router.get("/:id", (req:Request<{id:string}>, res: Response) => getAppointmentByIdController(req,res))
router.post("/schedule", (req:Request<unknown,  unknown,  AppointmentRegisterDTO >, res: Response) => createAppointmentController(req,res))
router.put("/cancel/:id", (req:Request<{id:string}>, res: Response) => cancelAppointmentController(req,res))


export default router