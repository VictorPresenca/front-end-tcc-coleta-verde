import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth-token';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  async setToken(token: string) {
    await this.storage.set(this.tokenKey, token);
  }

  async getToken(): Promise<string | null> {
    return await this.storage.get(this.tokenKey);
  }

  async removeToken() {
    await this.storage.remove(this.tokenKey);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp && decoded.exp > now;
    } catch (e) {
      return false;
    }
  }

  async logout() {
    await this.removeToken();
  }

}
