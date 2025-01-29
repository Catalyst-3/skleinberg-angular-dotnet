import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoCardComponent } from './todo-card/todo-card.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Root path points to HomeComponent
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/create', component: TodoFormComponent },
  { path: 'todos/:id', component: TodoCardComponent },
];