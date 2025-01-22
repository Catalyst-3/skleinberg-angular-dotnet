using System.ComponentModel.DataAnnotations;

namespace backend;
public class CreateTodoDto
{
    [Required]
    public required string Title {get; set;}
}