import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;
  load:boolean=false;

  selectedListId: any;

  constructor(private authService: AuthServiceService, private route: ActivatedRoute, private router: Router) {
   
  }

  logout(){
    this.authService.logout();
  }
  
  onTaskClick(task: any) {
    console.log(task);
    // we want to set the task to completed
    this.authService.postData(JSON.stringify({task:task.task,completed:!task.completed}),`${this.selectedListId}/updatetask/${task._id}`).then((res:any) => {
      // the task has been set to completed successfully
      console.log(res);
      if (res['status']==='success'){
        task.completed = !task.completed;
      }
      else{
        alert(res['msg'] || "Something went's wrong")
      }
    }).catch(err=>{
      console.log(err);
      alert("Something went's wrong");
    });
  }

  onDeleteListClick() {
    // delete the list from the task manager
    this.authService.postData(JSON.stringify({}),`deletelist/${this.selectedListId}`).then((res: any) => {
      console.log(res);
      if (res.status==='success'){
        this.router.navigate(['/lists']);
      }
      else{
        alert(res['msg'] || "Something went's wrong")
      }
    }).catch(err=>{
      console.log(err);
      alert("Something went's wrong");
    });
  }
  
  onDeleteTaskClick(taskId: any) {
    this.authService.postData(JSON.stringify({}),`${this.selectedListId}/deletetask/${taskId}`).then((res: any) => {
      console.log(res);
      if (res.status==='success'){
        this.tasks = this.tasks.filter((val: { _id: any; }) => val._id !== taskId);
      }
      else{
        alert(res['msg'] || "Something went's wrong")
      }
    }).catch(err=>{
      console.log(err);
      alert("Something went's wrong");
    });
  }
  
  ngOnInit(){
    this.load=false;
    try {
      this.authService.getData('getlist').then((res:any) => {  // call only on when component changes
        this.load=true;
        console.log(res);
        this.lists = res['data'];
      });
      this.route.params.subscribe((params: Params) => { // call only on when route change
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.authService.getData(`${this.selectedListId}/gettask`).then((res: any) => {
            console.log(res);
            this.tasks=res.data;
          })
        } else {
          this.tasks = undefined;
        }
      });
      
    }
    catch (err) {
      this.load=true
      console.log(err);
    };
  }

}
