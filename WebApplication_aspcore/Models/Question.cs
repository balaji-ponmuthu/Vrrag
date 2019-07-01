using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_aspcore.Models
{
    public class Question
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ques { get; set; }

        public string name { get; set; }
        public string category { get; set; }
        public DateTime CreatedTime { get; set; }
    }

    public class Answer
    {
        public ObjectId Id { get; set; }
        public string QuesID { get; set; }
        public string Ans { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
