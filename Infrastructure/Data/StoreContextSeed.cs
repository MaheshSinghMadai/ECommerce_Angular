using Core.Model;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WebAPI.Data;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext db, ILoggerFactory loggerFactory)
        {
            try
            {
                //add product brands data to database
                if (!db.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText("/Infrastructure/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach(var item in brands)
                    {
                        db.ProductBrands.Add(item);
                    }

                    await db.SaveChangesAsync();
                }

                //add product types data to database
                if (!db.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText("./Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    { 
                        db.ProductTypes.Add(item); 
                    }
                    await db.SaveChangesAsync();
                }

                //add product data to database
                if (!db.Products.Any())
                {
                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        db.Products.Add(item);
                    }
                    await db.SaveChangesAsync();
                }

            }
            catch(Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }

        }
    }
}
