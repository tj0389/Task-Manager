import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { AuthServiceService } from '../authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class WebrequestIntercepterService {

  refreshingAccessToken: boolean=false;
  accessTokenRefreshed: Subject<any> = new Subject();

  constructor(private authService:AuthServiceService){  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        
        if (error.status === 401) {
          // 401 error so we are unauthorized
          // refresh the access token
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                this.authService.logout();
                return EMPTY;
              })
            )
        }
        
        return throwError(() => new Error());
      })
    )
  }

  refreshAccessToken() {
    console.log(this.refreshingAccessToken);
    // if (this.refreshingAccessToken) {
    //   return new Observable(observer => {
    //     this.accessTokenRefreshed.subscribe(() => {
    //       // this code will run when the access token has been refreshed
    //       observer.next();
    //       observer.complete();
    //     })
    //   })
    // } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap((res) => {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          // this.accessTokenRefreshed.next(res);
        })
      )
    // }
    
  }
  
  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
