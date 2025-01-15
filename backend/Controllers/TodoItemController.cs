using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;
[ApiController]
[Route("api/[controller]")] // /api/todos
public class TodoController(DataContext context): ControllerBase
{
    
    [HttpGet] // /api/todos
    public async  Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        var todoItems = await context.TodoItems.ToListAsync();

        return todoItems;
    }

     [HttpGet("{id}")] // /api/todo/{2}
    public async  Task<ActionResult<TodoItem>> GetTodo(int id)
    {
        var todoItem = await context.TodoItems.FindAsync(id);

        if (todoItem == null) return NotFound();
        
        return todoItem;
    }
}