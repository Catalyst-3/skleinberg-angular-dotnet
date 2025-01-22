import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  toggleCreateTodoMode = output();
  model: any = {};

  createTodo() {
    console.log(this.model);

  }
  cancel(){
    console.log("cancel");
    this.toggleCreateTodoMode.emit();
  }
}
