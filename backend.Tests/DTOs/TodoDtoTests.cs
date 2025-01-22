using System.ComponentModel.DataAnnotations;
using Xunit;
using backend.DTOs;
using System.Collections.Generic;

namespace backend.Tests.DTOs
{
    public class TodoDtoTests
    {
        [Fact]
        public void TodoDto_Title_Is_Required()
        {
            // Arrange
            var todoDto = new TodoDto
            {
                Title = "" // Simulate missing required field
            };

            // Act
            var context = new ValidationContext(todoDto);
            var validationResults = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(todoDto, context, validationResults, true);

            // Assert
            Assert.False(isValid);
            Assert.Contains(validationResults, v => v.ErrorMessage.Contains("The Title field is required."));
        }
    }
}
