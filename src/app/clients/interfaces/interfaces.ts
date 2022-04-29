

export interface ClientesResponse {
    ok: boolean,
    msg: string,
    datos?: ClienteResponse[],
}

export interface ClienteResponse{
    ID_CLIENTE: number,
    NOMBRES: string,
    PATERNO: string,
    MATERNO: string,
    TIPO_DOCUMENTO: number,
    DOCUMENTO: string,
    DOCUMENTO_IDENTIDAD: string,
    FECHA_NACIMIENTO: string,
    GENERO: string,
    GENERO_CHAR: string,
    COMPLETO: string
}

export interface CuentasResponse {
    ok: boolean,
    msg: string,
    datos?: CuentaResponse[],
}

export interface CuentaResponse {
    ID_CUENTA: number,
    TIPO_PRODUCTO: number,
    PRODUCTO: string,
    NUMERO_CUENTA: number,
    ID_MONEDA: number,
    MONEDA: string,
    MONTO: number,
    FECHA_CREACION: string,
    ID_SUCURSAL: number,
    SUCURSAL: string,
    CLIENTE_ID: number,
    CLIENTE: string
}