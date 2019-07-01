using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using WebApplication_aspcore.Models;

namespace WebApplication_aspcore
{
    public class AuthService
    {
        private readonly IMongoCollection<SignUp> _signUp;
        
        public AuthService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("BookstoreDb"));
            var database = client.GetDatabase("TestDb");
            _signUp = database.GetCollection<SignUp>("Users");
        }

        

        public void Create(SignUp signUp)
        {
            _signUp.InsertOne(signUp);
        }

        public bool Get(string usrname, string pswd)
        {            
            var found = _signUp.Find<SignUp>(x => x.UserName == usrname && x.Password == pswd).FirstOrDefault();
            if (found != null)
            {
                return true;
               
            }               

            else
                return false;
        }
    }
}
