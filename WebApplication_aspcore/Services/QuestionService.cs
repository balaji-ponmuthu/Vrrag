using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication_aspcore.Models;

namespace WebApplication_aspcore
{
    public class QuestionService
    {
        private readonly IMongoCollection<Question> _questions;
        private readonly IMongoCollection<Answer> _answer;

        public QuestionService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("BookstoreDb"));
            var database = client.GetDatabase("TestDb");
            _questions = database.GetCollection<Question>("Questions");
            _answer = database.GetCollection<Answer>("Answers");
        }

        public Question Create(Question question)
        {
            _questions.InsertOne(question);
            return question;
        }

        public List<Question> Get()
        {
            var quesResult = _questions.Find(ques => true).ToList();//.OrderByDescending(x=> x.CreatedTime);
            return quesResult.OrderByDescending(s => s.CreatedTime).ToList();

        }
        
        public List<Question> GetSelected(string opt)
        {
            return _questions.Find(q => q.category == opt).ToList();
        }

        public Question GetCurrentQues(string id)
        {
            return _questions.Find(q => q.Id == id).FirstOrDefault();
        }

        public Answer CreateAnswer(Answer answer)
        {
            _answer.InsertOne(answer);
            return answer;
        }

        public List<Answer> GetAnswer(string quesId)
        {
            var result = _answer.Find(ans => ans.QuesID.Equals(quesId)).ToList();//.OrderByDescending(x => x.CreatedTime);
            return result.OrderByDescending(x => x.CreatedTime).ToList();
        }
    }
}
