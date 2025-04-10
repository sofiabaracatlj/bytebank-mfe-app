import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';



export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'http://localhost:3000/'; // Replace with your API endpoint

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post<any>(`${this.apiUrl}user/auth`, body).pipe(
            tap(response => {
                sessionStorage.setItem('token', response.result.token);
            })
        );
    }

    createUser(user: CreateUserRequest): Observable<any> {
        const headers = new HttpHeaders({
            'accept': '*/*',
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${this.apiUrl}user`, user, { headers });
    }
}
