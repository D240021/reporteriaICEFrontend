export interface Usuario {
    id: number,
    contrasenia: string,
    nombreUsuario: string,
    correo: string,
    nombre: string,
    apellido: string,
    identificador: string,
    rol: string,
    subestacionId: number | null,
    unidadRegionalId: number | null,
    nombreUnidadRegional?: string,
    nombreRol?: string

}

export interface AutenticacionUsuario {
    contrasenia: string,
    nombreUsuario: string,
}