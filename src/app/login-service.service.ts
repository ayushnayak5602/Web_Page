import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:3131/credentials'; // Replace with your authentication API URL

  constructor() { }

  login(username: string, password: string): Promise<any> {
    const loginData = { username, password };
    return axios.post(`${this.apiUrl}/login`, loginData);
  }
}
