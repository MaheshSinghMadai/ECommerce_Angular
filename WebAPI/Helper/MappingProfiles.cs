using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using WebAPI.DTO;

namespace WebAPI.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDto, BasketItems>().ReverseMap();
        }
    }
}
