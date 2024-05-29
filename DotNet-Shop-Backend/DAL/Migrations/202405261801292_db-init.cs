namespace DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbinit : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Bands", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.BandManagers", "BandId", "dbo.Bands");
            DropForeignKey("dbo.BandManagers", "UserId", "dbo.Users");
            DropForeignKey("dbo.Products", "BandId", "dbo.Bands");
            DropForeignKey("dbo.Locations", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Gigs", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.Gigs", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Products", "GigId", "dbo.Gigs");
            DropForeignKey("dbo.Customers", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Orders", "CustomerId", "dbo.Customers");
            DropForeignKey("dbo.Departments", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Designations", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Divisions", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Employees", "DepartmentId", "dbo.Departments");
            DropForeignKey("dbo.Employees", "DesignationId", "dbo.Designations");
            DropForeignKey("dbo.Employees", "DivisionId", "dbo.Divisions");
            DropForeignKey("dbo.Grades", "UpdatedBy", "dbo.Users");
            DropForeignKey("dbo.Employees", "GradeId", "dbo.Grades");
            DropForeignKey("dbo.Employees", "LocationId", "dbo.Locations");
            DropForeignKey("dbo.Employees", "UnitId", "dbo.Units");
            DropForeignKey("dbo.Employees", "UserId", "dbo.Users");
            DropForeignKey("dbo.GigManagers", "GigId", "dbo.Gigs");
            DropForeignKey("dbo.GigManagers", "UserId", "dbo.Users");
            DropForeignKey("dbo.Products", "CategoryId", "dbo.Categories");
            DropIndex("dbo.BandManagers", new[] { "BandId" });
            DropIndex("dbo.BandManagers", new[] { "UserId" });
            DropIndex("dbo.Bands", new[] { "UpdatedBy" });
            DropIndex("dbo.Products", new[] { "CategoryId" });
            DropIndex("dbo.Products", new[] { "BandId" });
            DropIndex("dbo.Products", new[] { "GigId" });
            DropIndex("dbo.Gigs", new[] { "UpdatedBy" });
            DropIndex("dbo.Gigs", new[] { "LocationId" });
            DropIndex("dbo.Locations", new[] { "UpdatedBy" });
            DropIndex("dbo.Orders", new[] { "CustomerId" });
            DropIndex("dbo.Customers", "UniquePhoneNo");
            DropIndex("dbo.Customers", "UniqueEmail");
            DropIndex("dbo.Customers", new[] { "UpdatedBy" });
            DropIndex("dbo.Departments", new[] { "UpdatedBy" });
            DropIndex("dbo.Designations", new[] { "UpdatedBy" });
            DropIndex("dbo.Divisions", new[] { "UpdatedBy" });
            DropIndex("dbo.Employees", new[] { "GradeId" });
            DropIndex("dbo.Employees", new[] { "DesignationId" });
            DropIndex("dbo.Employees", new[] { "UnitId" });
            DropIndex("dbo.Employees", new[] { "DepartmentId" });
            DropIndex("dbo.Employees", new[] { "DivisionId" });
            DropIndex("dbo.Employees", new[] { "LocationId" });
            DropIndex("dbo.Employees", "UniqueNidNo");
            DropIndex("dbo.Employees", "UniqueBrnNo");
            DropIndex("dbo.Employees", "UniquePassportNo");
            DropIndex("dbo.Employees", "UniqueTinNo");
            DropIndex("dbo.Employees", new[] { "UserId" });
            DropIndex("dbo.Grades", new[] { "UpdatedBy" });
            DropIndex("dbo.GigManagers", new[] { "GigId" });
            DropIndex("dbo.GigManagers", new[] { "UserId" });
            RenameColumn(table: "dbo.Products", name: "CategoryId", newName: "Category_Id");
            AlterColumn("dbo.Products", "Category_Id", c => c.Int());
            CreateIndex("dbo.Products", "Category_Id");
            AddForeignKey("dbo.Products", "Category_Id", "dbo.Categories", "Id");
            DropColumn("dbo.Products", "BandId");
            DropColumn("dbo.Products", "GigId");
            DropColumn("dbo.Orders", "CustomerId");
            DropTable("dbo.BandManagers");
            DropTable("dbo.Bands");
            DropTable("dbo.Gigs");
            DropTable("dbo.Locations");
            DropTable("dbo.Customers");
            DropTable("dbo.Departments");
            DropTable("dbo.Designations");
            DropTable("dbo.Divisions");
            DropTable("dbo.Employees");
            DropTable("dbo.Grades");
            DropTable("dbo.GigManagers");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.GigManagers",
                c => new
                    {
                        GigManagerId = c.Int(nullable: false, identity: true),
                        GigId = c.Int(nullable: false),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.GigManagerId);
            
            CreateTable(
                "dbo.Grades",
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
                "dbo.Employees",
                c => new
                    {
                        EmployeeId = c.Int(nullable: false, identity: true),
                        DateOfJoining = c.DateTime(nullable: false),
                        GradeId = c.Int(nullable: false),
                        DesignationId = c.Int(nullable: false),
                        UnitId = c.Int(nullable: false),
                        DepartmentId = c.Int(nullable: false),
                        DivisionId = c.Int(nullable: false),
                        LocationId = c.Int(nullable: false),
                        NidNo = c.String(nullable: false, maxLength: 17),
                        BrnNo = c.String(maxLength: 25),
                        PassportNo = c.String(maxLength: 25),
                        TinNo = c.String(maxLength: 35),
                        FathersName = c.String(nullable: false, maxLength: 150),
                        MothersName = c.String(nullable: false, maxLength: 150),
                        PresentAddress = c.String(nullable: false, maxLength: 250),
                        PermanentAddress = c.String(nullable: false, maxLength: 250),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.EmployeeId);
            
            CreateTable(
                "dbo.Divisions",
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
                "dbo.Designations",
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
                "dbo.Departments",
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
                "dbo.Customers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 70),
                        Address = c.String(maxLength: 150),
                        PhoneNo = c.String(maxLength: 11),
                        Email = c.String(maxLength: 70),
                        IsActive = c.Boolean(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Locations",
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
                "dbo.Gigs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 170),
                        Image = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 128),
                        LocationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Bands",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 70),
                        Image = c.String(),
                        OnboardDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BandManagers",
                c => new
                    {
                        BandManagerId = c.Int(nullable: false, identity: true),
                        BandId = c.Int(nullable: false),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.BandManagerId);
            
            AddColumn("dbo.Orders", "CustomerId", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "GigId", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "BandId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Products", "Category_Id", "dbo.Categories");
            DropIndex("dbo.Products", new[] { "Category_Id" });
            AlterColumn("dbo.Products", "Category_Id", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.Products", name: "Category_Id", newName: "CategoryId");
            CreateIndex("dbo.GigManagers", "UserId");
            CreateIndex("dbo.GigManagers", "GigId");
            CreateIndex("dbo.Grades", "UpdatedBy");
            CreateIndex("dbo.Employees", "UserId");
            CreateIndex("dbo.Employees", "TinNo", unique: true, name: "UniqueTinNo");
            CreateIndex("dbo.Employees", "PassportNo", unique: true, name: "UniquePassportNo");
            CreateIndex("dbo.Employees", "BrnNo", unique: true, name: "UniqueBrnNo");
            CreateIndex("dbo.Employees", "NidNo", unique: true, name: "UniqueNidNo");
            CreateIndex("dbo.Employees", "LocationId");
            CreateIndex("dbo.Employees", "DivisionId");
            CreateIndex("dbo.Employees", "DepartmentId");
            CreateIndex("dbo.Employees", "UnitId");
            CreateIndex("dbo.Employees", "DesignationId");
            CreateIndex("dbo.Employees", "GradeId");
            CreateIndex("dbo.Divisions", "UpdatedBy");
            CreateIndex("dbo.Designations", "UpdatedBy");
            CreateIndex("dbo.Departments", "UpdatedBy");
            CreateIndex("dbo.Customers", "UpdatedBy");
            CreateIndex("dbo.Customers", "Email", unique: true, name: "UniqueEmail");
            CreateIndex("dbo.Customers", "PhoneNo", unique: true, name: "UniquePhoneNo");
            CreateIndex("dbo.Orders", "CustomerId");
            CreateIndex("dbo.Locations", "UpdatedBy");
            CreateIndex("dbo.Gigs", "LocationId");
            CreateIndex("dbo.Gigs", "UpdatedBy");
            CreateIndex("dbo.Products", "GigId");
            CreateIndex("dbo.Products", "BandId");
            CreateIndex("dbo.Products", "CategoryId");
            CreateIndex("dbo.Bands", "UpdatedBy");
            CreateIndex("dbo.BandManagers", "UserId");
            CreateIndex("dbo.BandManagers", "BandId");
            AddForeignKey("dbo.Products", "CategoryId", "dbo.Categories", "Id", cascadeDelete: true);
            AddForeignKey("dbo.GigManagers", "UserId", "dbo.Users", "Username");
            AddForeignKey("dbo.GigManagers", "GigId", "dbo.Gigs", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "UserId", "dbo.Users", "Username", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "UnitId", "dbo.Units", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "LocationId", "dbo.Locations", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "GradeId", "dbo.Grades", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Grades", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Employees", "DivisionId", "dbo.Divisions", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "DesignationId", "dbo.Designations", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Employees", "DepartmentId", "dbo.Departments", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Divisions", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Designations", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Departments", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Orders", "CustomerId", "dbo.Customers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Customers", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Products", "GigId", "dbo.Gigs", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Gigs", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Gigs", "LocationId", "dbo.Locations", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Locations", "UpdatedBy", "dbo.Users", "Username");
            AddForeignKey("dbo.Products", "BandId", "dbo.Bands", "Id", cascadeDelete: true);
            AddForeignKey("dbo.BandManagers", "UserId", "dbo.Users", "Username");
            AddForeignKey("dbo.BandManagers", "BandId", "dbo.Bands", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Bands", "UpdatedBy", "dbo.Users", "Username");
        }
    }
}
