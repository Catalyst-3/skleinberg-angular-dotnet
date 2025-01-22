import { Component } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";


@Component({
  selector: 'app-home',
  imports: [TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  createTodoMode = false;
  createTodoModeToggle() {
    this.createTodoMode = !this.createTodoMode;
  }
}