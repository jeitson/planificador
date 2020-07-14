using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

using reingenia.planificador.Application;

namespace reingenia.planificador.webapi.Security
{

    /// <summary>
    ///
    /// </summary>
    public class JwtAuthentication : Attribute, IAuthenticationFilter
    {

        /// <summary>
        ///
        /// </summary>
        public string Realm { get; set; }

        /// <summary>
        ///
        /// </summary>
        public bool AllowMultiple => false;

        /// <summary>
        ///
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            // checking request header value having required scheme "Bearer" or not.
            if (authorization == null || authorization.Scheme != "Bearer" || string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new AuthFailureResult("JWT Token is Missing", request);
                
                return;
            }

            // Getting Token value from header values.
            var token = authorization.Parameter;
            var principal = await AuthJwtToken(token);

            if (principal == null)
                context.ErrorResult = new AuthFailureResult("Invalid JWT Token", request);
            else
            {
                context.Principal = principal;

                Thread.CurrentPrincipal = principal;
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        protected Task<IPrincipal> AuthJwtToken(string token)
        {
            string id;

            // se valida el token y se obtiene el identificador del usuario
            if (ValidateToken(token, out id))
            {
                Guid userId;

                if (Guid.TryParse(id, out userId))
                    return Task.FromResult<IPrincipal>(new ApplicationController().SetPrincipal(userId, token));
            }

            return Task.FromResult<IPrincipal>(null);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="token"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        private static bool ValidateToken(string token, out string id)
        {
            id = null;

            var simplePrinciple = JwtAuthManager.GetPrincipal(token);

            if (simplePrinciple == null)
                return false;
            
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!(identity.IsAuthenticated))
                return false;

            var idClaim = identity.FindFirst(ClaimTypes.NameIdentifier);
            id = idClaim?.Value;

            if (string.IsNullOrEmpty(id))
                return false;

            return true;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="context"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            Challenge(context);

            return Task.FromResult(0);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="context"></param>
        private void Challenge(HttpAuthenticationChallengeContext context)
        {
            string parameter = null;

            if (!string.IsNullOrEmpty(Realm))
                parameter = "realm=\"" + Realm + "\"";

            context.ChallengeWith("Bearer", parameter);
        }

    }

}
