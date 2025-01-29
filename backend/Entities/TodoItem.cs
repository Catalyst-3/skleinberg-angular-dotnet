namespace backend.Entities;

public class TodoItem
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public bool IsComplete { get; set; }
    public bool IsDeleted { get; set; }

    public TodoItem()
    {
        Created = DateTime.UtcNow;
        IsComplete = false;
        IsDeleted = false;
    }
}