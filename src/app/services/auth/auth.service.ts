import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, of, ReplaySubject } from "rxjs";
import { LoggedUserModel } from "../../models/user-models.model";
import { ApiResponseModel } from "../../models/api-responses.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl: string = environment.apiUrl;
  private currentUserSource = new ReplaySubject<LoggedUserModel | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  loadCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<LoggedUserModel>(`${this.apiBaseUrl}/userAccounts/getCurrentUser`, { headers }).pipe(
      map((user) => {
        if (user) {
          this.currentUserSource.next(user);
          localStorage.setItem('token', user.token);
          return user;
        }

        return null;
      })
    )
  }

  logUserIn(details: { }) {
    return this.http.post<LoggedUserModel>(`${this.apiBaseUrl}/userAccounts/login`, details).pipe(
      map((user) => {
        this.currentUserSource.next(user);
        localStorage.setItem('token', user.token);
        return user;
      })
    );
  }

  logUserOut() {
    this.currentUserSource.next(null);
    localStorage.removeItem('token');
  }

  registerUserAsPassenger(details: { }) {
    return this.http.post<ApiResponseModel<any>>(`${this.apiBaseUrl}/passengers`, details);
  }

  checkEmailAvailability(email: string) {
    return this.http.get<ApiResponseModel<any>>(`${this.apiBaseUrl}/passengers/checkEmailAvailability?email=${email}`)
      .pipe(
        map(response => {
          return response.status === 'Error';
        })
      )
  }

  checkPhoneNumberAvailability(phoneNumber: string) {
    return this.http.get<ApiResponseModel<any>>(`${this.apiBaseUrl}/passengers/checkPhoneNumberAvailability?phoneNumber=${phoneNumber}`)
      .pipe(
        map(response => {
          return response.status === 'Error';
        })
      )
  }

  private getActiveUserToken() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.currentUserSource.next(null);
      return null;
    }

    return token;
  }

  getHeaderInstanceWithAuthorizationSet() {
    let headers = new HttpHeaders();
    return headers.set('Authorization', `Bearer ${this.getActiveUserToken()}`);
  }

}
