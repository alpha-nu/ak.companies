using System;
using ak.companies.models;
using Microsoft.EntityFrameworkCore;

namespace ak.companies.db
{
    public class Test{
        public int Id { get; set; }
    }

    public class CompaniesContext : DbContext
    {
        public CompaniesContext(DbContextOptions<CompaniesContext> options) : base(options)
        {
        }
        public DbSet<Company> Companies { get; set; }
    }
}
