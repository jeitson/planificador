using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace reingenia.planificador.BusinessEntity
{

    /// <summary>
    /// Tipo de ordenamiento
    /// </summary>
    public enum SortDirection
    {

        /// <summary>
        /// Ordenamiento ascendente
        /// </summary>
        Asc,

        /// <summary>
        /// Ordenamiento descendente
        /// </summary>
        Desc

    }

    /// <summary>
    /// Entidad de paginación
    /// </summary>
    [DataContract]
    public class Pagination
    {

        /// <summary>
        /// Columna por la cual se ordena la busqueda
        /// </summary>
        [Required]
        [DataMember(Name = "orderField")]
        public string ColumnOrder { get; set; }
        
        /// <summary>
        /// Número de items que componen la página
        /// </summary>
        [DataMember(Name = "pageSize")]
        public int PageSize { get; set; }

        /// <summary>
        /// Determina si el ordenamiento es ascendente
        /// </summary>
        [IgnoreDataMember]
        public SortDirection SortDirection { get; set; }

        /// <summary>
        /// Indice donde empieza la busqueda
        /// </summary>
        [DataMember(Name = "pageIndex")]
        public int StartIndex { get; set; }

        /// <summary>
        /// Copia los datos de otro objeto de paginacion
        /// </summary>
        /// <param name="pagination"></param>
        public void Copy(Pagination pagination)
        {
            ColumnOrder = pagination.ColumnOrder;
            PageSize = pagination.PageSize;
            SortDirection = pagination.SortDirection;
            StartIndex = pagination.StartIndex;
        }

    }

}
