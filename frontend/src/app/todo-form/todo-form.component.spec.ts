import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TodoFormComponent } from './todo-form.component';
import { TodoService } from '../_services/todo.service';
import { routes } from '../app.routes';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['createTodo']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      imports: [FormsModule, TodoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call TodoService.createTodo and navigate to / on success', () => {
    const mockResponse = { id: 1, title: 'Test Todo' };
    todoServiceSpy.createTodo.and.returnValue(of(mockResponse));

    component.model = { title: 'Test Todo' };
    component.createTodo();

    expect(todoServiceSpy.createTodo).toHaveBeenCalledWith({ title: 'Test Todo' });
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should call TodoService.createTodo and log error on failure', () => {
    const mockError = { message: 'Error occurred' };
    todoServiceSpy.createTodo.and.returnValue(throwError(mockError));
    const consoleSpy = spyOn(console, 'log');

    component.model = { title: 'Test Todo' };
    component.createTodo();

    expect(todoServiceSpy.createTodo).toHaveBeenCalledWith({ title: 'Test Todo' });
    expect(consoleSpy).toHaveBeenCalledWith(mockError);
  });

  it('should navigate to / when cancel is called', () => {
    component.cancel();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
