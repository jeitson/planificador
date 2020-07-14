using System;

namespace reingenia.Library
{

    /// <summary>
    /// Enumeraci�n para los mensajes de excepcion en los accesos y permisos
    /// </summary>
    public enum AuthenticationExceptionCode
    {

        /// <summary>
        /// Usuario Inactivo
        /// </summary>
        InactiveUser,

        /// <summary>
        /// Usuario o contrase�a invalida
        /// </summary>
        InvalidUser,

        /// <summary>
        /// Usuario bloqueado
        /// </summary>
        LockedOutUser,

        /// <summary>
        /// Token expirado
        /// </summary>
        TokenExpired,

        /// <summary>
        /// Cambio de contrase�a no permitido
        /// </summary>
        PasswordChangeNotAllowed

    }

    /// <summary>
    /// Excepci�n para el manejo de errores de tipo autenticaci�n Aranda
    /// </summary>
    public class AuthenticationException : Exception
    {

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code">Codigo de la Excepci�n</param>
        public AuthenticationException(AuthenticationExceptionCode code) : this(code, null)
        { 
        
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code">Codigo de la excepcion</param>
        /// <param name="innerException">Excepcion interna</param>
        public AuthenticationException(AuthenticationExceptionCode code, Exception innerException) : base(code.ToString(), innerException)
        {
            Code = code;
        }

        #region properties

        /// <summary>
        /// Codigo de excepcion
        /// </summary>
        public AuthenticationExceptionCode Code { get; private set; }

        #endregion
    
    }

}
