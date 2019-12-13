using AutoMapper;
using KodYazilim.HotelReservation.CoreMVC.Angular.Data;
using KodYazilim.HotelReservation.CoreMVC.Angular.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KodYazilim.HotelReservation.CoreMVC.Angular {
    public class Startup {

        #region Properties & Fields
        public IConfiguration Configuration { get; }
        #endregion

        #region Constructors
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        } 
        #endregion

        public void ConfigureServices(IServiceCollection services) {
            //services.AddAutoMapper(typeof(Startup));
            #region Automapper Ayarlarý
            var mappingConfig = new MapperConfiguration(mc => {
                mc.AddProfile(new AutoMapperProfiles());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            #endregion

            #region DB Configuration
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            #endregion
            
            services.AddScoped<IAppRepository, AppRepository>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            #region CORS Configuration
            services.AddCors(o => o.AddPolicy("CorsPolicyLocalHost", builder => {
                builder.AllowAnyOrigin();
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
                builder.AllowCredentials();
            }));

            services.AddCors();
            #endregion

            #region Angular Configurations
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "ClientApp/dist";
            }); 
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            #region CORS Settings
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()); 
            #endregion

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            #region Angular Settings
            app.UseSpa(spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            }); 
            #endregion
        }
    }
}
