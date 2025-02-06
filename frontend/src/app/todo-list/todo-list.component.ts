import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { TodoFilter } from '../_models/todo-filter';

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
  currentFilter: TodoFilter = TodoFilter.All;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentFilter = params['filter'] as TodoFilter|| TodoFilter.All;
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
      case TodoFilter.Deleted:
        this.visibleTodos = this.allTodos.filter(todo => todo.isDeleted);
        this.listName = "Deleted Todos";
        break;
      case TodoFilter.Completed:
        this.visibleTodos = this.allTodos.filter(todo => todo.isComplete && !todo.isDeleted);
        this.listName = "Completed Todos";
        break;
      case TodoFilter.Incomplete:
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
    const selectedFilter = (event.target as HTMLSelectElement).value as TodoFilter;
    this.router.navigate(['/todos'], { queryParams: { filter: selectedFilter } });
  }
}
