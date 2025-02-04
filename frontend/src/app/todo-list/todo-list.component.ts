import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';
import { TodoCardComponent } from "../todo-card/todo-card.component";

@Component({
  selector: 'app-todo-list',
  imports: [TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);
  listName = "Your Current todo list";
  allTodos: Todo[] = [];
  visibleTodos: Todo[] = [];
  
  ngOnInit(): void {
    this.loadTodos();
    this.todoService.todoListUpdated.subscribe(() => {
      this.filterTodos();
    });
  }

  loadTodos(){
    this.todoService.getAllTodos().subscribe({
      next: todos => {
        this.allTodos = todos;
        this.filterTodos(); 
      },
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }

  filterTodos() {
    this.visibleTodos = this.allTodos.filter(todo => !todo.isDeleted);
  }
}
