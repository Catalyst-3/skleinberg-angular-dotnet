import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoCardComponent } from './todo-card.component';
import { TodoService } from '../_services/todo.service';
import { environment } from '../../environments/environment';

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

  it('should fetch the correct todo on initialization', () => {
    const mockTodo = { id: 1, title: 'Test Todo' };

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodo);

    expect(component.todo).toEqual(mockTodo);
    expect(component.todoReceived).toBeTrue();
    expect(component.todoNotFound).toBeFalse();
  });

  it('should handle an invalid todo ID', () => {
    activatedRouteStub.snapshot.paramMap.get = () => 'invalid';
    component.ngOnInit();

    expect(component.todoNotFound).toBeTrue();
  });

  it('should set todoNotFound to true when API returns an error', () => {
    spyOn(console, 'log');
    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/1`);
    req.flush('Todo not found', { status: 404, statusText: 'Not Found' });

    expect(component.todoNotFound).toBeTrue();
    expect(console.log).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 404,
      statusText: 'Not Found'
    }));
  });

  it('should navigate back to the todo list when navigateToList() is called', () => {
    component.navigateToList();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/todos');
  });
});
