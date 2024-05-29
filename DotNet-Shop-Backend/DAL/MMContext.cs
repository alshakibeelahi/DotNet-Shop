using DAL.Entities;
using System.Data.Entity;

namespace DAL
{
    public class MMContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductColorSizeMap> ProductColorSizeMaps { get; set; }
        public DbSet<ProductOrderMap> ProductOrderMaps { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Token> Tokens { get; set; }
    }
}
