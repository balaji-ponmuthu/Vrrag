using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_aspcore.Models
{
    public class Login
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }

    public class SignUp
    {
        public ObjectId Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
