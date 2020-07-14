using System;

using reingenia.planificador.Configuration;

namespace reingenia.Library
{

    public static class App
    {

        /// <summary>
        /// Trunca una cadena de texto
        /// </summary>
        /// <param name="value">Valor de la cadena</param>
        /// <param name="maxLength">Longitud maxima</param>
        /// <returns></returns>
        public static DateTime getDate()
        {
            return DateTime.UtcNow.AddHours(Settings.TimeDifference);
        }

    }

}
