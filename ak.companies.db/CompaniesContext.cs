using ak.companies.models;
using Microsoft.EntityFrameworkCore;

namespace ak.companies.db
{
    public class CompaniesContext : DbContext
    {
        public CompaniesContext(DbContextOptions<CompaniesContext> options) : base(options)
        {
        }

        public CompaniesContext() { }

        public virtual DbSet<Company> Companies { get; set; }
    }
}
