import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../_services/todo.service';


@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  private todoService = inject(TodoService);
  toggleCreateTodoMode = output();
  model: any = {};

  createTodo() {
    console.log(this.model);
    this.todoService.createTodo(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      }, 
      error: error => console.log(error)
    })

  }
  cancel(){
    console.log("cancel");
    this.toggleCreateTodoMode.emit();
  }
}
