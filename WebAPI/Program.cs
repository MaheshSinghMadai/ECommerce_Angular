using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Core.Interface;
using static Core.Interface.IGenericRepository;
using WebAPI.Helper;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
builder.Services.AddAutoMapper(typeof(MappingProfiles));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");
                      });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
    var configuration = ConfigurationOptions.Parse(
        builder.Configuration.GetConnectionString("Redis"), true);
    return ConnectionMultiplexer.Connect(configuration); ;
});


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
app.UseAuthorization();
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
//var loggerFactory = services.GetRequiredService<ILoggerFactory>();
var context = services.GetRequiredService<ApplicationDbContext>(); 
await context.Database.MigrateAsync();
await StoreContextSeed.SeedAsync(context);

app.Run();
