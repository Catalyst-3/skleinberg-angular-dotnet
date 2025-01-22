import { Component } from '@angular/core';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-home',
  imports: [ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  createTodoMode = false;
  createTodoModeToggle() {
    this.createTodoMode = !this.createTodoMode;
  }
}