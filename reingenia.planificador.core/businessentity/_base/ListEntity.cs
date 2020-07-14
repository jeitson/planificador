using System.Collections.Generic;
using System.Runtime.Serialization;

namespace reingenia.planificador.BusinessEntity
{

    /// <summary>
    /// Datos de lista paginadas
    /// </summary>
    /// <typeparam name="T">Tipo de dato que va en listados</typeparam>
    [DataContract]
    public class ListEntity<T>
    {

        /// <summary>
        /// Cantidad Total de elementos que existen
        /// </summary>
        [DataMember(Name = "totalItems")]
        public int Count { get; set; }

        /// <summary>
        /// Los datos que viajan serializados
        /// </summary>
        [DataMember(Name = "content")]
        public List<T> Data { get; set; }

    }

}
