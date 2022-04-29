import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosResponse } from 'src/app/interfaces/parametros';
import { GlobalService } from 'src/app/services/global.service';
import { ClientesResponse, CuentasResponse } from '../../interfaces/interfaces';
import { ClientesService } from '../../services/clientes.service';
import { CuentasService } from '../../services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes!: ClientesResponse;
  tipoDocumento!: ParametrosResponse;
  cuentaCliente!: CuentasResponse;
  tituloModal!: string;
  miformulario: FormGroup = this.fb.group({
    txtId: [''],
    txtNombres:['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
    txtPaterno:['',[Validators.minLength(3), Validators.maxLength(50)] ],
    txtMaterno:['',[Validators.minLength(3), Validators.maxLength(50)] ],
    ddDocumento:['',Validators.required],
    txtNumDocumento:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    txtNacimiento:['',[Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
    ddGenero:['',Validators.required],
  })
  
  constructor(private clienteService: ClientesService,
              private parametrosService: GlobalService,
              private cuentasService: CuentasService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTipoDocumentos();
  }
  
  listarTipoDocumentos(){
    this.parametrosService.tipoDocumento()
      .subscribe( resp => {
        this.tipoDocumento = resp;
      })
  }

  listarClientes(){
    this.clienteService.listar()
      .subscribe( resp => {
       this.clientes = resp;
      });
  }
  nuevoCliente(){
    this.miformulario.reset();
    this.tituloModal="Nuevo Cliente";
    this.miformulario.reset({
      txtId: 0
    })
  }

  editarCliente(id:number){
    this.miformulario.reset();
    this.tituloModal="Modificar Cliente";
    this.clienteService.buscarPersona(id)
      .subscribe(resp => {
        if(resp.ok){
          this.miformulario.reset({
            txtId: id,
            txtNombres: resp.datos![0].NOMBRES,
            txtPaterno: resp.datos![0].PATERNO,
            txtMaterno: resp.datos![0].MATERNO,
            ddDocumento: resp.datos![0].TIPO_DOCUMENTO,
            txtNumDocumento: resp.datos![0].DOCUMENTO_IDENTIDAD,
            txtNacimiento: resp.datos![0].FECHA_NACIMIENTO.split('T')[0],
            ddGenero: resp.datos![0].GENERO_CHAR,
          });
        }
      });
  }

  verCuentas(id:number)
  {
    console.log(id);
    this.cuentasService.verCuentaCliente(id)
      .subscribe( resp => {
        if(resp.ok)
        {
          this.cuentaCliente = resp
        }
      })
  }
  
  eliminarCliente(id:number){

    Swal.fire({
      title: 'Borrar Cliente',
      text: '¿Realmente quiere eliminar al cliente?',
      icon: 'warning',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonText: "No, Cancelar"
    })
    .then(resultado => {
      if (resultado.value) {
          this.clienteService.borrarPersona(id)
            .subscribe(resp => {
              this.listarClientes();
            });
      }
  });


    
  }

  camposValidos(campo: string){
    return this.miformulario.controls[campo].errors && this.miformulario.controls[campo].touched;
  }

  guardar(){
    if(this.miformulario.invalid){
      this.miformulario.markAllAsTouched();
      return;
    }
    const {txtId, txtNombres, txtPaterno, txtMaterno, ddDocumento, txtNumDocumento, txtNacimiento, ddGenero } = this.miformulario.value;

    if(txtId == 0){
      this.clienteService.guardarCliente( txtNombres, txtPaterno, txtMaterno, ddDocumento, txtNumDocumento, txtNacimiento, ddGenero)
        .subscribe( resp => {
          this.listarClientes();
        });
    }else{
      this.clienteService.modificarCliente(txtId, txtNombres, txtPaterno, txtMaterno, ddDocumento, txtNumDocumento, txtNacimiento, ddGenero)
        .subscribe(resp => {
          this.listarClientes();
        })
    }

    this.miformulario.reset();
  }

}
