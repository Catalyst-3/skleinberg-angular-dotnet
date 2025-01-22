using backend.Controllers;
using backend.Data;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Controllers
{
    public class TodoControllerTests
    {
        private readonly DataContext _context;
        private readonly TodoController _controller;

        public TodoControllerTests()
        {
            // Set up in-memory database
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "TodoTestDb")
                .Options;

            _context = new DataContext(options);
            _controller = new TodoController(_context);

            // Clear existing data
            _context.TodoItems.RemoveRange(_context.TodoItems);
            _context.SaveChanges();

            // Seed the in-memory database
            _context.TodoItems.AddRange(
                new TodoItem { Id = 1, Title = "Test Todo 1" },
                new TodoItem { Id = 2, Title = "Test Todo 2" }
            );
            _context.SaveChanges();
        }
        [Fact]
        public async Task GetTodos_Should_Return_All_Todos()
        {
            // Act
            var result = await _controller.GetTodos();

            // Assert
            var okResult = Assert.IsType<ActionResult<IEnumerable<TodoItem>>>(result);
            var todos = Assert.IsAssignableFrom<IEnumerable<TodoItem>>(okResult.Value);
            Assert.Equal(2, todos.Count());
        }

        [Fact]
        public async Task GetTodo_Should_Return_Specific_Todo()
        {
            // Act
            var result = await _controller.GetTodo(1); // Request ID 1

            // Assert
            var okResult = Assert.IsType<ActionResult<TodoItem>>(result);
            var todo = Assert.IsAssignableFrom<TodoItem>(okResult.Value); // Verify non-null TodoItem
            Assert.Equal("Test Todo 1", todo.Title); // Validate Title
        }


        [Fact]
        public async Task GetTodo_Should_Return_NotFound_For_Invalid_Id()
        {
            // Act
            var result = await _controller.GetTodo(99);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task Create_Should_Add_New_Todo()
        {
            // Arrange
            var newTodo = new TodoDto { Title = "New Test Todo" };

            // Act
            var result = await _controller.Create(newTodo);

            // Assert
            var createdResult = Assert.IsType<ActionResult<TodoItem>>(result);
            var todo = Assert.IsAssignableFrom<TodoItem>(createdResult.Value);
            Assert.Equal("New Test Todo", todo.Title);

            // Verify the item was added to the database
            var todoInDb = _context.TodoItems.FirstOrDefault(t => t.Title == "New Test Todo");
            Assert.NotNull(todoInDb);
        }
    }
}
