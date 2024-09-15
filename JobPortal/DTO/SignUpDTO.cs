using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class SignUpDTO : IValidatableObject
{
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Address is required")]
    public string Address { get; set; }

    public int UserType { get; set; } // 0 for Applicant, 1 for Recruiter

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }

    public string ProfileHeadline { get; set; }

    // Only relevant for Applicants
    public IFormFile? Resume { get; set; }
    public string? Skills { get; set; }
    public string? Education { get; set; }
    public string? Experience { get; set; }
    public string? Phone { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (UserType == 0) // Applicant
        {
            if (Resume == null)
            {
                yield return new ValidationResult("Resume is required for applicants", new[] { nameof(Resume) });
            }
            if (string.IsNullOrWhiteSpace(Skills))
            {
                yield return new ValidationResult("Skills are required for applicants", new[] { nameof(Skills) });
            }
            if (string.IsNullOrWhiteSpace(Education))
            {
                yield return new ValidationResult("Education is required for applicants", new[] { nameof(Education) });
            }
            if (string.IsNullOrWhiteSpace(Experience))
            {
                yield return new ValidationResult("Experience is required for applicants", new[] { nameof(Experience) });
            }
            if (string.IsNullOrWhiteSpace(Phone))
            {
                yield return new ValidationResult("Phone is required for applicants", new[] { nameof(Phone) });
            }
        }
    }
}
