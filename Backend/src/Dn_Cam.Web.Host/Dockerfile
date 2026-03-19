FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/Dn_Cam.Web.Host/Dn_Cam.Web.Host.csproj", "src/Dn_Cam.Web.Host/"]
COPY ["src/Dn_Cam.Web.Core/Dn_Cam.Web.Core.csproj", "src/Dn_Cam.Web.Core/"]
COPY ["src/Dn_Cam.Application/Dn_Cam.Application.csproj", "src/Dn_Cam.Application/"]
COPY ["src/Dn_Cam.Core/Dn_Cam.Core.csproj", "src/Dn_Cam.Core/"]
COPY ["src/Dn_Cam.EntityFrameworkCore/Dn_Cam.EntityFrameworkCore.csproj", "src/Dn_Cam.EntityFrameworkCore/"]
WORKDIR "/src/src/Dn_Cam.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Dn_Cam.Web.Host", "src/Dn_Cam.Web.Host"]
COPY ["src/Dn_Cam.Web.Core", "src/Dn_Cam.Web.Core"]
COPY ["src/Dn_Cam.Application", "src/Dn_Cam.Application"]
COPY ["src/Dn_Cam.Core", "src/Dn_Cam.Core"]
COPY ["src/Dn_Cam.EntityFrameworkCore", "src/Dn_Cam.EntityFrameworkCore"]
WORKDIR "/src/src/Dn_Cam.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Dn_Cam.Web.Host.dll"]
