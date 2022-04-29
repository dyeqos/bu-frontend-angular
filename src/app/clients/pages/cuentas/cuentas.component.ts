import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametrosResponse } from 'src/app/interfaces/parametros';
import { GlobalService } from 'src/app/services/global.service';
import { ClientesResponse, CuentasResponse } from '../../interfaces/interfaces';
import { ClientesService } from '../../services/clientes.service';
import { CuentasService } from '../../services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: [
  ]
})
export class CuentasComponent implements OnInit {

  cuentas!: CuentasResponse;
  tituloModal!: string;
  personas!: ClientesResponse;
  productos!: ParametrosResponse;
  monedas!:ParametrosResponse;
  sucursales!:ParametrosResponse;

  miformulario: FormGroup = this.fb.group({
    txtId: [''],
    ddpersona:['',Validators.required],
    ddproducto:['',Validators.required],
    txtNumeroCuenta:['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
    ddMoneda:['',Validators.required],
    txtMonto:['',[Validators.required, Validators.min(0)]],
    txtFecha:['',[Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
    ddSucursal:['',Validators.required],
  })

  constructor(private cuentaService: CuentasService,
              private clientesServices: ClientesService,
              private parametrosService: GlobalService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarCuentas();
    this.listarPersonas();
    this.listarTipoProductos();
    this.listarMonedas();
    this.listarSucursales();
  }

  listarSucursales(){
    this.parametrosService.sucursal()
      .subscribe( resp => {
        this.sucursales = resp;
      })
  }

  listarMonedas(){
    this.parametrosService.moneda()
      .subscribe( resp => {
        this.monedas = resp;
      })
  }

  listarTipoProductos(){
    this.parametrosService.productos()
      .subscribe( resp => {
        this.productos = resp;
      })
  }

  listarPersonas(){
    this.clientesServices.listar()
      .subscribe( resp => {
        this.personas = resp;
      })
  }
  camposValidos(campo: string){
    return this.miformulario.controls[campo].errors && this.miformulario.controls[campo].touched;
  }

  listarCuentas()
  {
    this.cuentaService.listar()
      .subscribe( resp => {
        this.cuentas = resp;
      })
  }
  
  nuevaCuenta(){
    this.miformulario.reset();
    this.tituloModal="Nueva Cuenta";
    this.miformulario.reset({
      txtId: 0
    })
  }

  editarCuenta(id:number){
    this.miformulario.reset();
    this.tituloModal="Modificar Cuenta";
    this.cuentaService.verCuenta(id)
      .subscribe(resp => {
        console.log(resp);
        if(resp.ok){
          this.miformulario.reset({
            txtId: id,
            ddpersona: resp.datos![0].CLIENTE_ID, 
            ddproducto: resp.datos![0].TIPO_PRODUCTO,
            txtNumeroCuenta: resp.datos![0].NUMERO_CUENTA,
            ddMoneda: resp.datos![0].ID_MONEDA,
            txtMonto: resp.datos![0].MONTO,
            txtFecha: resp.datos![0].FECHA_CREACION.split('T')[0],
            ddSucursal: resp.datos![0].ID_SUCURSAL
          });
        }
        console.log(this.miformulario);
      });
  }

  eliminarCuenta(id:number){

    Swal.fire({
      title: 'Borrar Cuenta',
      text: '¿Realmente quiere eliminar la Cuenta?',
      icon: 'warning',
      confirmButtonText: 'Si, Eliminar',
      showCancelButton: true,
      cancelButtonText: "No, Cancelar"
    })
    .then(resultado => {
      if (resultado.value) {
        this.cuentaService.borrarCuenta(id)
        .subscribe(resp => {
          this.listarCuentas();
        });
      }
  });



    
  }

  guardar(){
    if(this.miformulario.invalid){
      this.miformulario.markAllAsTouched();
      return;
    }
    const { txtId,ddpersona,ddproducto,txtNumeroCuenta,ddMoneda,txtMonto,txtFecha,ddSucursal } = this.miformulario.value;
    console.log(this.miformulario.value);
    if(txtId == 0){
      this.cuentaService.guardarCuenta(  ddproducto, txtNumeroCuenta, ddMoneda, txtMonto, txtFecha, ddSucursal,ddpersona )
        .subscribe( resp => {
          this.listarCuentas();
        });
    }
  }
}
