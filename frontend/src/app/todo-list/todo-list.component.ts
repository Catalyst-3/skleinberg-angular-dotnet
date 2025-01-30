import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);
  listName = "Your Current todo list";
  todos: Todo[] = [];
  
  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(){
    this.todoService.getAllTodos().subscribe({
      next: todos => this.todos = todos,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  deleteTodo(id: number) {
    console.log("delete button pressed for todo #" + id);
  }
}
