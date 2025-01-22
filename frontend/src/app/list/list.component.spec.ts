import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { environment } from '../../environments/environment';

describe('ListComponent', () => {
  let component: ListComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Import the testing module for HttpClient
        ListComponent,          // Import the standalone component
      ],
    });

    const fixture = TestBed.createComponent(ListComponent);
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
    const mockTodos = [
      { id: 1, title: 'Test Todo 1' },
      { id: 2, title: 'Test Todo 2' },
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

  it('should log a message when deleteTodo is called', () => {
    spyOn(console, 'log');
    const todoId = 1;

    component.deleteTodo(todoId);

    expect(console.log).toHaveBeenCalledWith(`delete button pressed for todo #${todoId}`);
  });
});
