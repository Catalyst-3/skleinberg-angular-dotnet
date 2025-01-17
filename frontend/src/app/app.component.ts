import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl;
  title = "Steven's Todo App";
  todos: any;
  
  ngOnInit(): void {
    this.http.get(this.apiUrl + "/api/todo").subscribe({
      next: response => this.todos = response,
      error: error  => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
  

}
