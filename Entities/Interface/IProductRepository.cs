using Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interface
{
    public interface IProductRepository
    {
        Task<Product> GetProductIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();

        Task <IReadOnlyList<ProductBrand>> GetProductBrandAsync();

        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}
