import { catchError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  user_id: any;
  loading: boolean = false;
  constructor(private authService: AuthServiceService, private router: Router) {
    this.user_id = localStorage.getItem('user-id');
    if (this.user_id != null && this.user_id != '' && this.user_id != 'undefined') {
      router.navigate(['/lists']);
    }
  }

  ngOnInit() {
  }

  onLoginButtonClicked(email: string, password: string) {
    this.loading = true;
    this.authService.login(email, password).then((res: any) => {
      console.log(res);
      this.loading = false;
      if (res.body['status'] == 'success') {
        this.authService.setSession(res.body.user._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.router.navigate(['/lists']);
      }
      else {
        alert(res.body['msg'] || "something went's wrong");
      }
    }).catch((error) => {
      console.log(error);
      this.loading = false;
      alert("something went's wrong");
    })
  }

}
