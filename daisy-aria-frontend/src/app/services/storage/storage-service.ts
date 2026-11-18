import { Service } from '@angular/core';

@Service()
export class StorageService {
  public getAccessToken(): string {
    let value = localStorage.getItem('accessToken');
    if (value == null) value = '';
    return value;
  }

  public getUserId(): string {
    let value = localStorage.getItem('userId');
    if (value == null) value = '';
    return value;
  }

  public getProfileId(): string {
    let value = localStorage.getItem('profileId');
    if (value == null) value = '';
    return value;
  }

  public getRole(): string {
    let value = localStorage.getItem('role');
    if (value == null) value = '';
    return value;
  }

  public isSuperAdmin(): boolean {
    let value = localStorage.getItem('role');
    if (value == null) value = '';
    if (value == 'SUPERADMIN') {
      return true;
    } else {
      return false;
    }
  }

  //------------------------------------------------------
  public setAccessToken(token: string): any {
    return localStorage.setItem('accessToken', token);
  }

  public setUserId(userId: string): any {
    return localStorage.setItem('userId', userId);
  }

  public setProfileId(profileId: string): any {
    return localStorage.setItem('profileId', profileId);
  }

  public setRole(role: string): any {
    return localStorage.setItem('role', role);
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.clear();
  }
}
