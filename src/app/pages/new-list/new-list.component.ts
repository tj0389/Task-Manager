import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private authService:AuthServiceService, private router: Router) { }

  ngOnInit() {
  }
  
  createList(title: string) {
    this.authService.postData(JSON.stringify({title:title}),'addlist').then((res:any) => {
      console.log(res);
      if (res['status']==='success'){
        // Now we navigate to /lists/listId
        this.router.navigate([ '/lists',res.data[0]._id]);
      }
      else{
        alert(res['msg'] || "Something went's wrong")
      }
    }).catch(err=>{
      console.log(err);
      alert("Something went's wrong");
    });
  }
}
