using System.Reflection;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<IModuleClassService, ModuleClassService>();
builder.Services.AddScoped<INotificationsService, NotificationsService>();
builder.Services.AddScoped<ICourseRegistrationService, CourseRegistrationService>();

builder.Services.AddDbContext<SchoolSystemManagementContext>(e => e.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStrings")));
// Cấu hình JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("EntraId"));
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        BearerFormat = "JWT",
        Scheme = "Bearer",
        Name = "Authorization",
        Description = "JWT Authorziation"
    });

    var openApiReference = new OpenApiReference
    {
        Type = ReferenceType.SecurityScheme,
        Id = "Bearer",
    };
    var securityScheme = new OpenApiSecurityScheme { Reference = openApiReference };
    var requirement = new OpenApiSecurityRequirement
    {
        { securityScheme, new List<string>() }
    };
    config.AddSecurityRequirement(requirement);
});
// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
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

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

