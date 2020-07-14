using System;

namespace reingenia.Library
{

    /// <summary>
    /// Excepcion de datos
    /// </summary>
    public class DataAccessException : Exception
    {

        /// <summary>
        /// Contructor
        /// </summary>
        /// <param name="code">Codigo de excepcion</param>
        public DataAccessException(CodeEnum code) : base(code.ToString(), null)
        {
            Code = code;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code">Codigo de la excepcion</param>
        /// <param name="innerException">Excepcion interna</param>
        public DataAccessException(CodeEnum code, Exception innerException) : base(code.ToString(), innerException)
        {
            Code = code;
        }

        /// <summary>
        /// Codigos de excepcion
        /// </summary>
        public enum CodeEnum
        {
            /// <summary>
            /// Objeto duplicado Ya existe un objeto igual en la base de datos
            /// </summary>
            DuplicatedObject = 1,

            /// <summary>
            /// Conflictos al borrar la llave foranea
            /// </summary>
            ForeignKeyOnDelete = 2

        }

        #region properties

        /// <summary>
        /// Codigo de excepcion
        /// </summary>
        public CodeEnum Code { get; private set; }

        #endregion

    }

}
