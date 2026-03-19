using System.ComponentModel.DataAnnotations;

namespace Dn_Cam.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}