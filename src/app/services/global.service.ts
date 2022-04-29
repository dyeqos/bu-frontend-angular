import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParametrosResponse } from '../interfaces/parametros';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  tipoDocumento(){
    const url = `${this.baseUrl}/tipo-documentos`;
    return this.http.get<ParametrosResponse>(url);
  }

  moneda(){
    const url = `${this.baseUrl}/moneda`;
    return this.http.get<ParametrosResponse>(url);
  }

  sucursal(){
    const url = `${this.baseUrl}/sucursal`;
    return this.http.get<ParametrosResponse>(url);
  }

  productos(){
    const url = `${this.baseUrl}/productos`;
    return this.http.get<ParametrosResponse>(url);
  }
}
