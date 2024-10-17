import { EntityManager } from "typeorm";
import { CredentialModel } from "../config/data-source";
import { Credential } from "../entities/CredentialEntity";
import { comparePassword, hashPassword } from "../utils/passwordHash";




export const getCredentialService = async (entityManager: EntityManager ,username: string, password: string): Promise<Credential> => {
    const existingCredential = await CredentialModel.findOne({ where: { username } });

    if (!existingCredential) {

        const hashedPassword = await hashPassword(password);
        const newCredential: Credential = CredentialModel.create({
            username,
            password: hashedPassword,
        });

        await entityManager.save(newCredential);
        return newCredential;

    } else {
        throw new Error('Ya existe un usuario registrado con este nombre de usuario.');
    }
};

export const checkUserData = async (username: string, password: string): Promise<number> => {
    const usernameFound = await CredentialModel.findOne({ where: { username} });
    
    if (!usernameFound) {
        throw new Error('El usuario o la contraseña son incorrectos.');
    }


    const passwordCompared = await comparePassword(password, usernameFound.password)

    if (!passwordCompared) {
        throw new Error('El usuario o la contraseña son incorrectos.');
    }

    return usernameFound.credentialId;
};
