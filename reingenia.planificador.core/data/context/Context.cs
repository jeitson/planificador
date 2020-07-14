using System.Data.Entity;

using reingenia.planificador.BusinessEntity.log;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Configuration;
using reingenia.planificador.Data.mapper.log;
using reingenia.planificador.Data.mapper.security;

namespace reingenia.planificador.Data.context
{

    internal class DBContext : DbContext
    {

        public DBContext() : base(Settings.DBConnection)
        {
            
        }

        #region configuration
        /*
        public DbSet<OptionListBE> OptionList { get; set; }

        public DbSet<ParameterBE> Parameter { get; set; }
        */
        #endregion

        #region log
/*
        public DbSet<AuditBE> Audit { get; set; }
*/
        public DbSet<ExceptionBE> Exception { get; set; }

        #endregion

        #region security
        /*
        public DbSet<EntityBE> Entity { get; set; }

        public DbSet<GroupBE> Group { get; set; }

        public DbSet<LevelBE> Level { get; set; }
        
        public DbSet<MenuBE> Menu { get; set; }

        public DbSet<PermissionBE> Permission { get; set; }

        public DbSet<PermissionEntityBE> PermissionEntity { get; set; }

        public DbSet<PermissionRoleBE> PermissionRole { get; set; }

        public DbSet<RoleBE> Role { get; set; }

        public DbSet<RoleUserBE> RoleUser { get; set; }
        */
        public DbSet<UserBE> User { get; set; }

        public DbSet<UserAuthenticationBE> UserAuthentication { get; set; }

        public DbSet<UserSessionBE> UserSession { get; set; }        

        //public DbSet<ViewPermission> ViewPermission { get; set; }

        #endregion        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            /*
            // configuration
            modelBuilder.Configurations.Add(new OptionListMapper());
            modelBuilder.Configurations.Add(new ParameterMapper());

            // log
            modelBuilder.Configurations.Add(new AuditMapper());*/
            modelBuilder.Configurations.Add(new ExceptionMapper());
            /*
            // security
            modelBuilder.Configurations.Add(new EntityMapper());
            modelBuilder.Configurations.Add(new GroupMapper());
            modelBuilder.Configurations.Add(new LevelMapper());
            modelBuilder.Configurations.Add(new MenuMapper());
            modelBuilder.Configurations.Add(new PermissionMapper());
            modelBuilder.Configurations.Add(new PermissionEntityMapper());
            modelBuilder.Configurations.Add(new PermissionRoleMapper());
            modelBuilder.Configurations.Add(new RoleMapper());
            modelBuilder.Configurations.Add(new RoleUserMapper());*/
            modelBuilder.Configurations.Add(new UserMapper());
            modelBuilder.Configurations.Add(new UserAuthenticationMapper());
            modelBuilder.Configurations.Add(new UserSessionMapper());
            //modelBuilder.Configurations.Add(new ViewPermissionMapper());
        }

    }

}
