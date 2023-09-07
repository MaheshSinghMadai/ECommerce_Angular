using Core.Entities;
using Microsoft.Extensions.Logging;
using System.Reflection;
using System.Text.Json;


namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext db)
        {
            try
            {
                if (!db.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText(@"../Infrastructure/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    db.ProductBrands.AddRange(brands);
                }

                if (!db.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText(@"../Infrastructure/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    db.ProductTypes.AddRange(types);
                }

                if (!db.Products.Any())
                {
                    var productsData = File.ReadAllText(@"../Infrastructure/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    db.Products.AddRange(products);
                }

                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
