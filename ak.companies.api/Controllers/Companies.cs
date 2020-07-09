using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ak.companies.db;
using ak.companies.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ak.companies.api.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    [Authorize]
    public class Companies : ControllerBase
    {
        private readonly ICompaniesContext context;

        public Companies(ICompaniesContext context) => this.context = context;

        [HttpGet]
        [Route("search")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Company>> GetCompanies(int? id, string isin)
        {
            Company company = null;
            if (id.HasValue)
            {
                company = await context.Companies.FindAsync(id);
            }

            if (company != null) return company;

            if (!String.IsNullOrEmpty(isin))
            {
                company = await context.Companies.FirstOrDefaultAsync(_ => _.Isin == isin);
            }

            if (company != null) return company;

            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await context.Companies.ToListAsync();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PutCompany(int id,
            [Bind("Name", "Isin", "Ticker", "Website")] Company company
            )
        {
            Company original = await context.Companies.FindAsync(id);

            if (original == null)
            {
                return NotFound();
            }

            try
            {
                original.Name = company.Name;
                original.Isin = company.Isin;
                original.Ticker = company.Ticker;
                original.Website = company.Website;

                await context.SaveChangesAsync();
            }
            catch (Exception e) when (e is DbUpdateConcurrencyException || e is DbUpdateException)
            {
                return Conflict();
            }

            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<Company>> PostCompany(
            [Bind("Name", "Isin", "Ticker", "Website")] Company company
            )
        {
            context.Companies.Add(company);

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Conflict();
            }

            return CreatedAtAction("GetCompanies", new { id = company.Id }, company);
        }
    }
}
