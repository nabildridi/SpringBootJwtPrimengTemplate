import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public getAccessToken(): string {
    let value = localStorage.getItem('accessToken');
    if (value == null) value = '';
    return value;
  }

  public getUsername(): string {
    let value = localStorage.getItem('username');
    if (value == null) value = '';
    return value;
  }

  public getUserId(): number {
    let value = localStorage.getItem('userId');
    if (value == null) value = '';
    return Number(value);
  }

  public getProfileId(): number {
    let value = localStorage.getItem('profileId');
    if (value == null) value = '';
    return Number(value);
  }

  public getProfileName(): string {
    let value = localStorage.getItem('profileName');
    if (value == null) value = '';
    return value;
  }

  public getUserPrenomNom(): string {
    let value = localStorage.getItem('userPrenomNom');
    if (value == null) value = '';
    return value;
  }

  public setAccessToken(token: string): any {
    return localStorage.setItem('accessToken', token);
  }

  public setUsername(username: string): any {
    return localStorage.setItem('username', username);
  }

  public setUserId(userId: string): any {
    return localStorage.setItem('userId', userId);
  }

  public setProfileId(profileId: string): any {
    return localStorage.setItem('profileId', profileId);
  }

  public setProfileName(profileName: string): any {
    return localStorage.setItem('profileName', profileName);
  }

  public setUserPrenomNom(userPrenomNom: string): any {
    return localStorage.setItem('userPrenomNom', userPrenomNom);
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.clear();
  }
}
