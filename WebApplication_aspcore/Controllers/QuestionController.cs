using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using WebApplication_aspcore.Models;

namespace WebApplication_aspcore.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class QuestionController : ControllerBase
    {
        private readonly QuestionService _questionService;
        private readonly ILogger<QuestionController> _log;


        public QuestionController(QuestionService questionService, ILogger<QuestionController> logger)
        {
            _questionService = questionService;
            _log = logger;
        }

        [Route("PostQuestion")]
        [HttpPost]        
        public ActionResult PostQuestion([FromBody]JObject ques)
        {
            //_log.LogInformation("postques");
            Question question = new Question();
            question.name = User.Claims.First(c => c.Type == "UserName").Value;
            question.ques = ques["ques"].ToString();
            question.category = ques["category"].ToString();
            question.CreatedTime = DateTime.Now;
            _questionService.Create(question);
            return Ok();

        }

        [HttpGet, AllowAnonymous]
        [Route("GetQuestion")]
        public List<Question> GetQuestions()
        {            
            return _questionService.Get();
        }

        [HttpGet, AllowAnonymous]
        [Route("GetSelectedQuestion")]
        public List<Question> GetSelectedQuestion(string option)
        {
            return _questionService.GetSelected(option);
        }

        [HttpGet]
        [Route("GetCurrentQues")]
        public Question GetCurrentQues(string quesID)
        {
            return _questionService.GetCurrentQues(quesID);
        }

        [HttpPost]
        [Route("PostAnswer")]
        public ActionResult PostAnswer([FromBody]JObject ans)
        {
            Answer answer = new Answer();
            answer.UserName = User.Claims.First(c => c.Type == "UserName").Value;
            answer.Ans = ans["answerTxt"].ToString();
            answer.QuesID = Convert.ToString(ans["quesID"]);
            answer.CreatedTime = DateTime.Now;
            _questionService.CreateAnswer(answer);
            return Ok();
        }

        [HttpGet]
        [Route("GetAnswer")]
        public List<Answer> GetAnswer(string quesID)
        {
            return _questionService.GetAnswer(quesID);
        }
    }
}