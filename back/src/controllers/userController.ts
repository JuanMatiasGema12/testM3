import { Request, Response } from "express";
import { getUsersService, getUserByIdService, registerUserService, loginUserService } from "../services/usersService";
import { loginUserDto,  UserRegisterDto } from "../dto/UserDTO";
import { ErrorRespone } from "../interfaces/errorResponse";
import { User } from "../entities/UserEntity";



export const handleError: ( error: unknown, res: Response, defaultMessage: string) => void  = (error: unknown, res: Response, defaultMessage: string) =>{
    const errorMessage: ErrorRespone = {
        message: defaultMessage,
        details: error instanceof Error ? error.message : "Error desconocido"
    }
    res.status(400).json(errorMessage)
}

//Consultar sobre este detalle => (_req).
export const getUsersController = async (req: Request, res: Response): Promise<void>=> {
    try {
        const users: User[] = await getUsersService()
        res.status(200).json({
             message: "Éste es el listado con todos los usuarios: ",
             data: users
        })
    } catch (error) {
        handleError(error, res, "No se pudo obtener el listado de usuarios.")
    }
}

export const getUserByIdController = async (req: Request<{id:string}>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10)
    try {
        const response = await getUserByIdService(id)
        res.status(200).json({
            message: `Obtener el usuario con el ID: ${id}`,
            data: response
        })
    } catch (error) {
        handleError(error, res, "No se pudo obtener el usuario con el ID ingresado.")
    }
}

export const registerUserController = async (req: Request< unknown, unknown, UserRegisterDto>, res: Response): Promise<void>=> {
    try {
        await registerUserService(req.body)
        res.status(200).json({
             message: "Usuario registrado con éxito.",
        })
    } catch (error) {
        handleError(error, res, "No se pudo realizar el registro del usuario. Intentelo nuevamente")
    }
}

export const loginUserController = async (req: Request< unknown, unknown, loginUserDto>, res: Response): Promise<void>=> {
    try {
        const loginUser: User = await loginUserService(req.body)
        res.status(200).json({
             message: "El usuario se logueó con exito.",
             data: {loginUser}
        })
    } catch (error) {
        handleError(error, res, "No se pudo realizar el login del usuario. Intentelo nuevamente")
    }
}