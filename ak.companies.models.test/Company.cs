using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.ComponentModel.DataAnnotations;
using ak.companies.models;
using System.Collections.Generic;
using System.Linq;

namespace ak.companies.models.test
{
    [TestClass]
    public class CompanyTest
    {
        private bool ValidateCompany(Company company, out ICollection<ValidationResult> result)
        {
            result = new List<ValidationResult>();

            return Validator.TryValidateObject(
                company,
                new ValidationContext(company),
                result,
                true
            );
        }

        private static string validIsin = "AA1234567890";
        private static string validTicker = "AK.12";

        [TestMethod]
        public void AllPopertiesAreInvalid()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company(), out result);

            Assert.AreEqual(3, result.Count);
        }

        [TestMethod]
        public void ValidateMissingName()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Isin = validIsin,
                Ticker = validTicker
            }, out result);

            Assert.AreEqual("The Name field is required.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void ValidateMissingIsin()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = "Company",
                Ticker = validTicker
            }, out result);

            Assert.AreEqual("The Isin field is required.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void ValidateMissingTicker()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = "Company",
                Isin = validIsin
            }, out result);

            Assert.AreEqual("The Ticker field is required.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void ValidateNameLength()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = new string('a', 201),
                Isin = validIsin,
                Ticker = validTicker
            }, out result);

            Assert.AreEqual("Must be less than 200 characters.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void ValidateNameFormat()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = "&@*!@(#",
                Isin = validIsin,
                Ticker = validTicker
            }, out result);

            Assert.AreEqual("Must be alphanumeric.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void ValidateIsinFormat()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = "Company",
                Isin = "INVALID",
                Ticker = validTicker
            }, out result);

            Assert.AreEqual("Must start with two characters and end with 10 digits.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void ValidateTickerFormat()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = "Company",
                Isin = validIsin,
                Ticker = "INVALID"
            }, out result);

            Assert.AreEqual("Must contain only characters and be 1-5 characters long.", result.First().ErrorMessage);

        }

        [TestMethod]
        public void AllPopertiesAreValid()
        {
            ICollection<ValidationResult> result = null;

            ValidateCompany(new Company
            {
                Name = "Company",
                Isin = validIsin,
                Ticker = validTicker
            }, out result);

            Assert.AreEqual(0, result.Count);
        }
    }
}
