using Microsoft.VisualStudio.TestTools.UnitTesting;
using ak.companies.api.Controllers;
using ak.companies.db;
using Moq;
using ak.companies.models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MockQueryable.Moq;

namespace ak.companies.api.test
{
    [TestClass]
    public class CompaniesControllerTests
    {
        [TestMethod]
        public async Task GetAllCompanies()
        {
            var companies = new List<Company> {
                new Company {Isin = "isin", Id = 1, Name="Company"}
            };
            var mock = companies.AsQueryable().BuildMockDbSet();
            var mockContext = new Mock<CompaniesContext>();
            mockContext.Setup(_ => _.Companies).Returns(mock.Object);

            var controller = new Companies(mockContext.Object);
            var result = await controller.GetCompanies();

            Assert.AreEqual(1, result.Value.Count());
        }
    }
}
