import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

describe('App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
      imports: [HomeComponent, TodoListComponent, TodoFormComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation(); // Ensure initial navigation
  });

  it('should navigate to "" (default) and load HomeComponent', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe(''); // Root path remains ""
  });

  it('should navigate to "/" and load HomeComponent', async () => {
    await router.navigate(['/']);
    expect(location.path()).toBe(''); // Root path resolves to ""
  });

  it('should navigate to "/todos" and load TodoListComponent', async () => {
    await router.navigate(['/todos']);
    expect(location.path()).toBe('/todos');
  });

  it('should navigate to "/todos/create" and load TodoFormComponent', async () => {
    await router.navigate(['/todos/create']);
    expect(location.path()).toBe('/todos/create');
  });
});
