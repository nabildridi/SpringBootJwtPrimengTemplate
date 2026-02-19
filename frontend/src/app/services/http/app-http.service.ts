import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpTopics } from '../../enums/http-topics';
import { HttpData } from './http-data';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  backendUrl : string =environment.backendUrl;

  constructor(private httpClient :HttpClient) { }

  public topic(t : HttpTopics) : HttpData {
    let httpData : HttpData = new HttpData(this.httpClient, this.backendUrl);
    httpData.topic(t);
    return httpData;
  }


}
