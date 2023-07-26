using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace WebAPI.Extensions
{
    public static class UserManagerExtension
    {
        public static async Task<AppUser> FindByUserByClaimsPrincipalWithAddressAsync (this UserManager<AppUser> input, ClaimsPrincipal User) 
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrincipal (this UserManager<AppUser> input, ClaimsPrincipal User)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
