import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { TodoFormComponent } from './todo-form.component';
import { TodoService } from '../_services/todo.service';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(() => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['createTodo']);

    TestBed.configureTestingModule({
      imports: [TodoFormComponent, FormsModule], // Import the standalone component here
      providers: [
        { provide: TodoService, useValue: todoServiceSpy }, // Use a mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call TodoService.createTodo and handle success', () => {
    const mockResponse = { id: 1, title: 'Test Todo' };
    todoServiceSpy.createTodo.and.returnValue(of(mockResponse));
    spyOn(component, 'cancel');

    component.model = { title: 'Test Todo' };
    component.createTodo();

    expect(todoServiceSpy.createTodo).toHaveBeenCalledWith({ title: 'Test Todo' });
    expect(component.cancel).toHaveBeenCalled();
  });

  it('should call TodoService.createTodo and handle error', () => {
    const mockError = { message: 'Error occurred' };
    todoServiceSpy.createTodo.and.returnValue(throwError(mockError));
    const consoleSpy = spyOn(console, 'log');

    component.model = { title: 'Test Todo' };
    component.createTodo();

    expect(todoServiceSpy.createTodo).toHaveBeenCalledWith({ title: 'Test Todo' });
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });

  it('should emit toggleCreateTodoMode when cancel is called', () => {
    spyOn(component.toggleCreateTodoMode, 'emit');

    component.cancel();

    expect(component.toggleCreateTodoMode.emit).toHaveBeenCalled();
  });
});
