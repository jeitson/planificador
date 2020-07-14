using System;
using System.Web.Script.Serialization;

namespace reingenia.Library
{

    internal class JsonSerializer
    {

        [ThreadStatic]
        private static JavaScriptSerializer instance;

        public static JavaScriptSerializer Instance
        {
            get
            {
                if (instance == null)
                    instance = new JavaScriptSerializer();

                return instance;
            }
        }

        public static T Deserialize<T>(string input)
        {
            return Instance.Deserialize<T>(input);
        }

        public static string Serialize(object input)
        {
            return Instance.Serialize(input);
        }

    }

}
