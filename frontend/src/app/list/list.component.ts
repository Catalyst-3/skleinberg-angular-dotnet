import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  private todoService = inject(TodoService);
  todos: any;

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe({
      next: response => this.todos = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}
