using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebApplication_aspcore.Models;
using WebApplication_aspcore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace WebApplication_aspcore.Controllers
{
    [AllowAnonymous]
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        //private UserManager<Login> _userManager;
        public const string SessionUserName = "_Name";
        IConfiguration _config;
        public AuthController(AuthService authService, IConfiguration config)
        {
            _authService = authService;
            _config = config;
        }

        private bool userfound = false;

        [HttpPost, AllowAnonymous]
        public IActionResult Login([FromBody]Login user)
        {
            string tokenString = string.Empty;

            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            else
            {
                userfound = _authService.Get(user.UserName, user.Password);
                //if(!string.IsNullOrEmpty(HttpContext.Session.GetString(SessionUserName)))                

                if (userfound)
                {                    
                    tokenString = CreateJwtToken(user.UserName);
                    return Ok(new { Token = tokenString });
                }
                else
                {
                    return Unauthorized();
                }
            }


            
        }

        [Route("SignUp")]
        [HttpPost, AllowAnonymous]
        public ActionResult SaveSignUpForm([FromBody]SignUp signUp)
        {
            if (signUp == null)
            {
                return BadRequest("Invalid client request");
            }
            else
            {
                _authService.Create(signUp);
                string tokenString = CreateJwtToken(signUp.UserName);
                return Ok(new { Token = tokenString });
            }
            
        }

        public string CreateJwtToken(string userName)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetConnectionString("secretKey")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:4200",
                audience: "http://localhost:4200",
                claims: new List<Claim>() {
                            new Claim("UserName", userName)
                },
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signinCredentials

            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }
    }
}