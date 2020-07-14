using System;
using System.Collections.Generic;
using System.Linq;

using reingenia.planificador.BusinessEntity.log;
using reingenia.planificador.BusinessLogic.log;
using reingenia.planificador.Configuration;

namespace reingenia.Library
{

    public enum PolicyType
    {

        /// <summary>
        /// Acceso a datos
        /// </summary>
        Data,

        /// <summary>
        /// Reglas de negocio
        /// </summary>
        Business,

        /// <summary>
        /// aplicacion
        /// </summary>
        Application,

        /// <summary>
        /// Api
        /// </summary>
        Api

    }

    public static class ExceptionHandler
    {

        /// <summary>
        /// Manejador generico de excepciones que serializar los parámetros de la solicitud
        /// </summary>
        /// <typeparam name="TRequest"></typeparam>
        /// <param name="ex">Excepcion a manejar</param>
        /// <param name="type">Tipo de politica a usar</param>
        /// <param name="request">conjunto de parametros de la solicitud</param>
        public static void HandleException<TRequest>(Exception ex, PolicyType type, params TRequest[] request)
        {
            string policyName = GetPolicyName(type);

            HandleException(ex, policyName, request);
        }

        internal static void HandleException(ExceptionBE log, Exception exception)
        {
            HandleException(log, exception, true);
        }

        /// <summary>
        /// Manejador generico de excepciones que serializar los parámetros de la solicitud
        /// </summary>
        /// <typeparam name="TRequest"></typeparam>
        /// <param name="ex">Excepcion a manejar</param>
        /// <param name="policyName">Nombre de la politica a usar</param>
        /// <param name="request">conjunto de parametros de la solicitud</param>
        public static void HandleException<TRequest>(Exception ex, string policyName, params TRequest[] request)
        {
            if (request != null && request.Any() && !ex.Data.Contains("request"))
                ex.Data.Add("request", JsonSerializer.Serialize(request));

            HandleException(ex, policyName);
        }

        /// <summary>
        /// Manejador generico de excepciones
        /// </summary>
        /// <param name="ex">Excepcion a manejar</param>
        /// <param name="type">Tipo de politica a usar</param>
        /// <param name="propagate">Indica si en una politica de propagacion se debe realizar la propagacion</param>
        public static void HandleException(Exception ex, PolicyType type, bool propagate = true)
        {
            string policyName = GetPolicyName(type);

            HandleException(ex, policyName, propagate);
        }

        /// <summary>
        /// Manejador generico de excepciones
        /// </summary>
        /// <param name="ex">Excepcion a manejar</param>
        /// <param name="policyName">Nombre de la politica a usar</param>
        private static void HandleException(Exception ex, string policyName, bool propagate = true)
        {
            // register in database
            ExceptionBL errorModule = new ExceptionBL();

            errorModule.Create(new ExceptionBE()
            {
                Type = policyName,
                Class = "Custom",
                Method = "Custom",
                Message = GetMessage(ex),
                Source = ex.Source,
                Stack = ex.StackTrace,
            });

            if (policyName == PolicyName.Business || policyName == PolicyName.Data)
            {
                if (propagate)
                    throw ex;
            }
        }

        public static void HandleException(ExceptionBE log, Exception ex, bool propagate = true)
        {
            // register in database
            ExceptionBL errorModule = new ExceptionBL();
            log.Message = GetMessage(ex);
            log.Type = PolicyName.ResolvePolicy(log.Class);

            errorModule.Create(log);

            if (log.Type == PolicyName.Business || log.Type == PolicyName.Data)
            {
                if (propagate)
                    throw ex;
            }
        }

        /// <summary>
        /// Obtiene el nombre de una politica de control de excepciones a partir del enumerador
        /// </summary>
        /// <param name="type">Tipo de politica</param>
        /// <returns>Nombre de la politica</returns>
        private static string GetPolicyName(PolicyType type)
        {
            string policyName = null;

            switch (type)
            {
                case PolicyType.Application:
                    policyName = PolicyName.Application;
                    break;

                case PolicyType.Business:
                    policyName = PolicyName.Business;
                    break;

                case PolicyType.Data:
                    policyName = PolicyName.Data;
                    break;

                case PolicyType.Api:
                    policyName = PolicyName.Api;
                    break;
            }

            return policyName;
        }

        private static string GetMessage(Exception ex)
        {
            var messages = new List<string>();

            do
            {
                messages.Add(string.Format("Message: {0} - Data: {1}", ex.Message, ex.Data));
                ex = ex.InnerException;
            }
            while (ex != null);

            var message = string.Join(" - ", messages);

            return message;
        }

        /// <summary>
        /// Nombres de las politicas del manejador de excepciones
        /// </summary>
        public static class PolicyName
        {

            /// <summary>
            /// Nombre de la politica de aplicacion [ApplicationPolicy]
            /// </summary>
            ///
            public static string Application { get { return "ApplicationPolicy"; } }

            /// <summary>
            /// Nombre de la politica de negocio [BusinessPolicy]
            /// </summary>
            public static string Business { get { return "BusinessPolicy"; } }

            /// <summary>
            /// Nombre de la politica de datos [DataPolicy]
            /// </summary>
            public static string Data { get { return "DataPolicy"; } }

            /// <summary>
            /// Nombre de la politica de API [APIPolicy]
            /// </summary>
            public static string Api { get { return "ApiPolicy"; } }

            internal static string ResolvePolicy(string fullNameClass)
            {
                if (fullNameClass.ToLower().Contains("business") || fullNameClass.ToLower().Contains("interface"))
                    return PolicyName.Business;

                if (fullNameClass.ToLower().Contains("data"))
                    return PolicyName.Data;

                return PolicyName.Application;
            }

        }

    }

}
