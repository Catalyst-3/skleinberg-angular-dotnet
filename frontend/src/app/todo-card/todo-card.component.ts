import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  private router = inject(Router);

  todoReceived = false;
  todoNotFound = false;
  todo: any;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id) || id <= 0) {
      this.todoNotFound = true;
      return;
    }

    this.todoService.getTodoById(id).subscribe({
      next: (response) => {
        if (response) {
          this.todo = response;
          this.todoReceived = true;
        } else {
          this.todoNotFound = true;
        }
      },
      error: (error) => {
        console.log(error);
        this.todoNotFound = true;
      }
    });
  }

  navigateToList(): void {
    this.router.navigateByUrl('/todos');
  }
}

