using System.Text;
using BaseModelWebApi.Services;
using CustomersManager.Models.Auth;
using CustomersManager.Settings;
using FluentEmail.MailKitSmtp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OniriumBE.Data;
using OniriumBE.Data.Seeders;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.Services;
using Serilog;



Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("System", Serilog.Events.LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Async(a => a.File("Log/log_txt", rollingInterval: RollingInterval.Day))
    .WriteTo.Async(a => a.Console())
    .CreateLogger();
try
{
    Log.Information("Starting application...");
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.Configure<Jwt>(builder.Configuration.GetSection(nameof(Jwt)));
    builder.Services.AddDbContext<ApplicationDbContext>(
       options =>
       {
           options.UseSqlServer(
               builder.Configuration.GetConnectionString("Default"));
       });
    builder.Services.AddFluentEmail(builder.Configuration.GetSection("MailSettings").GetValue<string>("FromDefault"))
    .AddRazorRenderer()
    .AddMailKitSender(new SmtpClientOptions()
    {
        Server = builder.Configuration.GetSection("MailSettings").GetValue<string>("Server"),
        Port = builder.Configuration.GetSection("MailSettings").GetValue<int>("Port"),
        User = builder.Configuration.GetSection("MailSettings").GetValue<string>("User"),
        Password = builder.Configuration.GetSection("MailSettings").GetValue<string>("Password"),
        UseSsl = builder.Configuration.GetSection("MailSettings").GetValue<bool>("UseSsl"),
        RequiresAuthentication = builder.Configuration.GetSection("MailSettings").GetValue<bool>("RequiresAuthentication")
    });
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        options.SignIn.RequireConfirmedAccount =
               builder.Configuration.GetSection("Identity").GetValue<bool>("RequireConfirmedAccount");
        options.Password.RequiredLength =
            builder.Configuration.GetSection("Identity").GetValue<int>("RequiredLength");
        options.Password.RequireDigit =
            builder.Configuration.GetSection("Identity").GetValue<bool>("RequireDigit");
        options.Password.RequireLowercase =
            builder.Configuration.GetSection("Identity").GetValue<bool>("RequireLowercase");
        options.Password.RequireNonAlphanumeric =
            builder.Configuration.GetSection("Identity").GetValue<bool>("RequireNonAlphanumeric");
        builder.Configuration.GetSection("Identity").GetValue<bool>("RequireUppercase");
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
    );
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Issuer"),
                ValidAudience = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Audience"),
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>(nameof(SecurityKey))!))
            };
        });
    builder.Services.AddScoped<ShareServices>();
    builder.Services.AddScoped<AttackSpellsService>();
    builder.Services.AddScoped<AdminService>();
    builder.Services.AddScoped<CampaignService>();
    builder.Services.AddScoped<CharacterServices>();
    builder.Services.AddScoped<ClassService>();
    builder.Services.AddScoped<ItemService>();
    builder.Services.AddScoped<ModService>();
    builder.Services.AddScoped<PlayerServices>();
    builder.Services.AddScoped<ShopService>();
    builder.Services.AddScoped<EmailServices>();
    builder.Services.AddScoped<UserManager<ApplicationUser>>();
    builder.Services.AddScoped<SignInManager<ApplicationUser>>();
    builder.Services.AddScoped<RoleManager<ApplicationRole>>();


    var app = builder.Build();
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await DataSeeder.SeedAllAsync(dbContext);
    }

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "assets")),
        RequestPath = "/assets"
    });

    app.UseCors(x =>
    x.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
    );
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();


    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Error(ex.Message);
}
finally
{
    await Log.CloseAndFlushAsync();
}
