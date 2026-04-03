using Dn_Cam.Debugging;

namespace Dn_Cam;

public class Dn_CamConsts
{
    public const string LocalizationSourceName = "Dn_Cam";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = false;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "110e7214d3fd4b8a899dbe6913103762";
}
