import 'dotenv/config';
export const PORT:number = process.env.PORT?Number.parseInt(process.env.PORT):3001;
export const PASSWORD_DB:string|undefined = process.env.PASSWORD_DB? process.env.PASSWORD_DB : "admin";
export const DB_HOST :string|undefined = process.env.DB_HOST ? process.env.DB_HOST :"localhost";
export const DB_PORT :number|undefined= process.env.DB_PORT ?  Number(process.env.DB_PORT) :5432;
export const DB_USERNAME :string|undefined = process.env.DB_USERNAME ? process.env.DB_USERNAME :"postgres";
export const DB_NAME :string|undefined = process.env.DB_NAME ? process.env.DB_NAME :"turnos";
export const DB_SYNC :boolean|undefined = process.env.DB_SYNC ? process.env.DB_SYNC.toLowerCase() === 'true' : true;
export const DB_LOGIN  :boolean|undefined = process.env.DB_LOGIN  ? process.env.DB_LOGIN.toLowerCase() === 'true'  :true;