import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoCardComponent } from './todo-card.component';
import { TodoService } from '../_services/todo.service';
import { environment } from '../../environments/environment';
import { Todo } from '../_models/todo';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let httpMock: HttpTestingController;
  let todoService: TodoService;
  let activatedRouteStub: any;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    activatedRouteStub = { snapshot: { paramMap: { get: () => '1' } } };
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TodoCardComponent,
        TodoService,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
      ],
    });

    component = TestBed.inject(TodoCardComponent);
    httpMock = TestBed.inject(HttpTestingController);
    todoService = TestBed.inject(TodoService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the correct todo on initialization when no todo is provided', () => {
    const mockTodo: Todo = {
      id: 1, title: 'Todo 1',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodo);

    expect(component.todo).toEqual(mockTodo);
  });

  it('should not fetch data if todo is provided as input', () => {
    component.todo = {
      id: 2,
      title: 'Injected Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };

    component.ngOnInit();
    httpMock.expectNone(`${environment.apiUrl}/api/todo/2`);
  });


  it('should handle an invalid todo ID', () => {
    activatedRouteStub.snapshot.paramMap.get = () => 'invalid';
    component.ngOnInit();

    expect(component.todo).toBeUndefined();
    httpMock.expectNone(`${environment.apiUrl}/api/todo/invalid`);
  });

  it('should set loading to false and log error when API returns an error', () => {
    spyOn(console, 'log');
    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    req.flush('Todo not found', { status: 404, statusText: 'Not Found' });

    expect(component.loading).toBeFalse();
    expect(console.log).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 404,
      statusText: 'Not Found'
    }));
  });

  it('should send a PATCH request and update isComplete when toggleComplete() is called', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };
  
    spyOn(todoService, 'updateTodoIsComplete').and.callThrough();
  
    component.toggleComplete();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isComplete: true });
  
    req.flush({});
  
    expect(component.todo.isComplete).toBeTrue();
    expect(todoService.updateTodoIsComplete).toHaveBeenCalledWith(1, true);
  });

  it('should not update isComplete if the API request fails', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };
  
    spyOn(console, 'error'); 
  
    component.toggleComplete();
  
    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    expect(req.request.method).toBe('PATCH');
  

    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  
  
    expect(component.todo.isComplete).toBeFalse();
    expect(console.error).toHaveBeenCalled();
  });

  it('should send a PATCH request and update isDeleted when toggleDeleted() is called', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };

    spyOn(todoService, 'updateTodoIsDeleted').and.callThrough();

    component.toggleDeleted();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isDeleted: true });

    req.flush({});

   
    expect(component.todo.isDeleted).toBeTrue();
    expect(todoService.updateTodoIsDeleted).toHaveBeenCalledWith(1, true);
  });

  it('should not update isDeleted if the API request fails', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };

    spyOn(console, 'error');

    component.toggleDeleted();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    expect(req.request.method).toBe('PATCH');

    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

  
    expect(component.todo.isDeleted).toBeFalse();
    expect(console.error).toHaveBeenCalled();
  });

  it('should trigger list update when toggleDeleted() is called and todo is in a list', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };
    component.isInList = true;

    spyOn(todoService, 'triggerListUpdate').and.callThrough();

    component.toggleDeleted();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    req.flush({});

    expect(todoService.triggerListUpdate).toHaveBeenCalled();
  });
  
  it('should show a deleted message when toggleDeleted() is called for a single todo view', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: false
    };
    component.isInList = false;
  
    component.toggleDeleted();
  
    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    req.flush({});
  
    
    expect(component.todo?.isDeleted).toBeTrue();
  
    expect(component.todo?.isDeleted).toBeTrue(); 
  });

  it('should show the todo card when toggleDeleted() is called for a deleted todo in single todo view', () => {
    component.todo = {
      id: 1,
      title: 'Test Todo',
      created: new Date(2099, 0, 1),
      updated: null,
      isComplete: false,
      isDeleted: true
    };
    component.isInList = false;
  
    component.toggleDeleted();
  
    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    req.flush({});
  
    
    expect(component.todo?.isDeleted).toBeFalse();
  });
  
  
  
});
