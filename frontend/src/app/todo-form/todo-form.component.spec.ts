import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFormComponent } from './todo-form.component';
import { FormsModule } from '@angular/forms';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoFormComponent, FormsModule], // Add the standalone component to imports
    });

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;

    // Spy on console.log
    spyOn(console, 'log');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log the model when createTodo is called', () => {
    component.model.title = 'Test Todo';
    component.createTodo();
    expect(console.log).toHaveBeenCalledWith({ title: 'Test Todo' });
  });

  it('should log "cancel" when cancel is called', () => {
    component.cancel();
    expect(console.log).toHaveBeenCalledWith('cancel');
  });

  it('should render the form correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Create a new Todo');
    expect(compiled.querySelector('input[name="title"]')).toBeTruthy();
    expect(compiled.querySelector('button.btn-success')?.textContent).toContain('Create');
    expect(compiled.querySelector('button.btn-default')?.textContent).toContain('Cancel');
  });
});
