namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbupdate : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Products", "Category_Id", "dbo.Categories");
            DropForeignKey("dbo.Products", "ProUnitId", "dbo.ProductUnits");
            DropForeignKey("dbo.Products", "UpdatedBy", "dbo.Users");
            DropIndex("dbo.Products", new[] { "UpdatedBy" });
            DropIndex("dbo.Products", new[] { "ProUnitId" });
            DropIndex("dbo.Products", new[] { "Category_Id" });
            DropColumn("dbo.Products", "UpdatedBy");
            DropColumn("dbo.Products", "UpdatedAt");
            DropColumn("dbo.Products", "RevenuePercentage");
            DropColumn("dbo.Products", "ProUnitId");
            DropColumn("dbo.Products", "Category_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "Category_Id", c => c.Int());
            AddColumn("dbo.Products", "ProUnitId", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "RevenuePercentage", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Products", "UpdatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Products", "UpdatedBy", c => c.String(maxLength: 128));
            CreateIndex("dbo.Products", "Category_Id");
            CreateIndex("dbo.Products", "ProUnitId");
            CreateIndex("dbo.Products", "UpdatedBy");
            AddForeignKey("dbo.Products", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Products", "ProUnitId", "dbo.ProductUnits", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Products", "Category_Id", "dbo.Categories", "Id");
        }
    }
}
