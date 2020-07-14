using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

using reingenia.planificador.BusinessEntity.log;

namespace reingenia.planificador.Data.mapper.log
{

    internal class ExceptionMapper : EntityTypeConfiguration<ExceptionBE>
    {

        public ExceptionMapper()
        {
            this.ToTable("Exception", "log");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.UserId).HasColumnName("UserId");
            this.Property(x => x.Type).HasColumnName("Type");
            this.Property(x => x.Class).HasColumnName("Class");
            this.Property(x => x.Method).HasColumnName("Method");
            this.Property(x => x.Message).HasColumnName("Message");
            this.Property(x => x.Source).HasColumnName("Source");
            this.Property(x => x.Stack).HasColumnName("Stack");
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
