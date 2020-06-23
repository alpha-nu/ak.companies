using Microsoft.VisualStudio.TestTools.UnitTesting;
using ak.companies.api.Controllers;
using ak.companies.db;
using Moq;
using ak.companies.models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using MockQueryable.Moq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace ak.companies.api.test
{
    [TestClass]
    public class CompaniesControllerTests
    {
        private Companies controller;
        private Mock<CompaniesContext> mockContext;

        [TestInitialize]
        public void TestSetup()
        {
            var companies = new List<Company> { new Company() };
            mockContext = new Mock<CompaniesContext>();
            var mockCompanyDbSet = companies.AsQueryable().BuildMockDbSet();
            mockContext.Setup(_ => _.Companies).Returns(mockCompanyDbSet.Object);

            controller = new Companies(mockContext.Object);
        }

        [TestMethod]
        public async Task GetAllCompanies()
        {
            var result = await controller.GetCompanies();

            Assert.AreEqual(1, result.Value.Count());
        }

        [TestMethod]
        public async Task Returns409WhenCreatingComapnyWithExistingIsin()
        {
            mockContext
                .Setup(_ => _.SaveChangesAsync(default))
                .ThrowsAsync(new DbUpdateException());

            var response = await controller.PostCompany(new Company());

            Assert.IsInstanceOfType(response.Result, typeof(ConflictResult));
        }

        [TestMethod]
        public async Task Returns201WhenCompanyIsCreated()
        {
            var response = await controller.PostCompany(new Company());

            Assert.IsInstanceOfType(response.Result, typeof(CreatedAtActionResult));
        }

        [TestMethod]
        public async Task Returns404WhenUpdatingACompanyThatDoesNotExist()
        {
            var response = await controller.PutCompany(1, new Company());

            Assert.IsTrue(response is NotFoundResult);
        }

        [TestMethod]
        public async Task Returns201WhenUpdatingACompanySucceeds()
        {
            mockContext
                .Setup(_ => _.Companies.FindAsync(1))
                .ReturnsAsync(new Company());

            var response = await controller.PutCompany(1, new Company());

            Assert.IsTrue(response is NoContentResult);
        }

        [TestMethod]
        public async Task Returns409WhenConcurrencyExceptionOccurs()
        {
            mockContext
                .Setup(_ => _.Companies.FindAsync(1))
                .ReturnsAsync(new Company());

            mockContext
                .Setup(_ => _.SaveChangesAsync(default))
                .ThrowsAsync(new DbUpdateConcurrencyException());

            var response = await controller.PutCompany(1, new Company());

            Assert.IsTrue(response is ConflictResult);
        }

        [TestMethod]
        public async Task SearchCompaniesById()
        {
            mockContext
                .Setup(_ => _.Companies.FindAsync(1))
                .ReturnsAsync(new Company());

            var response = await controller.GetCompanies(1, null);

            Assert.IsInstanceOfType(response.Value, typeof(Company));
        }

        [TestMethod]
        public async Task Returns404SearchReturnNoResults()
        {
            var response = await controller.GetCompanies(1, "UNKNOW ISIN");

            Assert.IsInstanceOfType(response.Result, typeof(NotFoundResult));
        }
    }
}
