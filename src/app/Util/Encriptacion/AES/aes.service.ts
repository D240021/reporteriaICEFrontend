import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESService {

  constructor() { }

  private llavePrivada = '12345678901234567890123456789012';


  encriptarAES(datos: string): string {
    // Genera un IV aleatorio
    const iv = CryptoJS.lib.WordArray.random(16);

    // Cifra los datos con la clave y el IV
    const encrypted = CryptoJS.AES.encrypt(datos, CryptoJS.enc.Utf8.parse(this.llavePrivada), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Convierte el IV y el texto cifrado a Base64 y los concatena
    const ivBase64 = iv.toString(CryptoJS.enc.Base64);
    const encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    // Retorna en el formato: IV + ":" + ciphertext
    return `${ivBase64}:${encryptedBase64}`;
  }


  desencriptarAES(datosCrifrados: string): string {
    const bytes = CryptoJS.AES.decrypt(datosCrifrados, this.llavePrivada);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
