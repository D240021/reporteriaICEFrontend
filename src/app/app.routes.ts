import { Routes } from '@angular/router';
import { InicioSesionComponent } from './Vista/paginas/inicioSesion/inicio-sesion/inicio-sesion.component';
import { MenuAdministradorComponent } from './Vista/paginas/menuAdministrador/menu-administrador/menu-administrador.component';
import { AgregarUnidadRegionalComponent } from './Vista/paginas/agregarUnidadRegional/agregar-unidad-regional/agregar-unidad-regional.component';
import { AgregarSubestacionComponent } from './Vista/paginas/agregarSubestacion/agregar-subestacion/agregar-subestacion.component';
import { AgregarLineaTransmisionComponent } from './Vista/paginas/agregarLineaTransmision/agregar-linea-transmision/agregar-linea-transmision.component';
import { ConsultarReporteComponent } from './Vista/paginas/consultarReporte/consultar-reporte/consultar-reporte.component';
import { ConsultarUnidadRegionalComponent } from './Vista/paginas/consultarUnidadRegional/consultar-unidad-regional/consultar-unidad-regional.component';
import { EditarLineaTransmisionComponent } from './Vista/paginas/editarLineaTransmision/editar-linea-transmision/editar-linea-transmision.component';
import { ConsultarLineaTransmisionComponent } from './Vista/paginas/consultarLineaTransmision/consultar-linea-transmision/consultar-linea-transmision.component';
import { EditarSubestacionComponent } from './Vista/paginas/editarSubestacion/editar-subestacion/editar-subestacion.component';
import { CrearReporteComponent } from './Vista/paginas/crearReporte/crear-reporte/crear-reporte.component';
import { MenuSupervisorComponent } from './Vista/paginas/menuSupervisor/menu-supervisor/menu-supervisor.component';
import { EditarReporteComponent } from './Vista/paginas/editarReporte/editar-reporte/editar-reporte.component';
import { EditarReporteTLTComponent } from './Vista/paginas/editarReporteTLT/editar-reporte-tlt/editar-reporte-tlt.component';
import { EditarReporteTPMComponent } from './Vista/paginas/editarReporteTPM/editar-reporte-tpm/editar-reporte-tpm.component';
import { RegistrarOperarioComponent } from './Vista/paginas/registrarOperario/registrar-operario/registrar-operario.component';
import { ConsultarOperarioComponent } from './Vista/paginas/consultar-operario/consultar-operario/consultar-operario.component';
import { NoAutorizadoComponent } from './Vista/paginas/noAutorizado/no-autorizado/no-autorizado.component';
import { esAdminGuard } from './Seguridad/Guards/es-admin.guard';
import { esTltGuard } from './Seguridad/Guards/es-tlt.guard';
import { esTpmGuard } from './Seguridad/Guards/es-tpm.guard';
import { esSprvGuard } from './Seguridad/Guards/es-sprv.guard';
import { EditarOperarioComponent } from './Vista/paginas/editarOperario/editar-operario/editar-operario.component';
import { EditarUnidadRegionalComponent } from './Vista/paginas/editarUnidadRegional/editar-unidad-regional/editar-unidad-regional.component';
import { ConsultarSubestacionComponent } from './Vista/paginas/consultarSubestacion/consultar-subestacion/consultar-subestacion.component';
import { MenuTpmComponent } from './Vista/paginas/menuTpm/menu-tpm/menu-tpm.component';
import { MenuTltComponent } from './Vista/paginas/menuTlt/menu-tlt/menu-tlt.component';
import { NotFoundPageComponent } from './Vista/paginas/notFoundPage/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: 'inicio-sesion', component: InicioSesionComponent
    },
    {
        path: '', redirectTo: 'inicio-sesion', pathMatch: 'full'
    },
    {
        path: 'menu-administrador', component: MenuAdministradorComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'agregar-unidad-regional', component: AgregarUnidadRegionalComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'agregar-subestacion', component: AgregarSubestacionComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'agregar-linea-transmision', component: AgregarLineaTransmisionComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'consultar-unidad-regional', component: ConsultarUnidadRegionalComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'consultar-reporte', component: ConsultarReporteComponent
    },
    {
        path: 'editar-linea-transmision', component: EditarLineaTransmisionComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'consultar-linea-transmision', component: ConsultarLineaTransmisionComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'editar-subestacion', component: EditarSubestacionComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'crear-reporte', component: CrearReporteComponent, canActivate: [esTpmGuard]
    },
    {
        path: 'menu-supervisor', component: MenuSupervisorComponent, canActivate: [esSprvGuard]
    },
    {
        path: 'editar-reporte', component: EditarReporteComponent, canActivate: [esSprvGuard]

    },
    {
        path: 'editar-reporte-tpm', component: EditarReporteTPMComponent, canActivate: [esTpmGuard]
    },
    {
        path: 'editar-reporte-tlt', component: EditarReporteTLTComponent, canActivate: [esTltGuard]
    },
    {
        path: 'registrar-operario', component: RegistrarOperarioComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'consultar-operario', component: ConsultarOperarioComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'no-autorizado', component: NoAutorizadoComponent
    },
    {
        path: 'editar-operario', component: EditarOperarioComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'editar-unidad-regional', component: EditarUnidadRegionalComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'consultar-subestacion', component: ConsultarSubestacionComponent, canActivate: [esAdminGuard]
    },
    {
        path: 'menu-tpm', component: MenuTpmComponent, canActivate: [esTpmGuard]
    },
    {
        path: 'menu-tlt', component: MenuTltComponent, canActivate: [esTltGuard]
    },
    {
        path: '**', component: NotFoundPageComponent
    }

];
