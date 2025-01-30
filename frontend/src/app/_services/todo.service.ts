import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient)
  baseUrl = environment.apiUrl;

  createTodo(model: any) {
    return this.http.post(this.baseUrl + '/api/todo/create', model);
  }

  getAllTodos() {
    return this.http.get<Todo []>(this.baseUrl + "/api/todo");
  }

  getTodoById(id: number){
    return this.http.get<Todo>(`${this.baseUrl}/api/todo/${id}`);
  }
}