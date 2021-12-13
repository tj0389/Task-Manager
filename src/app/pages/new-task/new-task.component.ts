import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private authService: AuthServiceService, private route: ActivatedRoute, private router: Router) { }

  listId: string | undefined;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
    console.log(this.listId);
  }
  
  createTask(task: string) {
    this.authService.postData(JSON.stringify({task:task}),`${this.listId}/addtask`).then((res:any) => {
      console.log(res);
      if (res['status']==='success'){
        // Now we navigate to /lists/listId
        this.router.navigate(['../'], { relativeTo: this.route});
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
