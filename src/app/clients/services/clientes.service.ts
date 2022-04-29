import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientesResponse } from '../interfaces/interfaces';
 
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  
  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  listar(){
    const url = `${this.baseUrl}/cliente`;
    return this.http.get<ClientesResponse>(url);
  }

  guardarCliente(nom:string, pat:string, mat:string, doc:number, numDoc:string, nac:string, genero:string)
  {
    const url = `${this.baseUrl}cliente`;
    const body = {
          nombre: nom.toUpperCase().trim(),
          paterno: pat,
          materno: mat,
          tipoDocu: doc,
          docuIdentidad: numDoc.toUpperCase().trim(),
          nacimiento: nac,
          genero: genero.toUpperCase().trim()
          }
    if(body.paterno){
      body.paterno = body.paterno.toUpperCase().trim();
    }else { body.paterno = "" }
      
    if(body.materno){
      body.materno = body.materno.toUpperCase().trim();
    } else { body.materno = "" }

    return this.http.post(url,body);
  }

  modificarCliente(id:number,nom:string, pat:string, mat:string, doc:number, numDoc:string, nac:string, genero:string)
  {
    const url = `${this.baseUrl}cliente`;
    const body = {
      id_cliente: id,
      nombre: nom.toUpperCase().trim(),
      paterno: pat,
      materno: mat,
      tipoDocu: doc,
      docuIdentidad: numDoc.toUpperCase().trim(),
      nacimiento: nac,
      genero: genero.toUpperCase().trim()
      }
    if(body.paterno){
      body.paterno = body.paterno.toUpperCase().trim();
    }else { body.paterno = "" }
      
    if(body.materno){
      body.materno = body.materno.toUpperCase().trim();
    } else { body.materno = "" }

    return this.http.put(url,body);

  }

  buscarPersona(id:number){
    const url = `${this.baseUrl}cliente/${id}`;
    return this.http.get<ClientesResponse>(url);
  }

  borrarPersona(id:number){
    const url = `${this.baseUrl}cliente`;
    const option = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      }),
      body:{
        id_cliente: id
      }
    }
    return this.http.delete(url, option );
  }
}
