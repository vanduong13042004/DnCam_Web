using Abp.AutoMapper;
using Dn_Cam.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dn_Cam.Brands.DTO
{
    [AutoMapTo(typeof(Brand))]
    public class CreateBrandDto
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public string LogoUrl { get; set; }
    }
}
