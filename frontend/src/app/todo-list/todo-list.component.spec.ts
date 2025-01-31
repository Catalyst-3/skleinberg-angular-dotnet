import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoListComponent } from './todo-list.component';
import { environment } from '../../environments/environment';
import { Todo } from '../_models/todo';

describe('ListComponent', () => {
  let component: TodoListComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import the testing module for HttpClient
        TodoListComponent,          // Import the standalone component
      ],
    });

    const fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.listName).toBe("Your Current todo list");
  });

  it('should fetch todos on initialization', () => {
  const mockTodos: Todo [] = [
        {
          id: 1, title: 'Todo 1',
          created: new Date(2099, 0, 1),
          updated: null,
          isComplete: false,
          isDeleted: false
        },
        {
          id: 2, title: 'Todo 2',
          created: new Date(2099, 0, 1),
          updated: null,
          isComplete: false,
          isDeleted: false
        },
      ];

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos);

    expect(component.todos).toEqual(mockTodos);
  });

  it('should log an error if the API call fails', () => {
    spyOn(console, 'log');
    const errorMsg = 'API call failed';

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo`);
    req.flush(errorMsg, { status: 500, statusText: 'Server Error' });

    expect(console.log).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 500,
      statusText: 'Server Error',
      message: jasmine.stringMatching(/Http failure response for undefined\/api\/todo: 500 Server Error/),
    }));
  });
});
