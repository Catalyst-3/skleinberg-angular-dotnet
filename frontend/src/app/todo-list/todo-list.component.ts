import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  listName = "Your Current todo list";
  allTodos: Todo[] = [];
  visibleTodos: Todo[] = [];
  currentFilter: string = 'all';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentFilter = params['filter'] || 'all';
      this.loadTodos();
    });

    this.todoService.todoListUpdated.subscribe(() => {
      this.filterTodos();
    });
  }


  loadTodos() {
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
    switch (this.currentFilter) {
      case 'deleted':
        this.visibleTodos = this.allTodos.filter(todo => todo.isDeleted);
        this.listName = "Deleted Todos";
        break;
      case 'completed':
        this.visibleTodos = this.allTodos.filter(todo => todo.isComplete && !todo.isDeleted);
        this.listName = "Completed Todos";
        break;
      case 'incomplete':
        this.visibleTodos = this.allTodos.filter(todo => !todo.isComplete && !todo.isDeleted);
        this.listName = "Incomplete Todos";
        break;
      default:
        this.visibleTodos = this.allTodos.filter(todo => !todo.isDeleted);
        this.listName = "Your Current Todo List";
        break;
    }
  }

  changeFilter(event: Event) {
    const selectedFilter = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/todos'], { queryParams: { filter: selectedFilter } });
  }
}
