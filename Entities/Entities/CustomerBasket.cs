using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }

        public CustomerBasket(String id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<BasketItems> Item { get; set; } = new List<BasketItems>();
    }
}
