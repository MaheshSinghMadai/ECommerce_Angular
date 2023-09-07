using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WebAPI.Extensions
{
    public static class IdentityServiceExtension
    {
         public static IServiceCollection AppIdentityServices(this IServiceCollection services,
             IConfiguration config)
        {
            var builder = services.AddIdentityCore<AppUser>();

            services.AddDbContext<AppIdentityDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("IdentityConnection"));
            });

            builder = new IdentityBuilder(builder.UserType, builder.Services);
            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(options =>
            //    {
            //        options.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuerSigningKey = true,
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
            //            ValidIssuer = config["Token:Issuer"],
            //            ValidateIssuer = true,
            //            ValidateAudience = false
            //        };
            //    });

            services.AddAuthentication();

            return services;
        }

    }
}
