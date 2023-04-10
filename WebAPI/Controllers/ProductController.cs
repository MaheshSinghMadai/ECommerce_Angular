using Core.Interface;
using Core.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IGenericRepository<Product> ProductsRepo;
        private readonly IGenericRepository<ProductBrand> ProductBrandRepo;
        private readonly IGenericRepository<ProductType> ProductTypeRepo;

        public ProductController(IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType> productTypeRepo)
        {
            ProductsRepo = productsRepo;
            ProductBrandRepo = productBrandRepo;
            ProductTypeRepo = productTypeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await ProductsRepo.ListAllAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var products = await ProductsRepo.GetByIdAsync(id);

            return Ok(products);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await ProductBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await ProductTypeRepo.ListAllAsync());
        }
    }
}
