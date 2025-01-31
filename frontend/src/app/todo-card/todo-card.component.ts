import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  private router = inject(Router);
  loading: boolean = false;

  todo: Todo = {
    id: -1,
    title: "",
    created: new Date(2099, 0, 1),
    updated: null,
    isComplete: false,
    isDeleted: false
  };

  ngOnInit(): void {
    const id = this.getValidatedId();
    if (id === null) {
      return;
    }
    this.loadTodo(id);
  }

  getValidatedId() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return isNaN(id) || id <= 0 ? null : id;
  }

  loadTodo(id: number) {
    this.loading = true;
    this.todoService.getTodoById(id).subscribe({
      next: (response) => {
        if (response) {
          this.todo = response;
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      }
    });
  }

  toggleComplete(){
    this.todo.isComplete = !this.todo.isComplete;
    console.log(`Todo #${this.todo.id} marked as ${this.todo.isComplete ? 'complete' : 'incomplete'}`);
  }

  deleteTodo(){
    console.log(`Todo #${this.todo.id} marked as deleted`);
  }

  navigateToList(){
    this.router.navigateByUrl('/todos');
  }
}

