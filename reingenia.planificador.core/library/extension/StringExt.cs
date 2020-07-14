using System;
using System.ComponentModel;
using System.Globalization;

namespace reingenia.Library
{

    public static class StringExt
    {

        /// <summary>
        /// Realiza el cast al tipo especificado
        /// </summary>
        /// <typeparam name="TResult">Tipo para el cast</typeparam>
        /// <param name="value">Valor en cadena</param>
        /// <param name="defaultValue">Valor por defecto</param>
        /// <returns>Objeto casteado al tipo requerido</returns>
        public static TResult Parse<TResult>(this string value, TResult defaultValue = default(TResult))
        {
            TResult result = defaultValue;

            if (!string.IsNullOrWhiteSpace(value))
            {
                if (typeof(TResult) == typeof(decimal) || typeof(TResult) == typeof(decimal?))
                    result = (TResult)(object)decimal.Parse(value, NumberStyles.Currency, CultureInfo.InvariantCulture);
                else if (typeof(TResult) == typeof(float) || typeof(TResult) == typeof(float?))
                    result = (TResult)(object)float.Parse(value, CultureInfo.InvariantCulture);
                else if (typeof(TResult) == typeof(double) || typeof(TResult) == typeof(double?))
                    result = (TResult)(object)double.Parse(value, CultureInfo.InvariantCulture);
                else if (typeof(TResult) == typeof(DateTime) || typeof(TResult) == typeof(DateTime?))
                    result = (TResult)(object)DateTime.Parse(value, CultureInfo.InvariantCulture);
                else
                {
                    var converter = TypeDescriptor.GetConverter(typeof(TResult));

                    if (converter != null)
                        result = (TResult)converter.ConvertFromString(value);
                }
            }

            return result;
        }

        /// <summary>
        /// Trunca una cadena de texto
        /// </summary>
        /// <param name="value">Valor de la cadena</param>
        /// <param name="maxLength">Longitud maxima</param>
        /// <returns></returns>
        public static string Truncate(this string value, int maxLength)
        {
            string result = value;

            if (!(string.IsNullOrEmpty(value)))
                result = value.Length <= maxLength ? value : value.Substring(0, maxLength);

            return result;
        }

    }

}
