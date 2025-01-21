import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  private todoService = inject(TodoService);
  cancelCreateTodo = output<boolean>();
  model: any = {};

  createTodo() {
    console.log(this.model);
    this.todoService.createTodo(this.model).subscribe({
      next: response => {
        console.log(response);
      }, 
      error: error => console.log(error)
    })

  }
  cancel(){
    console.log("cancel");
    this.cancelCreateTodo.emit(false);
  }
}
