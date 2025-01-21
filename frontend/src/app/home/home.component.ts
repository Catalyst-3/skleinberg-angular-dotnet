import { Component } from '@angular/core';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-home',
  imports: [FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  createTodoMode = false;
  createTodoModeToggle() {
    this.createTodoMode = !this.createTodoMode;
  }

  cancelCreateTodo( event: boolean){
    this.createTodoMode = event;
  }
}
