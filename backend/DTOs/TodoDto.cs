using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;
public class TodoDto
{
    public string? Title { get; set; }
    public DateTime? Updated { get; set; }
    public bool IsComplete { get; set; } = false;

    public bool IsDeleted { get; set; } = false;
}