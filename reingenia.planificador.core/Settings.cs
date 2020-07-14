namespace reingenia.planificador.Configuration
{

    internal class Settings
    {

        #region authentication

        /// <summary>
        /// Cantidad de intentos fallidos
        /// </summary>
        public const int NumberFailPasswordAttempt = 5;

        /// <summary>
        /// Tiempo en años
        /// </summary>
        public const int PasswordExpirationTime = 20;

        #endregion

        #region session

        /// <summary>
        /// Duración de la session en minutos
        /// </summary>
        public const int SessionTime = 200;

        #endregion

        #region database

        /// <summary>
        /// Nombre de la cadena de conexion
        /// </summary>
        public const string DBConnection = "planificador";

        /// <summary>
        /// Nombre del esquema de la base de datos
        /// </summary>
        public const string DBSchema = "dbo";

        #endregion

        #region authorization

        public static string AuthorizationBY = "role";

        #endregion

        #region session

        /// <summary>
        /// La diferencia horaria para las fechas en la aplicacion
        /// </summary>
        public const int TimeDifference = -5;

        #endregion

        #region default data

        public const string StatusActiveId = "1888C7C5-31B5-4337-9B3A-6D4568E3F9BC";

        public const string UserAdministratorId = "A7D631A5-E783-4C2D-97C8-35ED8B6AF785";

        #endregion

    }

}
