export interface ParametrosResponse {

    ok: boolean,
    msg: string,
    datos?: Parametro[],
    
}

export interface Parametro {

    ID_PARAMETRO: number,
    NOMBRE: string

}