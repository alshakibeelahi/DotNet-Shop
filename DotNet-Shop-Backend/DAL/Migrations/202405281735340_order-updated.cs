namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class orderupdated : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductOrderMaps", "ProductId", "dbo.Products");
            DropIndex("dbo.ProductOrderMaps", new[] { "ProductId" });
            RenameColumn(table: "dbo.Orders", name: "UpdatedBy", newName: "UserId");
            RenameIndex(table: "dbo.Orders", name: "IX_UpdatedBy", newName: "IX_UserId");
            AddColumn("dbo.Orders", "OrderStatus", c => c.String());
            AddColumn("dbo.Orders", "PaymentStatus", c => c.String());
            AddColumn("dbo.ProductOrderMaps", "ProductName", c => c.String(nullable: false));
            AddColumn("dbo.ProductOrderMaps", "Size", c => c.String(nullable: false));
            AddColumn("dbo.ProductOrderMaps", "Color", c => c.String(nullable: false));
            AddColumn("dbo.ProductOrderMaps", "Price", c => c.Int(nullable: false));
            AddColumn("dbo.ProductOrderMaps", "OrderedQuantity", c => c.Int(nullable: false));
            AddColumn("dbo.ProductOrderMaps", "CreatedAt", c => c.DateTime(nullable: false));
            DropColumn("dbo.Orders", "Price");
            DropColumn("dbo.Orders", "OrderedQuantity");
            DropColumn("dbo.Orders", "Date");
            DropColumn("dbo.Orders", "UpdatedAt");
            DropColumn("dbo.ProductOrderMaps", "ProductId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductOrderMaps", "ProductId", c => c.Int(nullable: false));
            AddColumn("dbo.Orders", "UpdatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Orders", "Date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Orders", "OrderedQuantity", c => c.Int(nullable: false));
            AddColumn("dbo.Orders", "Price", c => c.Int(nullable: false));
            DropColumn("dbo.ProductOrderMaps", "CreatedAt");
            DropColumn("dbo.ProductOrderMaps", "OrderedQuantity");
            DropColumn("dbo.ProductOrderMaps", "Price");
            DropColumn("dbo.ProductOrderMaps", "Color");
            DropColumn("dbo.ProductOrderMaps", "Size");
            DropColumn("dbo.ProductOrderMaps", "ProductName");
            DropColumn("dbo.Orders", "PaymentStatus");
            DropColumn("dbo.Orders", "OrderStatus");
            RenameIndex(table: "dbo.Orders", name: "IX_UserId", newName: "IX_UpdatedBy");
            RenameColumn(table: "dbo.Orders", name: "UserId", newName: "UpdatedBy");
            CreateIndex("dbo.ProductOrderMaps", "ProductId");
            AddForeignKey("dbo.ProductOrderMaps", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
        }
    }
}
