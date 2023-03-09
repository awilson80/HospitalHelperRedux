using backend.Entities;
using Microsoft.EntityFrameworkCore;
using MySql.EntityFrameworkCore.Extensions;
using Microsoft.AspNetCore.Cors;

// var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// builder.Services.AddCors();

/* builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("http://localhost:5118", "https://misite.com").AllowAnyMethod().AllowAnyHeader();
})); */

/* builder.Services.AddCors(options =>
{
   options.AddPolicy(name: MyAllowSpecificOrigins,
                     policy =>
                     {
                         policy.WithOrigins("http://localhost:5118", "https://misite.com");
                     });
}); */


builder.Services.AddControllers();
builder.Services.AddEntityFrameworkMySQL().AddDbContext< HospitaldbcContext >(options => {
    _ = options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{

    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

/*
 * app.UseCors(
       options => options.WithOrigins("http://localhost:5118").AllowAnyMethod()
);
*/

// app.UseHttpsRedirection();

// app.UseCors(MyAllowSpecificOrigins);
// app.UseCors("corsapp");
// app.UseRouting();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
