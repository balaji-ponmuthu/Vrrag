﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
//using BooksApi.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace WebApplication_aspcore
{
    public class BookService
    {
       
            private readonly IMongoCollection<Book> _books;

            public BookService(IConfiguration config)
            {
                    var client = new MongoClient(config.GetConnectionString("BookstoreDb"));
                    var database = client.GetDatabase("TestDb");
                    _books = database.GetCollection<Book>("Books");
            }

            public List<Book> Get()
            {
                return _books.Find(book => true).ToList();
            }

            public Book Get(string id)
            {
                return _books.Find<Book>(book => book.Id == id).FirstOrDefault();
            }

            public Book Create(Book book)
            {
                _books.InsertOne(book);
                return book;
            }

            public void Update(string id, Book bookIn)
            {
                _books.ReplaceOne(book => book.Id == id, bookIn);
            }

            public void Remove(Book bookIn)
            {
                _books.DeleteOne(book => book.Id == bookIn.Id);
            }

            public void Remove(string id)
            {
                _books.DeleteOne(book => book.Id == id);
            }
        }
    
}
