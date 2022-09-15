export interface AuthData{
  email:string;
  password:string;

}
export interface AuthResponse{
  token:string;
  expiration:Date;
}
