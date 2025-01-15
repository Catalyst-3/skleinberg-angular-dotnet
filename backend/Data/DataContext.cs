using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems { get; set; }
}