import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthServiceService, private router: Router) { }

  listId: any;

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }
  
  updateList(title: string) {
    this.authService.postData(JSON.stringify({title:title}),`updatelist/${this.listId}`).then((res:any) => {
      console.log(res);
      if (res['status']==='success'){
        // Now we navigate to /lists/listId
        this.router.navigate(['/lists', this.listId]);
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
