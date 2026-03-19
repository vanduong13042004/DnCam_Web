using Dn_Cam.Models.TokenAuth;
using Dn_Cam.Web.Controllers;
using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace Dn_Cam.Web.Tests.Controllers;

public class HomeController_Tests : Dn_CamWebTestBase
{
    [Fact]
    public async Task Index_Test()
    {
        await AuthenticateAsync(null, new AuthenticateModel
        {
            UserNameOrEmailAddress = "admin",
            Password = "123qwe"
        });

        //Act
        var response = await GetResponseAsStringAsync(
            GetUrl<HomeController>(nameof(HomeController.Index))
        );

        //Assert
        response.ShouldNotBeNullOrEmpty();
    }
}