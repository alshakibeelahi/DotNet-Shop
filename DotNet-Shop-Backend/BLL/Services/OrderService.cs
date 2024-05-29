using BLL.DTOs;
using DAL.Entities;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class OrderService
    {
        public static List<OrderDTO> GetAll()
        {
            var data = DataAccess.OrderContent().GetAll();
            return Convert(data);
        }
        public static OrderDTO Get(int id)
        {
            var data = DataAccess.OrderContent().GetById(id);
            return Convert(data);
        }
        public static int Add(OrderDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.OrderContent().Insert(data);
        }
        public static int Delete(OrderDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.OrderContent().Delete(data);
        }
        public static int Edit(OrderDTO dto)
        {
            var data = Convert(dto);
            return DataAccess.OrderContent().Update(data);
        }
        static List<Order> Convert(List<OrderDTO> odz)
        {
            var data = new List<Order>();
            foreach (OrderDTO od in odz)
            {
                data.Add(Convert(od));
            }
            return data;
        }

        static Order Convert(OrderDTO order)
        {
            return new Order()
            {
                OrderStatus = order.OrderStatus,
                PaymentStatus = order.PaymentStatus,
                UserId = order.UserId,
            };
        }
        static List<OrderDTO> Convert(List<Order> odz)
        {
            var data = new List<OrderDTO>();
            foreach (Order od in odz)
            {
                data.Add(Convert(od));
            }
            return data;
        }

        static OrderDTO Convert(Order order)
        {
            return new OrderDTO()
            {
                Id = order.Id,
            };
        }
    }
}
