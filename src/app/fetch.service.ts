import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://trabajo-final01.herokuapp.com/api/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
)};

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  authToken:string =
  "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MzE2ODQ1MDUsImlzcyI6InJvb3QiLCJzdWIiOiJ0ZXN0IiwiZXhwIjoxNjMyNTQ4NTA1fQ.Ur7DbIZzlmQwjU3XoQ-v2u03q6_o13kA1NXHAxzbvSLEdvY-yG4zS3Pwy9ACz_TItELqrzbNqa_-ogcmGAMhNg;

  constructor(private http: HttpClient) {}

  // Almacena el bearer token, indica que estamos logueados
  loguear(user:string, password:string): Observable<any>{
    return this.http.post(API_URL + "login", {
      user,
      password
    }, httpOptions);
  }

  desloguear(): void{
    window.sessionStorage.clear();
  }

  public guardarToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public obtenerToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public guardarUsuarioToken(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public obtenerUsuarioToken(): any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};

  }

  // 
  registrar(user:string, email: string, password:string): Observable<any>{
    return this.http.post(API_URL + "login", {
      user,
      email,
      password
    }, httpOptions);
  }
  
  enviarDatos(tipo:string, object:any){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken + ''
    })
    
    if (tipo == 'login'){
      return this.http.post(API_URL + "login/", object);
    }

    if (tipo == 'grupos'){
      return this.http.post(API_URL + "grupos/", object);
    }

    if (tipo == 'amigos'){
      return this.http.post(API_URL + "juegos/", object);
    }

    else {
      console.log("Error en los datos del post");
      return 0;

    }

  }

  obtenerDatos(tipo:string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authToken + ''
    })

    if (tipo == "root") {
      return this.http.get(API_URL);
    }

    if (tipo == "gruposxnombre") {
      return this.http.get(API_URL + "grupos/nombre/", {headers: headers});
    }

    if (tipo == "grupos") {
      return this.http.get(API_URL + "grupos/", {headers: headers});
    }

    if (tipo == "mensajes") {
      return this.http.get(API_URL + "mensajes/");
    }

    if (tipo == "amigos") {
      return this.http.get(API_URL + "amigos/");
    }

    else {
      return this.http.get(API_URL);
    }

  }


  
}
