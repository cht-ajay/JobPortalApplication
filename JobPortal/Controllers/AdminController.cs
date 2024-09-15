﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobPortalApp.Models; // Adjust according to your namespace

namespace JobPortalApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly RecruitmentDbContext _context;

        public AdminController(RecruitmentDbContext context)
        {
            _context = context;
        }

        [HttpPost("job")]
        public async Task<IActionResult> CreateJob([FromBody] Job job)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the logged-in user's email from the token (JWT)
            var adminEmail = User.Identity?.Name;

            // Check if the user is authenticated and if the email exists
            if (string.IsNullOrEmpty(adminEmail))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            // Fetch the admin user from the database
            var admin = await _context.Users.SingleOrDefaultAsync(u => u.Email == adminEmail);

            // Check if the user is an admin
            if (admin == null || admin.UserType != UserType.Admin)
            {
                return Unauthorized(new { message = "Only admins can post jobs." });
            }

            // Set additional job details
            job.PostedBy = admin;
            job.PostedOn = DateTime.Now;
            job.TotalApplications = 0; // Initial value

            // Add the job to the database (ID will be auto-generated)
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync(); // The auto-generated ID will be assigned after this call

            // Return a JSON response with the created job details, including the generated ID
            return Ok(new
            {
                jobId = job.Id, // Auto-generated ID
                title = job.Title,
                description = job.Description,
                postedOn = job.PostedOn,
                companyName = job.CompanyName,
                postedBy = admin.Email
            });
        }

        // GET: api/admin/job/{job_id}
        [HttpGet("job/{job_id}")]
        public async Task<IActionResult> GetJob(int job_id)
        {
            var job = await _context.Jobs
                .Include(j => j.PostedBy)
                .FirstOrDefaultAsync(j => j.Id == job_id);

            if (job == null)
            {
                return NotFound();
            }

            var applicants = await _context.Applications
                .Where(a => a.JobId == job_id)
                .Include(a => a.Applicant)
                .Select(a => new
                {
                    a.Applicant.Id,
                    a.Applicant.Name,
                    a.Applicant.Email,
                    a.Applicant.ProfileHeadline,
                    a.Applicant.Profile.ResumeFileAddress,
                    a.Applicant.Profile.Skills,
                    a.Applicant.Profile.Education,
                    a.Applicant.Profile.Experience,
                    a.Applicant.Profile.Phone
                })
                .ToListAsync();

            var jobDetails = new
            {
                Job = job,
                Applicants = applicants
            };

            return Ok(jobDetails);
        }

        // GET: api/admin/resumes
        [HttpGet("resumes")]
        public async Task<IActionResult> GetAllResumes()
        {
            var resumes = await _context.Users
                .Where(u => u.UserType == UserType.Applicant)
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.Profile.ResumeFileAddress,
                    u.Profile.Skills,
                    u.Profile.Education,
                    u.Profile.Experience,
                    u.Profile.Phone
                })
                .ToListAsync();

            return Ok(resumes);
        }

        // GET: api/admin/user/{user_id}
        [HttpGet("user/{user_id}")]
        public async Task<IActionResult> GetUserDetails(int user_id)
        {
            var user = await _context.Users
                .Include(u => u.Profile)
                .FirstOrDefaultAsync(u => u.Id == user_id && u.UserType == UserType.Applicant);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                user.Address,
                user.ProfileHeadline,
                user.Profile.ResumeFileAddress,
                user.Profile.Skills,
                user.Profile.Education,
                user.Profile.Experience,
                user.Profile.Phone
            });
        }
    }
}
