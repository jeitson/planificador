using System;
using System.Security.Permissions;

using reingenia.Library;
using reingenia.planificador.BusinessEntity;
using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Data.access;
using reingenia.planificador.Interface.security;
using reingenia.planificador.Security;


namespace reingenia.planificador.BusinessLogic.security
{
    
    public class UserBL : IUser
    {

        internal UserDAO objDAO = null;

        internal UserDAO daoUser
        {
            get
            {
                if (objDAO == null)
                    objDAO = new UserDAO();
                
                return objDAO;
            }
        }
        /*
        internal UserAuthentication userAuthModule = null;

        internal UserAuthentication UserAuthModule
        {
            get
            {
                if (userAuthModule == null)
                    userAuthModule = new UserAuthentication();
                
                return userAuthModule;
            }
        }

        [PrincipalPermission(SecurityAction.Demand, Role = RoleCode.Administrator)]
        //[PrincipalPermission(SecurityAction.Demand, Role = PermissionsCode.CreateUser)]
        public UserBE Create(UserBE item, string password)
        {
            item.CreatedOn = DateTime.Now;
            item.CreatedBy = Identity.Current.Id;

            Validator.Validate<UserBE>(item);
            
            var user = DAO.Create(item);
            
            if (user != null && user.Id > 0)
            {
                string salt = Encryption.GenerateSalt();

                var auth = new UserAuthenticationInfo()
                {
                    IdUser = user.Id,
                    PasswordSalt = salt,
                    Password = GenerateSecurePassword(password, salt),
                    IsLockedOut = (int)LockedOut.No,
                    NumFailPasswordAttempt = Settings.NumFailPasswordAttempt,
                    PasswordExpiration = DateTime.Now.AddYears(Settings.PasswordExpirationTime)
                };

                UserAuthModule.Create(auth);

                return user;
            }

            return null;
        }

        [PrincipalPermission(SecurityAction.Demand, Role = RoleCode.Administrator)]
        public UserBE Update(UserBE user, string password = null)
        {
            UserBE result = null;

            try
            {
                if (user.builtin)
                    throw new InvalidOperationException("Invalid user");

                UserBE current = DAO.GetUnique(user);

                if (current == null || current.Id == user.Id)
                {
                    UserBE oldUser = DAO.Find(user.Id);

                    // No es posible actualizar a los usuarios builtin o a los importados
                    if (oldUser.builtin || oldUser.GuidLdap != null)
                        throw new InvalidOperationException("The user " + user.NickName + "  can not update");

                    user.ModifiedBy = Identity.Current.Id;
                    user.ModifiedOn = DateTime.Now;

                    result = DAO.Update(user);
                }
                else
                    throw new DataAccessException(DataAccessException.CodeEnum.DuplicatedObject);

                if (!string.IsNullOrEmpty(password))
                {
                    UserAuthenticationInfo Authentication = UserAuthModule.GetByUser(user.Id);
                    Authentication.Password = password;

                    UpdateAuthentication(Authentication, true);
                }
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Business);
            }

            return result;
        }

        [PrincipalPermission(SecurityAction.Demand, Role = RoleCode.Administrator)]
        public void Delete(int id)
        {
            UserBE current = GetWithoutPermission(id);

            if (current != null)
            {
                // TODO: Validación para determinar que no se pueden eliminar los usuarios builtIn porque son usuarios del sistema.
                if (current.builtin || current.Id == 1 || current.Id == 2)
                    throw new InvalidOperationException("The user " + current.NickName + " can not be deleted");
                
                UserAuthModule.Delete(current.Id);
                DAO.Delete(current);
            }
        }
        */
        //[PrincipalPermission(SecurityAction.Demand, Role = RoleCode.Administrator)]
        public UserBE Get(Guid guidId)
        {
            return daoUser.Find(guidId);
        }
        
        public UserBE GetByUserName(string strUserName)
        {
            return daoUser.GetByUserName(strUserName);
        }
        /*
        //[PrincipalPermission(SecurityAction.Demand, Role = RoleCode.Administrator)]
        public ListEntity<UserBE> List(Pagination pagination)
        {
            return DAO.List(pagination);
        }

        //[PrincipalPermission(SecurityAction.Demand, Role = RoleCode.Administrator)]
        public ListEntity<UserBE> ListByRole(int roleId, Pagination pagination)
        {
            return DAO.ListByRole(roleId, pagination);
        }

        public UserBE GetWithoutPermission(int id)
        {
            return DAO.Find(id);
        }

        internal void UpdateAuthentication(UserAuthenticationBE authentication, bool changePassword)
        {
            if (authentication != null && changePassword)
            {
                authentication.PasswordSalt = Encryption.GenerateSalt();
                authentication.Password = GenerateSecurePassword(authentication.Password, authentication.PasswordSalt);
                authentication.PasswordChangeDate = DateTime.Now;
            }

            UserAuthModule.Update(authentication);
        }
        */
        internal static string GenerateSecurePassword(string strPassword, string strPasswordSalt)
        {
            if (!(string.IsNullOrEmpty(strPassword)))
                return Encryption.Hash(strPassword + strPasswordSalt);
            else
                throw new AuthenticationException(AuthenticationExceptionCode.InvalidUser);
        }
        
    }

}
