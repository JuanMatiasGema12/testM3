export interface Appointment{
    id:number,
    date:Date,
    time:Date,
    userId: number,
    status:Status
}

export enum Status{
    active = "active",
    cancelled = "cancelled"
}