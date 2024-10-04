
import { Request, Response, Router } from "express";
import {getUserByIdController, getUsersController, registerUserController, loginUserController} from "../controllers/userController"
import { loginUserDto, UserRegisterDto } from "../dto/UserDTO";


const router: Router = Router()


router.get("/", (req:Request, res: Response) => getUsersController(req,res))
router.get("/:id", (req:Request<{id:string}>, res: Response) => getUserByIdController(req,res))
router.post("/register", (req:Request<unknown,  unknown,  UserRegisterDto >, res: Response) => registerUserController(req,res))
router.post("/login", (req:Request<unknown,  unknown,  loginUserDto >, res: Response) => loginUserController(req,res))


export default router