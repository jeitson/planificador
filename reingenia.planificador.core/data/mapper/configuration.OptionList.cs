using System.Data.Entity.ModelConfiguration;
/*
using reingenia.planificador.BusinessEntity.configuration;

namespace reingenia.planificador.Data.mapper.configuration
{

    internal class OptionListMapper : EntityTypeConfiguration<OptionListBE>
    {

        public OptionListMapper()
        {
            this.ToTable("OptionList", "configuration");

            this.HasKey(x => x.Id);

            this.Property(x => x.Id).HasColumnName("Id");
            this.Property(x => x.Code).HasColumnName("Code");
            this.Property(x => x.Name).HasColumnName("Name");
            this.Property(x => x.Key).HasColumnName("Key");
            this.Property(x => x.ParentId).HasColumnName("ParentId");
            this.Property(x => x.Order).HasColumnName("Order");
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