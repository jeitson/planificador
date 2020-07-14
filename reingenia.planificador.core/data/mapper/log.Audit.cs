using System.Data.Entity.ModelConfiguration;
/*
using reingenia.planificador.BusinessEntity.log;

namespace reingenia.planificador.Data.mapper.log
{

    internal class AuditMapper : EntityTypeConfiguration<AuditBE>
    {

        public AuditMapper()
        {
            this.ToTable("Audit", "log");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.PermissionRoleId).HasColumnName("PermissionRoleId");
            this.Property(x => x.UserId).HasColumnName("UserId");
            this.Property(x => x.Description).HasColumnName("Description");
            this.Property(x => x.OwnerId).HasColumnName("OwnerId");
            this.Property(x => x.StatusId).HasColumnName("StatusId");
            this.Property(x => x.CreatedOn).HasColumnName("CreatedOn");
            this.Property(x => x.CreatedById).HasColumnName("CreatedById");
            this.Property(x => x.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(x => x.ModifiedById).HasColumnName("ModifiedById");
        }

    }

}
*/