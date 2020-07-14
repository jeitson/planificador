using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;

namespace reingenia.Library
{

    #region attributes

    /// <summary>
    /// Evalúa si la propiedad está definida dentro de una enumeración
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class EnumerationAttribute : ValidationAttribute
    {

        /// <summary>
        /// Implementación de <see cref="ValidationAttribute.GetValidator" />
        /// </summary>
        public override BaseValidator GetValidator()
        {
            return new Enumvalidator(Message);
        }

    }

    /// <summary>
    /// Evalúa si la longitud de una propiedad es menor o igual a una longitud especifica
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLengthAttribute : ValidationAttribute
    {

        /// <summary>
        /// </summary>
        public long MaxLength { get; set; }

        /// <summary>
        /// Implementación de <see cref="ValidationAttribute.GetValidator" />
        /// </summary>
        public override BaseValidator GetValidator()
        {
            return new MaxLengthValidator(Message, MaxLength);
        }

    }

    /// <summary>
    /// Evalúa una expresión regular
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class RegularExpressionAttribute : ValidationAttribute
    {

        /// <summary>
        /// Expresión regular que se debe evaluar
        /// </summary>
        public string Expression { get; set; }

        /// <summary>
        ///  Implementación de <see cref="ValidationAttribute.GetValidator" />
        /// </summary>
        public override BaseValidator GetValidator()
        {
            return new RegularExpressionValidator(Message, Expression);
        }

    }

    /// <summary>
    /// Evalúa que la propiedad no este nula o vacía
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class RequiredAttribute : ValidationAttribute
    {
        
        /// <summary>
        /// Implementación de <see cref="ValidationAttribute.GetValidator" />
        /// </summary>
        public override BaseValidator GetValidator()
        {
            return new RequiredFieldValidator(Message);
        }

    }

    /// <summary>
    /// Clase Base para la implementación de atributos de validación personalizados
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public abstract class ValidationAttribute : Attribute
    {

        /// <summary>
        /// Mensaje que se muestra si no se cumple con el evaluador
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Especifica la implementacion para la obtencion de el Validador puntual de cada atributo
        /// </summary>
        /// <returns>Validador</returns>
        public abstract BaseValidator GetValidator();

    }

    #endregion

    #region validators

    /// <summary>
    /// Proporciona la base para la implementación de clases para la validación de propiedades en objetos
    /// </summary>
    public abstract class BaseValidator
    {

        #region constructor

        /// <summary>
        /// Constructor por defecto
        /// </summary>
        /// <param name="message">Mensaje que se muestra si no se cumple con el evaluador</param>
        protected BaseValidator(string message)
        {
            Message = message;
        }

        #endregion

        #region properties

        /// <summary>
        ///     Mensaje que se muestra si no se cumple con el evaluador
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        ///     Valor del objeto que se va a evaluar almacenado como cadena
        /// </summary>
        internal string TextValue { get; set; }

        #endregion

        #region methods

        /// <summary>
        /// Se debe implementar el escenario de validación
        /// </summary>
        /// <param name="value">Objeto que debe ser evaluado </param>
        /// <returns>Especifica si el objeto enviado cumple o no con la validación establecida</returns>
        public abstract bool Validate(object value);

        /// <summary>
        /// Permite obtener el valor como cadena del objeto que se evalua
        /// </summary>
        /// <param name="value">Objeto que debe ser representado como cadena</param>
        internal void GetStringValue(object value)
        {
            TextValue = value != null ? value.ToString().Trim() : string.Empty;
        }

        #endregion
    
    }

    /// <summary>
    /// Evalúa un formato correspondiente al de un Correo electrónico
    /// </summary>
    public class EmailValidator : RegularExpressionValidator
    {

        #region properties

        /// <summary>
        /// Expresión regular para correos electrónicos
        /// </summary>
        private const string Expression = @"^[\w\.=-]+@[\w\.-]+\.[\w]";

        #endregion

        #region constructor

        /// <summary>
        /// Especifica de manera personalizada el mensaje si no se cumple con la validación
        /// </summary>
        /// <param name="message">Mensaje que se muestra si no se cumple con el evaluador</param>
        public EmailValidator(string message) : base(!string.IsNullOrEmpty(message) ? message : "Invalid Email", Expression)
        { 
        
        }

        #endregion
    
    }

    /// <summary>
    /// Evalúa si la propiedad está definida dentro de una enumeración
    /// </summary>
    public class Enumvalidator : BaseValidator
    {

        #region constructor

        /// <summary>
        /// Especifica de manera personalizada el mensaje si no se cumple con la validación
        /// </summary>
        /// <param name="message">Mensaje que se muestra si no se cumple con el evaluador</param>
        public Enumvalidator(string message) : base(!string.IsNullOrEmpty(message) ? message : "Is not Defined in Enum")
        { 
        
        }

        #endregion

        /// <summary>
        /// Implementación de <see cref="BaseValidator.Validate" />
        /// </summary>
        public override bool Validate(object value)
        {
            bool isValid = false;

            if (value != null)
                isValid = Enum.IsDefined(value.GetType(), value);
            
            return isValid;
        }

    }

    /// <summary>
    /// Evalúa si la longitud de propiedad  es menor o igual a un valor
    /// </summary>
    public class MaxLengthValidator : BaseValidator
    {

        #region constructor

        /// <summary>
        /// Especifica de manera personalizada el mensaje si no se cumple con la validación
        /// </summary>
        /// <param name="message">Mensaje que se muestra si no se cumple con el evaluador</param>
        /// <param name="maxLength">Longitud maxima de la cadena</param>
        public MaxLengthValidator(string message, long maxLength) : base(!string.IsNullOrEmpty(message) ? message : "Exceeded maximum length")
        {
            MaxLength = maxLength;
        }

        #endregion

        #region properties

        /// <summary>
        /// Longitud maxima de la cadena
        /// </summary>
        private long MaxLength { get; set; }

        #endregion

        /// <summary>
        /// Implementación de <see cref="BaseValidator.Validate" />
        /// </summary>
        public override bool Validate(object value)
        {
            this.GetStringValue(value);

            return TextValue.Length <= MaxLength;
        }

    }

    /// <summary>
    /// Evalua expresiones regulare
    /// </summary>
    public class RegularExpressionValidator : BaseValidator
    {

        #region constructor

        /// <summary>
        /// Especifica de manera personalizada el mensaje si no se cumple con la validación
        /// </summary>
        /// <param name="message">Mensaje que se muestra si no se cumple con el evaluador</param>
        /// <param name="expression">Expresión regular para validar el campo</param>
        public RegularExpressionValidator(string message, string expression) : base(!string.IsNullOrEmpty(message) ? message : "No Match with pattern")
        {
            Expression = expression;
        }

        #endregion

        #region properties

        private string Expression { get; set; }

        #endregion

        /// <summary>
        /// Implementación de <see cref="BaseValidator.Validate" />
        /// </summary>
        public override bool Validate(object value)
        {
            bool isValid = false;

            if (value != null)
            {
                Regex regex = new Regex(Expression);

                isValid = regex.IsMatch(value.ToString());
            }

            return isValid;
        }

    }

    /// <summary>
    /// Evalua si el campo es requerido
    /// </summary>
    public class RequiredFieldValidator : BaseValidator
    {

        #region constructor

        /// <summary>
        /// Especifica de manera personalizada el mensaje si no se cumple con la validación
        /// </summary>
        /// <param name="message">Mensaje que se muestra si no se cumple con el evaluador</param>
        public RequiredFieldValidator(string message) : base(!string.IsNullOrEmpty(message) ? message : "Is required")
        {

        }

        #endregion

        /// <summary>
        /// Implementación de <see cref="BaseValidator.Validate" />
        /// </summary>
        public override bool Validate(object value)
        {
            bool isValid = false;

            if (value != null)
            {
                this.GetStringValue(value);

                isValid = !(string.IsNullOrEmpty(TextValue));
            }

            return isValid;
        }

    }

    #endregion

    #region Validation

    /// <summary>
    /// Permite realizar validaciones sobre las propiedades que tengan Atributos de tipo ValidationAttribute para cualquier entidad o clase
    /// </summary>
    public static class Validator
    {

        /// <summary>
        ///  Evalúa si está definido dentro de una enumeración
        /// </summary>
        /// <typeparam name="T">Tipo de enumeración</typeparam>
        /// <param name="data">Objeto que se debe evaluar</param>
        /// <param name="fieldName">Nombre de la propiedad para el mensaje de error</param>
        public static void EnumDefined<T>(T data, string fieldName) where T : struct
        {
            if (!(Enum.IsDefined(typeof(T), data)))
                throw new IndexOutOfRangeException(fieldName);
        }

        /// <summary>
        /// Evalúa si la cadena  se encuentra nula o vacía, si la validación falla arroja un excepción de tipo
        /// ArgumentException
        /// </summary>
        /// <param name="data">Cadena que se debe evaluar</param>
        /// <param name="fieldName">Nombre de la propiedad para el mensaje de error</param>
        public static void NotEmpty(string data, string fieldName)
        {
            if (string.IsNullOrWhiteSpace(data))
                throw new ArgumentException("", fieldName);
        }

        /// <summary>
        ///  Evalúa si un objeto no se encuentra nulo, si la validación falla arroja un excepción de tipo
        /// </summary>
        /// <param name="data">Objeto que se debe evaluar</param>
        /// <param name="fieldName">Nombre de la propiedad para el mensaje de error</param>
        /// <param name="message"></param>
        public static void NotNull(object data, string fieldName, string message = null)
        {
            if (data == null)
                throw new ArgumentNullException(fieldName, message ?? "Is null");
        }

        /// <summary>
        /// Evalúa si una cadena no viene vacía o con espacios y permite convertirla al tipo que se le especifique
        /// </summary>
        /// <typeparam name="T">Tipo al cual se desea convertir la cadena</typeparam>
        /// <param name="value">Cadena que se debe evaluar</param>
        /// <param name="fieldName">Nombre de la propiedad para el mensaje de error</param>
        /// <returns>Objeto de tipo T</returns>
        public static T Parse<T>(string value, string fieldName)
        {
            T result;

            if (!(string.IsNullOrWhiteSpace(value)))
            {
                try
                {
                    result = value.Parse<T>();
                }
                catch (Exception ex)
                {
                    throw new ArgumentException(ex.Message, fieldName);
                }
            }
            else
                throw new ArgumentException(string.Empty, fieldName);

            return result;
        }

        /// <summary>
        /// Permite convertir una cadena al tipo de enumaeración que se le especifique y evalua si el valor esta definido dentro de la enumaeración
        /// </summary>
        /// <typeparam name="T">Tipo de enumeración</typeparam>
        /// <param name="data">Cadena que se debe evaluar</param>
        /// <param name="fieldName">Nombre de la propiedad para el mensaje de error</param>
        /// <returns>Objeto de tipo T</returns>
        public static T ParseEnum<T>(string data, string fieldName) where T : struct
        {
            var value = default(T);

            if (typeof(T).IsEnum && (!(Enum.TryParse(data, true, out value)) || !(Enum.IsDefined(typeof(T), value))))
                throw new ArgumentException(string.Empty, fieldName);
            
            return value;
        }

        /// <summary>
        /// Evalúa una expresión regular
        /// </summary>
        /// <param name="data">Cadena que se debe evaluar</param>
        /// <param name="expression">Expresión regular que se debe evaluar</param>
        /// <param name="fieldName">Nombre de la propiedad para el mensaje de error</param>
        public static void RegularExpression(string data, string expression, string fieldName)
        {
            Regex regex = new Regex(expression);

            if (regex.IsMatch(data))
                throw new ArgumentException(string.Empty, fieldName);
        }

        /// <summary>
        /// Valida si las propiedades que tengan Atributos de tipo ValidationAttribute
        /// </summary>
        /// <typeparam name="T">Tipo de  Objetp</typeparam>
        /// <param name="entity">Entidad o clase cuyas propiedades tengan  Atributos de tipo ValidationAttribute</param>
        public static void Validate<T>(T entity) where T : class
        {
            PropertyInfo[] properties = entity.GetType().GetProperties();
            List<ValidatorError> validationErrors = new List<ValidatorError>();

            foreach (var property in properties)
            {
                var value = property.GetValue(entity, null);
                var validations = property.GetCustomAttributes<ValidationAttribute>();

                foreach (var validation in validations)
                {
                    var validator = validation.GetValidator();

                    if (!(validator.Validate(value)))
                        validationErrors.Add(new ValidatorError { Message = validator.Message, Property = property.Name });
                }
            }

            if (validationErrors.Any())
                throw new ExceptionValidation(validationErrors);
        }

    }

    #endregion

}
