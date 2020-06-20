using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ak.companies.models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200, ErrorMessage = "Must be less than 200 characters.")]
        [RegularExpression(@"^[\w\s.]+$", ErrorMessage = "Must be alphanumeric.")]
        [Column(TypeName = "varchar(200)")]
        public string Name { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z-0-9\.]{1,5}$", ErrorMessage = "Must contain only characters and be 1-5 characters long.")]
        [Column(TypeName = "varchar(5)")]
        public string Ticker { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{2}\d{10}$", ErrorMessage = "Must start with two characters and end with 10 digits.")]
        [Column(TypeName = "varchar(12)")]
        public string Isin { get; set; }

        public string Website { get; set; }
    }
}
