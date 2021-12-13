import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  loading: boolean = false;
  user_id: any;
  constructor(private authService: AuthServiceService, private router: Router) {
    this.user_id = localStorage.getItem('user-id');
    if (this.user_id != null && this.user_id != '' && this.user_id != 'undefined') {
      router.navigate(['/lists']);
    }
  }

  ngOnInit() {
  }

  onSignupButtonClicked(email: string, password: string) {
    this.loading = true;
    this.authService.signup(email, password).then((res: any) => {
      console.log(res);
      this.loading = false;
      if (res.body['status'] == 'success') {
        this.authService.setSession(res.body.user._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.router.navigate(['/login']);
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
