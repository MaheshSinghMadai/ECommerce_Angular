using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Core.Interface;
using static Core.Interface.IGenericRepository;
using WebAPI.Helper;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;
using Infrastructure.Identity;
using WebAPI.Extensions;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;
using Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyHeader().AllowAnyOrigin().WithOrigins("http://localhost:4200");
                      });
});

builder.Services.ApplicationServices(builder.Configuration);
builder.Services.AppIdentityServices(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Content")),
    RequestPath = "/Content"
});

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
//var loggerFactory = services.GetRequiredService<ILoggerFactory>();

//seed AppDb data
var context = services.GetRequiredService<ApplicationDbContext>();
await context.Database.MigrateAsync();
await StoreContextSeed.SeedAsync(context);

//Seed Identity Db Data
var userManager = services.GetRequiredService<UserManager<AppUser>>();
var identityContext = services.GetRequiredService<AppIdentityDbContext>();
await identityContext.Database.MigrateAsync();
await AppIdentityDbContextSeed.SeedUserAsync(userManager);

app.Run();
