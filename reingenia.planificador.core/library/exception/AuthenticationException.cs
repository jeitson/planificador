using System;

namespace reingenia.Library
{

    /// <summary>
    /// Enumeración para los mensajes de excepcion en los accesos y permisos
    /// </summary>
    public enum AuthenticationExceptionCode
    {

        /// <summary>
        /// Usuario Inactivo
        /// </summary>
        InactiveUser,

        /// <summary>
        /// Usuario o contraseña invalida
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
        /// Cambio de contraseña no permitido
        /// </summary>
        PasswordChangeNotAllowed

    }

    /// <summary>
    /// Excepción para el manejo de errores de tipo autenticación Aranda
    /// </summary>
    public class AuthenticationException : Exception
    {

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code">Codigo de la Excepción</param>
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
