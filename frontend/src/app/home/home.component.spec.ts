import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { HomeComponent } from './home.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { routes } from '../app.routes';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient()],
      imports: [HomeComponent, TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome message and app-todo-list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Stevens Todo App');
    expect(compiled.querySelector('app-todo-list')).toBeTruthy();
  });

  it('should navigate to /todos/create when Create a Todo button is clicked', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    button?.click();

    await router.navigate(['/todos/create']);
    await fixture.whenStable();
    expect(location.path()).toBe('/todos/create');
  });
});
