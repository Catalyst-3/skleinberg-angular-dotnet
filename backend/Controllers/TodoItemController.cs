using backend.Data;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiController]
[Route("api/[controller]")] // /api/todos
public class TodoController(DataContext context) : ControllerBase
{

    [HttpGet] // /api/todos
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        var todoItems = await context.TodoItems.ToListAsync();

        return todoItems;
    }

    [HttpGet("{id}")] // /api/todos/{id}
    public async Task<ActionResult<TodoItem>> GetTodo(int id)
    {
        var todoItem = await context.TodoItems.FindAsync(id);

        if (todoItem == null) return NotFound();

        return todoItem;
    }

    [HttpPost("create")] // /api/todos/create
    public async Task<ActionResult<TodoItem>> Create(TodoDto TodoDto)
    {
        if(string.IsNullOrWhiteSpace(TodoDto.Title)){
            return BadRequest("Title is required.");
        }
        
        var todo = new TodoItem
        {
            Title = TodoDto.Title
        };


        context.TodoItems.Add(todo);
        await context.SaveChangesAsync();

        return todo;
    }

    [HttpPatch("{id}")] // /api/todos/{id}
    public async Task<IActionResult> Update(int id, TodoDto todoDto)
    {
        var todoItem = await context.TodoItems.FindAsync(id);

        if (todoItem == null) return NotFound();
        todoItem.IsComplete = todoDto.IsComplete;
        todoItem.Updated = DateTime.UtcNow;

        await context.SaveChangesAsync();

        return NoContent();

    }
}