//using System.ComponentModel.DataAnnotations.Schema;
//using System.Data.Entity.ModelConfiguration;
//
//using reingenia.planificador.entity;
//
//namespace reingenia.planificador.data.mapper
//{

    //public class ViewPermissionMapper : EntityTypeConfiguration<ViewPermissionInfo>
    //{

    //    /// <summary>
    //    /// Constructor de la clase
    //    /// </summary>
    //    /// <param name="schema">Esquema de la BD</param>
    //    public ViewPermissionMapper(string schema)
    //    {
    //        // Primary Key
    //        HasKey(t => t.Id);

    //        // Properties
    //        Property(t => t.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

    //        // Table & Column Mappings
    //        ToTable("View_Permission", schema);

    //        Property(t => t.Id).HasColumnName("Id");
    //        Property(t => t.Name).HasColumnName("Name");
    //        Property(t => t.Audit).HasColumnName("IsAudit");
    //        Property(t => t.UserId).HasColumnName("UserId");

    //        Ignore(t => t.IsAudit);
    //    }

    //}

//}
