using System.Data.Entity.ModelConfiguration;

using reingenia.planificador.BusinessEntity.security;

namespace reingenia.planificador.Data.mapper.security
{

    internal class UserAuthenticationMapper : EntityTypeConfiguration<UserAuthenticationBE>
    {

        public UserAuthenticationMapper()
        {
            this.ToTable("UserAuthentication", "security");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.UserId).HasColumnName("UserId");
            this.Property(x => x.AccessToken).HasColumnName("AccessToken");
            this.Property(x => x.Password).HasColumnName("Password");
            this.Property(x => x.PasswordSalt).HasColumnName("PasswordSalt");
            this.Property(x => x.PasswordChangeDate).HasColumnName("PasswordChangeDate");
            this.Property(x => x.NumberFailPasswordAttempt).HasColumnName("NumberFailPasswordAttempt");
            this.Property(x => x.PasswordExpiration).HasColumnName("PasswordExpiration");
            this.Property(x => x.IsLockedOut).HasColumnName("IsLockedOut");
            this.Property(x => x.LastLockedOutDate).HasColumnName("LastLockedOutDate");
            this.Property(x => x.LastChangeRequestDate).HasColumnName("LastChangeRequestDate");
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
