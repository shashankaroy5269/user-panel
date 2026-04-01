

export interface registrePayload {
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    password: string,
    confirm_password: string,
    status:boolean,
    message:string
}
 export interface registerResponse {
    status:boolean,
    message:string
}