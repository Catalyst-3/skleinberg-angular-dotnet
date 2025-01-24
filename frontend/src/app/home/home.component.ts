import { Component } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodoFormComponent } from "../todo-form/todo-form.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToCreateTodo() {
    this.router.navigateByUrl('/todos/create');
  }
}