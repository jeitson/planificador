using System;
using Unity;
using Unity.Interception;
using Unity.Interception.ContainerIntegration;
using Unity.Interception.Interceptors.InstanceInterceptors.InterfaceInterception;
using Unity.Lifetime;

using reingenia.Library;
using reingenia.planificador.Interface;
using reingenia.planificador.BusinessLogic.authentication;
using reingenia.planificador.Interface.security;
using reingenia.planificador.BusinessLogic.security;

namespace reingenia.planificador.Application
{
    
    public static class ApplicationInstance
    {

        internal static UnityContainer objUC = null;

        public static UnityContainer ucApplication
        {
            get
            {
                if (objUC == null)
                    objUC = new UnityContainer();
                
                return objUC;
            }
        }

        internal static MemoryCacheExtension memoryCacheExtension = null;

        internal static MemoryCacheExtension MemoryCacheExtension
        {
            get
            {
                if (memoryCacheExtension == null)
                    memoryCacheExtension = new MemoryCacheExtension();
                
                return memoryCacheExtension;
            }
        }

        public static void Start()
        {
            ucApplication.AddNewExtension<Interception>();

            ucApplication.RegisterType<IAuthentication, AuthenticationBL>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            ucApplication.RegisterType<IUserSession, UserSessionBL>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            ucApplication.RegisterType<IUser, UserBL>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IUserAuthentication, UserAuthentication>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IRole, Role>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IRoleAccess, RoleAccess>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IRolePermission, RolePermission>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IPermission, Permission>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<ILdap, Ldap>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<ILdapConfiguration, LdapConfiguration>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IGroup, Group>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IGroupUser, GroupUser>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<IAudit, Audit>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //Container.RegisterType<ILogException, LogException>(new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
            //container.RegisterType<IAuthentication, LdapAuthentication>(Enum.GetName(typeof(AuthenticationProvider), 2), new PerThreadLifetimeManager(), new Interceptor<InterfaceInterceptor>(), new InterceptionBehavior<MethodTrace>());
        }

        public static T SetCache<T>(string key, T value, int minutesOnMemory)
        {
            key = SessionKey<T>(key);

            T obj = (T)MemoryCacheExtension.GetValue(key);
            
            if (obj != null)
                MemoryCacheExtension.Delete(key);

            MemoryCacheExtension.Add(key, value, System.DateTimeOffset.Now.AddMinutes(minutesOnMemory));
            
            return value;
        }

        public static void DeleteCache<T>(string key)
        {
            MemoryCacheExtension.Delete(SessionKey<T>(key));
        }

        public static T GetCache<T>(string key)
        {
            return (T)MemoryCacheExtension.GetValue(SessionKey<T>(key));
        }

        private static string SessionKey<T>(string key)
        {
            return string.Format("{0}.{1}", typeof(T).FullName, key);
        }

    }

}
