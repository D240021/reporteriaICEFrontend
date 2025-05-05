export interface Reporte {
    id: number,
    mapaDeDescargas?: string | null | File | number[],
    observaciones?: string,
    evidencia?: string | null | File | number[],
    observacionesTecnicoLinea?: string,
    causas?: string,
    fechaHora?: Date | null | string,
    informeV1Id: number,
    informeV2Id: number,
    informeV3Id: number,
    informeV4Id: number,
    usuarioSupervisorId: number,
    tecnicoLineaId: number,
    estado: number,
    pdf?: any,
    nombreTecnicoLinea?: string,
    nombreSupervisor?: string,
    fechaFormateada?: string
}




