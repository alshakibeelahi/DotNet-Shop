using DAL.Entities;
using DAL.Interfaces;
using DAL.Repos;
using System;
using System.Collections;
using System.Collections.Generic;

namespace DAL
{
    public class DataAccess
    {
        public static IAuth<bool,string,string> AuthContent()
        {
            return new UserRepo();
        }
        public static IBaseRepo<Token, Token, string, Token> TokenContent()
        {
            return new TokenRepo();
        }
        public static IBaseRepo<User, int, string, User> UserContent()
        {
            return new UserRepo();
        }
        public static ISearchByName<Color, string> ColorByNameContent()
        {
            return new ColorRepo();
        }

        public static ISearchByName<Size, string> SizeByNameContent()
        {
            return new SizeRepo();
        }

        public static IBaseRepo<Color, int, int, Color> ColorContent()
        {
            return new ColorRepo();
        }
        
        public static IBaseRepo<Product, int, int, Product> ProductContent()
        {
            return new ProductRepo();
        }

        public static IBaseRepo<ProductColorSizeMap, int, int, ProductColorSizeMap> ProductColorMapContent()
        {
            return new ProductColorSizeMapRepo();
        }

        public static IGetForeignKeyDetails<List<ProductColorSizeMap>, ProductColorSizeMap, int> ProductColorSizeMapContent()
        {
            return new ProductColorSizeMapRepo();
        }

        public static IBaseRepo<ProductOrderMap, int, int, ProductOrderMap> ProductOrderMapContent()
        {
            return new ProductOrderMapRepo();
        }
        public static IBaseRepo<Size, int, int, Size> SizeContent()
        {
            return new SizeRepo();
        }

        public static IBaseRepo<Category, int, int, Category> CategoryContent()
        {
            return new CategoryRepo();
        }

        public static IBaseRepo<Order, int, int, Order> OrderContent()
        {
            return new OrderRepo();
        }
    }
}
