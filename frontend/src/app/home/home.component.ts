import { Component } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodoFormComponent } from "../todo-form/todo-form.component";


@Component({
  selector: 'app-home',
  imports: [TodoListComponent, TodoFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  createTodoMode = false;
  toggleCreateTodoMode() {
    this.createTodoMode = !this.createTodoMode;
  }
}