
import {loginUserDto, UserRegisterDto} from "../dto/UserDTO"
import {checkUserData, getCredentialService } from "./credentialService"
import { AppDataSource, UserModel } from "../config/data-source"
import { User } from "../entities/UserEntity"
import userRepository from "../repositories/UserRepository"

export const getUsersService = async (): Promise<User[]> => {

    const users = await UserModel.find({relations: ['appointments']});
    return users
}


export const getUserByIdService = async (id: number): Promise<User> => {
    const userFound = await UserModel.findOne({ where: {id}, relations: ['appointments']})

    if (!userFound) {
        throw new Error (`El usuario con el id: ${id} no fue encontrado.`)
    }else return userFound
};

export const registerUserService = async (userData:UserRegisterDto): Promise<{message: string, newUser: User | void}> => {
    

    const userFoundEmail = await userRepository.findOne({
        where: {
            email: userData.email,
        }
    })
    if (userFoundEmail) {
        throw new Error("Ya existe un usuario registrado con este email.")
    }
    
    const userFoundDni = await userRepository.findOne({
        where: {
            nDni: userData.nDni,
        }
    })
    if (userFoundDni) {
        throw new Error("Ya existe un usuario registrado con este DNI.")
    }



    const result = await AppDataSource.transaction(async (entityManager) => {
        const UserCredentials = await getCredentialService(entityManager, userData.username, userData.password);
    
        const newUser = entityManager.create(User,{
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credential: UserCredentials
        })
        await entityManager.save(newUser)
    })
    return{
        message: "Usuario creado con exito.",
        newUser: result
}


}

export const loginUserService = async (loginData: loginUserDto): Promise<User> => {
    const credential = await checkUserData(loginData.userName, loginData.password);
    
    const userFound = await UserModel.findOne({
        where: {
            credential: { credentialId: credential}
        },
        relations: ["appointments"]
    });

    if (!userFound) {
        throw new Error("El usuario o la contraseña son incorrectos.");
    }

    return userFound;
};





