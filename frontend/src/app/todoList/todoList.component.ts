import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todoList.component.html',
  styleUrl: './todoList.component.css'
})
export class TodoListComponent implements OnInit {
http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  listName = "Your Current todo list";
  todos: any;
  
  ngOnInit(): void {
    this.http.get(this.apiUrl + "/api/todo").subscribe({
      next: response => this.todos = response,
      error: error  => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  deleteTodo(id: number) {
    console.log("delete button pressed for todo #" + id);
  }
}
