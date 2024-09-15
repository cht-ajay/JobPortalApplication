using JobPortalApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]

public class UserController : ControllerBase
{
    private readonly RecruitmentDbContext _context;
    private readonly IConfiguration _configuration;

    public UserController(RecruitmentDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [AllowAnonymous]
    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromForm] SignUpDTO signUpDto)
    {


        if (User.Identity.IsAuthenticated)
        {
            return BadRequest(new { message = "You cannot access the signup endpoint while logged in." });
        }
        // Remove profile fields from validation if the user is not an applicant
        if (signUpDto.UserType == 1) // Recruiter
        {
            signUpDto.Resume = null;
            signUpDto.Skills = null;
            signUpDto.Education = null;
            signUpDto.Experience = null;
            signUpDto.Phone = null;
        }

        if (!ModelState.IsValid)
        {
            // Check if there are any errors in the ModelState
            var errors = ModelState.Values.SelectMany(v => v.Errors)
                                           .Select(e => e.ErrorMessage)
                                           .ToList();
            return BadRequest(new { errors });
        }

        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == signUpDto.Email);

        if (existingUser != null)
        {
            return BadRequest("Email is already taken.");
        }

        // Hash the password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(signUpDto.Password);

        // Create the user entity
        var newUser = new User
        {
            Name = signUpDto.Name,
            Email = signUpDto.Email,
            Address = signUpDto.Address,
            UserType = (UserType)signUpDto.UserType,
            PasswordHash = passwordHash,
            ProfileHeadline = signUpDto.ProfileHeadline
        };

        // If the user is an applicant (UserType == 0), handle resume upload and profile creation
        if (signUpDto.UserType == 0 && signUpDto.Resume != null)
        {
            if (signUpDto.Resume.Length > 0)
            {
                // Save the resume to a folder
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/resumes");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + signUpDto.Resume.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await signUpDto.Resume.CopyToAsync(fileStream);
                }

                // Create the profile and store the resume path
                newUser.Profile = new Profile
                {
                    Skills = signUpDto.Skills,
                    Education = signUpDto.Education,
                    Experience = signUpDto.Experience,
                    Name = signUpDto.Name,
                    Email = signUpDto.Email,
                    Phone = signUpDto.Phone,
                    ResumeFileAddress = "file:///C:/Users/ajayc/Downloads/JobPortalApp/Assignment_SynLabs-master/Assignment_SynLabs/wwwroot/uploads/resumes/" + uniqueFileName,
                };
            }
        }

        // Save the user and profile to the database
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully." });
    }



    // POST: api/User/login
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login login)
    {

        // Check if the user is authenticated
        if (User.Identity.IsAuthenticated)
        {
            return BadRequest(new { message = "You cannot access the signup endpoint while logged in." });
        }
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT Token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.Role, user.UserType.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"], // Ensure the audience is set
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { Token = tokenString });

    }
    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var email = User.Identity.Name; // The user's email from the JWT claims
        var user = await _context.Users
            .Include(u => u.Profile) // Ensure Profile is included
            .FirstOrDefaultAsync(u => u.Email == email); // Retrieve user by email

        if (user == null)
        {
            return NotFound();
        }

        var userProfile = new
        {
            user.Name,
            user.Email,
            user.Address,
            user.ProfileHeadline,
        };

        // Return different data based on UserType
        if (user.UserType == UserType.Applicant)
        {
            return Ok(new
            {
                userProfile.Name,
                userProfile.Email,
                userProfile.Address,
                userProfile.ProfileHeadline,
                user.Profile.Skills,
                user.Profile.Education,
                user.Profile.Experience,
                user.Profile.Phone // Include phone for applicants
            });
        }
        else if (user.UserType == UserType.Admin)
        {
            return Ok(new
            {
                userProfile.Name,
                userProfile.Email,
                userProfile.Address,
                userProfile.ProfileHeadline
                // Admin-specific fields can be included here if needed
            });
        }

        return BadRequest("Invalid user type.");
    }


}
