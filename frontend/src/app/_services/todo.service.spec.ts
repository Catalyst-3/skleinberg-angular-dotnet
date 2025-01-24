import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no HTTP requests are left outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createTodo with the correct URL and payload', () => {
    const mockTodo = { title: 'Test Todo' };
    service.createTodo(mockTodo).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTodo);

    req.flush({}); // Simulate a successful response
  });

  it('should call getAllTodos with the correct URL', () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1' },
      { id: 2, title: 'Todo 2' },
    ];
    service.getAllTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos); // Simulate a successful response with mock data
  });
});
