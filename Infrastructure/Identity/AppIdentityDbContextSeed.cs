using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> _userManager)
        {
            if(_userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Mahesh",
                    Email = "maheshmadai977@gmail.com",
                    UserName = "Mahesh",
                    Address = new Address
                    {
                        FirstName = "Tokha",
                        LastName = "Dhapasi",
                        Street = "Dhapasi",
                        City = "Kathmandu",
                        State = "Bagmati",
                        ZipCode = "44600"
                    }
                };

                await _userManager.CreateAsync(user, "Zsoxfsq977#@");
            }
        }

    }
}
