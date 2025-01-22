import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { ListComponent } from '../list/list.component';
import { ComponentFixture } from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ListComponent, 
      ],
      providers: [
        provideHttpClient(),
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have createTodoMode as false initially', () => {
    expect(component.createTodoMode).toBeFalse();
  });

  it('should toggle createTodoMode when createTodoModeToggle is called', () => {
    expect(component.createTodoMode).toBeFalse();

    component.createTodoModeToggle();
    expect(component.createTodoMode).toBeTrue();

    component.createTodoModeToggle();
    expect(component.createTodoMode).toBeFalse();
  });

  it('should render the welcome message and app-list when createTodoMode is false', () => {
    component.createTodoMode = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain("Welcome to Stevens Todo App");
    expect(compiled.querySelector('app-list')).toBeTruthy();
    expect(compiled.querySelector('button')?.textContent).toContain('Create a Todo');
  });

  it('should render the form section and cancel button when createTodoMode is true', () => {
    component.createTodoMode = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain("this will be where the form goes");
    expect(compiled.querySelector('button')?.textContent).toContain('cancel');
    expect(compiled.querySelector('app-list')).toBeFalsy();
  });

  it('should toggle createTodoMode when the cancel button is clicked', () => {
    component.createTodoMode = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cancelButton = compiled.querySelector('button');
    cancelButton?.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.createTodoMode).toBeFalse();
    expect(compiled.querySelector('h1')?.textContent).toContain("Welcome to Stevens Todo App");
  });
});
