namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PRODUCT_TABLE_UPDATED : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductColorMaps", "ColorId", "dbo.Colors");
            DropForeignKey("dbo.ProductColorMaps", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Colors", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.ProductSizeMaps", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Sizes", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.ProductSizeMaps", "SizeId", "dbo.Sizes");
            DropForeignKey("dbo.ProductUnits", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Units", "UpdatedBy", "dbo.Users");
            DropIndex("dbo.Colors", new[] { "UpdatedBy" });
            DropIndex("dbo.ProductColorMaps", new[] { "ProductId" });
            DropIndex("dbo.ProductColorMaps", new[] { "ColorId" });
            DropIndex("dbo.ProductSizeMaps", new[] { "ProductId" });
            DropIndex("dbo.ProductSizeMaps", new[] { "SizeId" });
            DropIndex("dbo.Sizes", new[] { "UpdatedBy" });
            DropIndex("dbo.ProductUnits", new[] { "UpdatedBy" });
            DropIndex("dbo.Units", new[] { "UpdatedBy" });
            CreateTable(
                "dbo.ProductColorSizeMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        ColorId = c.Int(nullable: false),
                        SizeId = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Colors", t => t.ColorId, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.Sizes", t => t.SizeId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.ColorId)
                .Index(t => t.SizeId);
            
            AlterColumn("dbo.Colors", "Name", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Sizes", "Name", c => c.String(nullable: false, maxLength: 50));
            DropColumn("dbo.Colors", "ColorCode");
            DropColumn("dbo.Colors", "IsActive");
            DropColumn("dbo.Colors", "UpdatedAt");
            DropColumn("dbo.Colors", "UpdatedBy");
            DropColumn("dbo.Products", "Quantity");
            DropColumn("dbo.Sizes", "Measurement");
            DropColumn("dbo.Sizes", "IsActive");
            DropColumn("dbo.Sizes", "UpdatedAt");
            DropColumn("dbo.Sizes", "UpdatedBy");
            DropTable("dbo.ProductColorMaps");
            DropTable("dbo.ProductSizeMaps");
            DropTable("dbo.ProductUnits");
            DropTable("dbo.Units");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Units",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 70),
                        IsActive = c.Boolean(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductUnits",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 70),
                        IsActive = c.Boolean(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductSizeMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        SizeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductColorMaps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        ColorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Sizes", "UpdatedBy", c => c.String(maxLength: 128));
            AddColumn("dbo.Sizes", "UpdatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Sizes", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Sizes", "Measurement", c => c.String(nullable: false, maxLength: 50));
            AddColumn("dbo.Products", "Quantity", c => c.Int(nullable: false));
            AddColumn("dbo.Colors", "UpdatedBy", c => c.String(maxLength: 128));
            AddColumn("dbo.Colors", "UpdatedAt", c => c.DateTime(nullable: false));
            AddColumn("dbo.Colors", "IsActive", c => c.Boolean(nullable: false));
            AddColumn("dbo.Colors", "ColorCode", c => c.String(nullable: false, maxLength: 9));
            DropForeignKey("dbo.ProductColorSizeMaps", "SizeId", "dbo.Sizes");
            DropForeignKey("dbo.ProductColorSizeMaps", "ProductId", "dbo.Products");
            DropForeignKey("dbo.ProductColorSizeMaps", "ColorId", "dbo.Colors");
            DropIndex("dbo.ProductColorSizeMaps", new[] { "SizeId" });
            DropIndex("dbo.ProductColorSizeMaps", new[] { "ColorId" });
            DropIndex("dbo.ProductColorSizeMaps", new[] { "ProductId" });
            AlterColumn("dbo.Sizes", "Name", c => c.String(nullable: false, maxLength: 70));
            AlterColumn("dbo.Colors", "Name", c => c.String(nullable: false, maxLength: 70));
            DropTable("dbo.ProductColorSizeMaps");
            CreateIndex("dbo.Units", "UpdatedBy");
            CreateIndex("dbo.ProductUnits", "UpdatedBy");
            CreateIndex("dbo.Sizes", "UpdatedBy");
            CreateIndex("dbo.ProductSizeMaps", "SizeId");
            CreateIndex("dbo.ProductSizeMaps", "ProductId");
            CreateIndex("dbo.ProductColorMaps", "ColorId");
            CreateIndex("dbo.ProductColorMaps", "ProductId");
            CreateIndex("dbo.Colors", "UpdatedBy");
            AddForeignKey("dbo.Units", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.ProductUnits", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.ProductSizeMaps", "SizeId", "dbo.Sizes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Sizes", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.ProductSizeMaps", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Colors", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.ProductColorMaps", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ProductColorMaps", "ColorId", "dbo.Colors", "Id", cascadeDelete: true);
        }
    }
}
