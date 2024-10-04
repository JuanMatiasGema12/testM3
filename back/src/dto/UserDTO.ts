

export interface UserRegisterDto {
    name:string,
    email: string
    birthdate: Date,
    nDni: number
    username: string,
    password:string
}

export interface loginUserDto{
    userName: string,
    password: string
}

export interface UserDTO{
    id: number,
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    username: string,
    password:string
}
