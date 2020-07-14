using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Unity.Interception.InterceptionBehaviors;
using Unity.Interception.PolicyInjection.Pipeline;

using reingenia.planificador.BusinessEntity.log;
using reingenia.planificador.Configuration;

namespace reingenia.Library
{

    public class MethodTrace : IInterceptionBehavior
    {

        public bool WillExecute { get { return true; } }

        public IMethodReturn Invoke(IMethodInvocation input, GetNextInterceptionBehaviorDelegate getNext)
        {
            // Before invoking the method on the original target.
            this.WriteLog(String.Format("Invoking method {0} at {1}", input.MethodBase, App.getDate().ToLongTimeString()));

            // Invoke the next behavior in the chain.
            var result = getNext()(input, getNext);

            // After invoking the method on the original target.
            if (result.Exception != null)
            {
                ExceptionBE log = new ExceptionBE()
                {
                    Class = input.MethodBase.ReflectedType.FullName,
                    Method = input.MethodBase.Name,
                    Source = result.Exception.Source,
                    Message = result.Exception.Message,
                    Stack = result.Exception.StackTrace,
                };

                ExceptionHandler.HandleException(log, result.Exception);
            }
            else
                this.WriteLog(String.Format("Method {0} returned {1} at {2}", input.MethodBase, result.ReturnValue, App.getDate().ToString()));

            return result;
        }

        public IEnumerable<Type> GetRequiredInterfaces()
        {
            return Enumerable.Empty<Type>();
        }

        private void WriteLog(string message)
        {
            Console.WriteLine("LOG: " + message);
            Trace.WriteLine("LOG: " + message);
        }

    }

}
