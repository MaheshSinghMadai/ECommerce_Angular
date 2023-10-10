
namespace Core.Specifications
{
    public class ProductSpecParam
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public ProductSpecParam()
        {
            this.PageIndex = 1;
            this.PageSize = 50;
        }
        public ProductSpecParam(int pageNumber, int pageSize)
        {
            this.PageIndex = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize > 50 ? 50 : pageSize;
        }
        //private const int MaxPageSize = 50;
        //public int PageIndex { get; set; } = 1;

        //private int _pageSize = 50;
        //public int PageSize
        //{
        //    get => _pageSize;
        //    set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        //}

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}
