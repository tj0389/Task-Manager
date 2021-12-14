import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private appUrl = environment.API_URL;

  constructor(private router: Router, private http: HttpClient) { }

  getApi(type: any): Observable<any> {
    const headers =
    {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return this.http.get(this.appUrl + type, { headers: headers });
  }

  postApi(credentials: any, type: any): Observable<any> {
    const headers =
    {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return this.http.post(this.appUrl + type, credentials, { headers: headers });
  }

  postData(credentials: any, type: any) {
    return new Promise((resolve, reject) => {
      this.postApi(credentials, type).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err)
      });
    });
  }
  
  getData(type: any) {
    return new Promise((resolve, reject) => {
      this.getApi(type).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err)
      });
    });
  }

  login(email: string, password: string) {
    let headers =
    {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.appUrl + 'user/signin', JSON.stringify({ email: email, password: password }), { headers: headers, observe: 'response' }).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err);
      });
    })
    // return this.http.post(this.appUrl+'user/signin',JSON.stringify({email:email, password:password}),{headers:headers,observe:'response'}).pipe(
    //   shareReplay(),
    //   tap((res: any) => {
    //     // the auth tokens will be in the header of this response
    //     console.log(res);
    //     // if (res.status===200)
    //       this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
    //     console.log("LOGGED IN!");
    //   })
    // ) 
  }

  signup(email: string, password: string) {
    let headers =
    {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.appUrl + 'user/signup', JSON.stringify({ email: email, password: password }), { headers: headers, observe: 'response' }).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err);
      });
    })
    // return this.http.post(this.appUrl+'user/signup',JSON.stringify({email:email, password:password}),{headers:headers,observe:'response'}).pipe(
    //   shareReplay(),
    //   tap((res: any) => {
    //     // the auth tokens will be in the header of this response
    //     if (res.status===200)
    //       this.setSession(res.body.user._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
    //     console.log("Successfully signed up and now logged in!");
    //     // console.log(res);
    //   })
    // ) 
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    let x_refersh_token: any = this.getRefreshToken();
    let _id: any = this.getUserId();
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "x-refresh-token": x_refersh_token,
      "_id": _id
    }
    return this.http.get(this.appUrl + 'user/me/access-token', { headers: headers, observe: 'response' }).pipe(
      tap((res: any) => {
        console.log(res);
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }

}
