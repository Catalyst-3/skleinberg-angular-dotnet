import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../_services/todo.service';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  private todoService = inject(TodoService);
  private router = inject(Router);
  model: any = {};

  createTodo() {
    this.todoService.createTodo(this.model).subscribe({
      next: response => {
        this.cancel();
      }, 
      error: error => console.log(error)
    })

  }
  cancel(){
    this.router.navigateByUrl('/')
  }
}
