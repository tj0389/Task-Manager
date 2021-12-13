import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthServiceService, private router: Router) { }

  taskId: any
  listId: any;


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId'];
        this.listId = params['listId'];
      }
    )
  }
  
  updateTask(task: string) {
    this.authService.postData(JSON.stringify({task:task}),`${this.listId}/updatetask/${this.taskId}`).then((res:any) => {
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
