using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;
public class TodoDto
{
    [Required]
    public required string Title {get; set;}
}