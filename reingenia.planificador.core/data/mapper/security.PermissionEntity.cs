using System.Data.Entity.ModelConfiguration;
/*
using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Data.mapper.security
{

    internal class PermissionEntityMapper : EntityTypeConfiguration<PermissionEntityBE>
    {

        public PermissionEntityMapper()
        {
            this.ToTable("PermissionEntity", "security");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.PermissionId).HasColumnName("PermissionId");
            this.Property(x => x.EntityId).HasColumnName("EntityId");
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