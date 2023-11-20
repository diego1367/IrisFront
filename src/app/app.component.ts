import { Component, OnInit} from '@angular/core';
import { GeneralService } from 'src/services/general.service';

interface Task {
  id:number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Token:any=null;
  tasks: Task[] = [];
  backuptasks: Task[] = [];

  newTask: string = '';
  selectedOption: string = '1'; 
  constructor(private dataService: GeneralService) { }

  ngOnInit(): void {
    this.dataService.getToken(this.Token)
    .subscribe({
      next: (data: any) => {
        this.Token = data.token;
        this.refreshGet();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Se completo con exito');
      },
    });
  }

  get selectedOptionText(): string {
    switch (this.selectedOption) {
      case '1':
        return 'All';
      case '2':
        return 'Completed';
      case '3':
        return 'Incomplete';
      default:
        return '';
    }
  }

  filterTasks() {
    if (this.selectedOption === '1') {
      this.refreshGet();
    } else if (this.selectedOption === '2') {
      this.tasks = this.backuptasks.filter(task => task.completed);
    } else if (this.selectedOption === '3') {
      this.tasks = this.backuptasks.filter(task => !task.completed);
    } 
  }
  
  refreshGet(){
    this.dataService.get(this.Token)
    .subscribe({
      next: (data: any) => {
        this.tasks = data;
        this.backuptasks = data;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Se completo con exito');
      },
    });
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      var newPost: Task ={
        id:0,
        description:this.newTask,
        completed: false
      }
      this.dataService.post(this.Token ,newPost)
      .subscribe({
        next: (data: any) => {
          console.log('Se completo con exito'+ data);
          this.refreshGet();
          this.selectedOption ='1'
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log('Se completo con exito');
        },
      });
      this.newTask = '';
    }
  }

  completeTask(task: Task) {
    this.dataService.put(this.Token, task)
    .subscribe({
      next: (data: any) => {
        console.log('Se completo con exito');
        this.refreshGet();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Se completo con exito');
      },
    });
  }

  deleteTask(task: Task) {
    this.dataService.delete(this.Token, task.id)
    .subscribe({
      next: (data: any) => {
        console.log('Se completo con exito');
        this.refreshGet();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Se completo con exito');
      },
    });
  }
}
