using System.ComponentModel.DataAnnotations;

namespace Dn_Cam.Configuration.Dto;

public class ChangeUiThemeInput
{
    [Required]
    [StringLength(32)]
    public string Theme { get; set; }
}
