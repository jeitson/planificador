using System.Data.Entity.ModelConfiguration;
/*
using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Data.mapper.security
{

    internal class GroupMapper : EntityTypeConfiguration<GroupBE>
    {

        public GroupMapper()
        {
            this.ToTable("Group", "security");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.ParentId).HasColumnName("ParentId");
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