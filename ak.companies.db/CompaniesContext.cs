using System.Threading;
using System.Threading.Tasks;
using ak.companies.models;
using Microsoft.EntityFrameworkCore;

namespace ak.companies.db
{
  public interface ICompaniesContext
  {
    DbSet<Company> Companies { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
  }

  public class CompaniesContext : DbContext, ICompaniesContext
  {
    public CompaniesContext(DbContextOptions<CompaniesContext> options) : base(options)
    {
    }

    public CompaniesContext() { }

    public virtual DbSet<Company> Companies { get; set; }
  }
}
