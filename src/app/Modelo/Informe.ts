export interface Informe {
    id: number;
    tipo: number;
    subestacionId: number;
    lineaTransmisionId: number;
    datosDeLineaId: number;
    datosDeLinea: DatosDeLineaInforme;
    datosGeneralesId: number;
    datosGenerales: DatosGeneralesInforme;
    teleproteccionId: number;
    teleproteccion: TeleproteccionInforme;
    distanciaDeFallaId: number;
    distanciaDeFalla: DistanciaFallaInforme;
    tiemposDeDisparoId: number;
    tiemposDeDisparo: TiemposDeDisparoInforme;
    corrientesDeFallaId: number;
    corrientesDeFalla: CorrientesDeFallaInforme;
    estado: number;
}

export interface DatosGeneralesInforme {
    id: number;
    evento: string;
    fecha: Date | string;
    hora: string;
    subestacion: string;
    lt: string;
    equipo: string;
}

export interface DatosDeLineaInforme {
    id: number;
    ot: string;
    aviso: string;
    sap: string;
    distancia: string;
    funcion: string;
    zona: string;
}

export interface TeleproteccionInforme {
    id: number;
    tX_TEL: string;
    rX_TEL: string;
    tiempoMPLS: string;
}

export interface DistanciaFallaInforme {
    id: number;
    distanciaKM: string;
    distanciaPorcentaje: string;
    distanciaReportada: string;
    distanciaDobleTemporal: string;
    error: string;
    error_Doble: string;
}

export interface TiemposDeDisparoInforme {
    id: number;
    r: string;
    s: string;
    t: string;
    reserva: string;
}

export interface CorrientesDeFallaInforme {
    id: number;
    realIR: string;
    realIS: string;
    realIT: string;
    acumuladaR: string;
    acumuladaS: string;
    acumuladaT: string;
}
