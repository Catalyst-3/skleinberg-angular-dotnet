import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoListComponent } from './todo-list.component';
import { environment } from '../../environments/environment';
import { Todo } from '../_models/todo';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ListComponent', () => {
  let component: TodoListComponent;
  let httpMock: HttpTestingController;
  let mockActivatedRoute: any;

  beforeEach(() => {
    mockActivatedRoute = {
      queryParams: of({}),
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TodoListComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    const fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.listName).toBe("Your Current todo list");
  });

  it('should fetch todos on initialization', () => {
    const mockTodos: Todo[] = [
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

    expect(component.visibleTodos).toEqual(mockTodos);
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

  it('should filter todos correctly based on the current filter', () => {
    component.allTodos = [
      { id: 1, title: 'Todo 1', isComplete: false, isDeleted: false },
      { id: 2, title: 'Todo 2', isComplete: true, isDeleted: false },
      { id: 3, title: 'Todo 3', isComplete: false, isDeleted: true },
    ] as Todo[];

    component.currentFilter = 'all';
    component.filterTodos();
    expect(component.visibleTodos.length).toBe(2);

    component.currentFilter = 'completed';
    component.filterTodos();
    expect(component.visibleTodos.length).toBe(1);
    expect(component.visibleTodos[0].id).toBe(2);

    component.currentFilter = 'incomplete';
    component.filterTodos();
    expect(component.visibleTodos.length).toBe(1);
    expect(component.visibleTodos[0].id).toBe(1);

    component.currentFilter = 'deleted';
    component.filterTodos();
    expect(component.visibleTodos.length).toBe(1);
    expect(component.visibleTodos[0].id).toBe(3);
  });

  it('should navigate with the selected filter when the dropdown value is changed', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const mockEvent = {
      target: { value: 'completed' }
    } as unknown as Event;

    component.changeFilter(mockEvent);

    expect(routerSpy).toHaveBeenCalledWith(['/todos'], { queryParams: { filter: 'completed' } });
  });

  it('should default to "all" filter if no query parameter is provided', () => {

    mockActivatedRoute.queryParams = of({});

    component.ngOnInit();

    const req = httpMock.expectOne(`${environment.apiUrl}/api/todo`);
    req.flush([]);

    expect(component.currentFilter).toBe('all');
    expect(component.visibleTodos).toEqual([]);
  });

});
