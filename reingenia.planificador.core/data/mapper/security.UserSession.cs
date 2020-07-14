using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Data.mapper.security
{

    internal class UserSessionMapper : EntityTypeConfiguration<UserSessionBE>
    {

        public UserSessionMapper()
        {
            this.ToTable("UserSession", "security");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.UserId).HasColumnName("UserId");
            this.Property(x => x.Token).HasColumnName("Token");
            this.Property(x => x.Validity).HasColumnName("Validity");
            this.Property(x => x.Description).HasColumnName("Description");
            this.Property(x => x.OwnerId).HasColumnName("OwnerId");
            this.Property(x => x.StatusId).HasColumnName("StatusId");
            this.Property(x => x.CreatedOn).HasColumnName("CreatedOn");
            this.Property(x => x.CreatedOn).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(x => x.CreatedById).HasColumnName("CreatedById");
            this.Property(x => x.ModifiedOn).HasColumnName("ModifiedOn");
            this.Property(x => x.ModifiedOn).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(x => x.ModifiedById).HasColumnName("ModifiedById");
        }

    }

}
