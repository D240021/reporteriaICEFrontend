export interface DatosConfirmacion {
    titulo: string,
    descripcion: string,
    tipo: string
}

export const datosCerrarSesion: DatosConfirmacion = {
    titulo: 'Cerrar sesión',
    descripcion: '¿Desea cerrar sesión?',
    tipo: 'sesion'
}

export const datosConfirmacionSalidaFormulario : DatosConfirmacion = {
    titulo: 'Salir',
    descripcion: 'Los cambios no guardados se perderán',
    tipo: 'formularioAdmin'
}

export const datosConfirmacionSesionSinGuardar : DatosConfirmacion = {
    titulo: 'Salir',
    descripcion: 'Los cambios no guardados se perderán. Desea cerrar sesión?',
    tipo: 'sesion'
}

export const datosConfirmacionIrreversible : DatosConfirmacion = {
    titulo: 'Editar informe',
    descripcion: 'Los cambios serán irreversibles y no podrá volver a editar el formulario',
    tipo: ''
}