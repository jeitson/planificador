using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;

namespace reingenia.planificador.webadmin
{

    public class Assess
    {

        #region setString

        public static string setString(string strValue)
        {
            if (string.IsNullOrEmpty(strValue))
                return "";

            return strValue.Trim();
        }

        #endregion
        /*
        #region isNotNull

        public static bool isNotNull(string strValue)
        {
            strValue = setString(strValue);

            return !(string.IsNullOrEmpty(strValue));
        }

        #endregion
    */
        #region validate value

        public static string getString(string strValue, List<string> lstError, string strMessage, bool isRequired = false)
        {
            try
            {
                strValue = setString(strValue);

                if (!(string.IsNullOrEmpty(strValue)))
                    return strValue;

                if (isRequired)
                    throw new Exception(strMessage);
            }
            catch (Exception ex)
            {
                lstError.Add(ex.Message);
            }

            return null;
        }

        public static string getStringLower(string strValue, List<string> lstError, string strMessage, bool isRequired = false)
        {
            strValue = getString(strValue, lstError, strMessage, isRequired);

            if (!(string.IsNullOrEmpty(strValue)))
                return strValue.Trim().ToLower();

            return strValue;
        }

        #endregion

    }

}
