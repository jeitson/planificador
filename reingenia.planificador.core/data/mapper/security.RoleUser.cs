using System.Data.Entity.ModelConfiguration;
/*
using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Data.mapper.security
{

    internal class RoleUserMapper : EntityTypeConfiguration<RoleUserBE>
    {

        public RoleUserMapper()
        {
            this.ToTable("RoleUser", "security");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.RoleId).HasColumnName("RoleId");
            this.Property(x => x.GroupId).HasColumnName("GroupId");
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