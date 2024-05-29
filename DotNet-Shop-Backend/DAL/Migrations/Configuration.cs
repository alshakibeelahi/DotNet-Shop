namespace DAL.Migrations
{
    using DAL.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DAL.MMContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DAL.MMContext context)
        {
            if (!context.Users.Any(u => u.Username == "admin"))
            {
                context.Users.AddOrUpdate(
                    new User
                    {
                        Name = "Testing Admin",
                        DateOfBirth = new DateTime(1980, 1, 1),
                        BloodGroup = "O+",
                        Password = "hello123",
                        Username = "admin",
                        UserType = "Admin",
                        Email = "admin@example.com",
                        PhoneNo = "01234567890"
                    }
                );

                context.SaveChanges();
            }
        }
    }
}
