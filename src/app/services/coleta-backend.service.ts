import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IColetaBackendResponse<T> {
  message?: string;
  data?: T;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColetaBackendService {
  private readonly url = 'http://localhost:8080'; /* Isso aqui vai mudar em produ o */
  private token: string = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') ?? '';
  }

  /**
   * Seta o token de autentição do usuário
   *
   * @param value O token de autenticação do usuário
   */
  public set setToken(value: string) {
    this.token = value;
    localStorage.setItem('token', value);
  }

  /**
   * @returns O token de autenticação do usuário armazenado
   */
  public get getToken(): string {
    return this.token;
  }

  private rawRequest(method: string, path: string, body?: any): Observable<IColetaBackendResponse<any>> {
    if (!this.token) this.token = localStorage.getItem('token') ?? '';
    return this.http.request(method, this.url + path, { body }) as Observable<IColetaBackendResponse<any>>;
  }

  /**
   * Faz o login do usuário
   * @param email O email do usuário
   * @param password A senha do usuário
   * @returns O token de autenticação do usuário ou erro
   */
  public getJwtByCredentials(email: string, password: string): Observable<IColetaBackendResponse<string>> {
    return this.rawRequest('POST', '/auth/login', { email, password });
  }
}
