import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../_services/todo.service';
import { Todo } from '../_models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  @Input() todo?: Todo;
  @Input() isInList: boolean = false;
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  private router = inject(Router);
  loading: boolean = false;

  ngOnInit(): void {
    if (!this.todo) {
      const id = this.getValidatedId();
      if (id === null) {
        return;
      }
      this.loadTodo(id);
    }
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

  toggleComplete() {
    if( this.todo){
      const nextIsComplete = !this.todo.isComplete;
      this.todoService.updateTodoIsComplete(this.todo.id, nextIsComplete).subscribe({
        next: () => {
          this.todo!.isComplete = nextIsComplete;
          console.log(`Todo #${this.todo!.id} marked as ${this.todo!.isComplete ? 'complete' : 'incomplete'}`);
        },
        error: (error) => {
          console.error('Error updating todo:', error);
        }
      })
    }
  }

  deleteTodo() {
    if( this.todo){
      console.log(`Todo #${this.todo.id} marked as deleted`);
    }
  }

  navigateToTodoItem() {
    if (this.todo) {
      this.router.navigateByUrl(`/todos/${this.todo.id}`);
    }
  }
}

