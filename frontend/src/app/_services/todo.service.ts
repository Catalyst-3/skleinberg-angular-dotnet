import { HttpClient } from '@angular/common/http';
import { inject, Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl;
  todoListUpdated = new EventEmitter<void>();

  triggerListUpdate() {
    this.todoListUpdated.emit();
  }

  createTodo(model: any) {
    return this.http.post(`${this.baseUrl}/api/todo/create`, model);
  }

  getAllTodos() {
    return this.http.get<Todo []>(`${this.baseUrl}/api/todo`);
  }

  getTodoById(id: number){
    return this.http.get<Todo>(`${this.baseUrl}/api/todo/${id}`);
  }

  updateTodoIsComplete(id: number, isComplete: boolean) {
    return this.http.patch(`${this.baseUrl}/api/todo/${id}`, { isComplete });
  }

  updateTodoIsDeleted(id: number, isDeleted: boolean) {
    return this.http.patch(`${this.baseUrl}/api/todo/${id}`, { isDeleted });
  }
}