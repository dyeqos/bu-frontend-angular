import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuentasResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  listar(){
    const url = `${this.baseUrl}/cuenta`;
    return this.http.get<CuentasResponse>(url);
  }

  verCuenta(id: number){
    const url = `${this.baseUrl}/cuenta/${id}`;
    return this.http.get<CuentasResponse>(url);
  }

  verCuentaCliente(id: number){
    const url = `${this.baseUrl}/cuenta-cliente/${id}`;
    return this.http.get<CuentasResponse>(url);
  }

  borrarCuenta(id:number){
    const url = `${this.baseUrl}cuenta`;
    const option = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      }),
      body:{
        id_cuenta: id
      }
    }
    return this.http.delete(url, option );
  }

  guardarCuenta(tipo:number, num:number, mone:number, monto:number, fecha:string, sucu:number, clie:number)
  {
    const url = `${this.baseUrl}cuenta`;
    const body = {
          tipoProduc : tipo,
          numCuenta : num,
          moneda : mone,
          monto : monto,
          fecha : fecha.toUpperCase().trim(),
          sucursal: sucu,
          cliente : clie
          }

          console.log(body)

    return this.http.post(url,body);
  }
}
