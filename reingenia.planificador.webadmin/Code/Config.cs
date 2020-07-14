using System.Configuration;

namespace reingenia.planificador.webadmin
{

    public class Config
    {

        public static string getValue(string strKey)
        {
            try
            {
                string strValue = ConfigurationManager.AppSettings[strKey];

                return Assess.setString(strValue);
            }
            catch
            {
                return "";
            }
        }

    }

}