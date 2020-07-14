using System;
using System.Collections.Generic;

namespace reingenia.Library
{

    /// <summary>
    ///  Excepción General para las validaciones
    /// </summary>
    public sealed class ExceptionValidation : ArgumentException
    {

        public const string ValidationErrorKey = "ValidationError";

        public ExceptionValidation(List<ValidatorError> validationErrors) : base(ValidationErrorKey)
        {
            if (!(Data.Contains(ValidationErrorKey)))
                Data.Add(ValidationErrorKey, JsonSerializer.Serialize(validationErrors));

            ValidationErrors = validationErrors;
        }

        /// <summary>
        /// Errores de validacion
        /// </summary>
        public List<ValidatorError> ValidationErrors { get; private set; }

    }

    /// <summary>
    /// Representa errores de validación
    /// </summary>
    public class ValidatorError
    {

        /// <summary>
        /// Mensaje de error
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// propiedad que falla la validación
        /// </summary>
        public string Property { get; set; }

    }

}
