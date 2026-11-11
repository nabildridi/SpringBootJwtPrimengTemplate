import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpTopics } from '../../enums/http-topics';

export class HttpData {
  private url: string = '';
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient, backendUrl: string) {
    this.httpClient = httpClient;
    this.url = backendUrl;
  }

  public topic(t: HttpTopics): this {
    this.url += '/' + t;
    return this;
  }

  public add(...segments: any[]): this {
    if (segments) {
      for (var i = 0; i < segments.length; i++) {
        this.url += '/' + segments[i];
      }
    }
    return this;
  }

  public get(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public post(payload: any): Observable<any> {
    return this.httpClient.post(this.url, payload);
  }

  public put(payload: any): Observable<any> {
    return this.httpClient.put(this.url, payload);
  }

  public delete(): Observable<any> {
    return this.httpClient.delete(this.url);
  }

  public getBufferArray(): Observable<any> {
    return this.httpClient.get(this.url, { responseType: 'arraybuffer' });
  }

  public postBufferArray(payload: any): Observable<any> {
    return this.httpClient.post(this.url, payload, { responseType: 'arraybuffer' });
  }

  public getBlob(): Observable<any> {
    return this.httpClient.get(this.url, { responseType: 'blob' });
  }

  public postBlob(payload: any): Observable<any> {
    return this.httpClient.post(this.url, payload, { responseType: 'blob' });
  }

  public getText(): Observable<any> {
    return this.httpClient.get(this.url, { responseType: 'text' });
  }

  public postText(payload: any): Observable<any> {
    return this.httpClient.post(this.url, payload, { responseType: 'text' });
  }

  public postFile(formData: FormData): Observable<any> {
    return this.httpClient.post(this.url, formData);
  }
}
