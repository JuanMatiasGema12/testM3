
import {loginUserDto, UserRegisterDto} from "../dto/UserDTO"
import {checkUserData, getCredentialService } from "./credentialService"
import { AppDataSource, UserModel } from "../config/data-source"
import { User } from "../entities/UserEntity"
import { Credential } from "../entities/CredentialEntity"

export const getUsersService = async (): Promise<User[]> => {

    const users = await UserModel.find({relations: ['appointments']});
    return users
}


export const getUserByIdService = async (id: number): Promise<User> => {
    const userFound = await UserModel.findOne({ where: {id}})

    if (!userFound) {
        throw new Error (`El usuario con el id: ${id} no fue encontrado.`)
    }else return userFound
};

export const registerUserService = async (userData:UserRegisterDto): Promise<void> => {

    AppDataSource.transaction(async (entityManager) => {

        const UserCredentials: Credential = await getCredentialService(entityManager, userData.username, userData.password);
        console.log(UserCredentials)
    
        const newUser: User = UserModel.create({
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credential: UserCredentials
        })
        await entityManager.save(newUser)
        console.log(newUser)
    })
}

export const loginUserService = async (loginData: loginUserDto): Promise<User> => {
    console.log("ESTE ES EL LOGINDATA.USERNAME: ", loginData.userName)
    const credential = await checkUserData(loginData.userName, loginData.password);
    
    const userFound = await UserModel.findOne({
        where: {
            credential: { credentialId: credential}
        },
        relations: ['credential']
    });

    if (!userFound) {
        throw new Error("El usuario o la contraseña son incorrectos.");
    }

    console.log(userFound)
    return userFound;
};





