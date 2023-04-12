using AutoMapper;
using Core.Model;
using WebAPI.DTO;

namespace WebAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(d => d.ProductBrand))
                .ForMember(d => d.ProductType, o => o.MapFrom(d => d.ProductType));
        }
    }
}
