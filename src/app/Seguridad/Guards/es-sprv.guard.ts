import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../Seguridad/seguridad.service';

export const esSprvGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const seguridadService = inject(SeguridadService);

  if (seguridadService.obtenerRol() === 'sprv') {
    return true;
  }

  router.navigate(['/no-autorizado']);
  return true;
};
