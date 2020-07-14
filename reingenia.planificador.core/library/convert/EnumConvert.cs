using System;

namespace reingenia.Library
{

    public static class EnumConvert
    {

        public static string GetName<T>(int value)
        {
            string name = null;
            bool isValid = Enum.IsDefined(typeof(T), value);

            if (isValid)
                name = Enum.GetName(typeof(T), value);

            return name;
        }

    }

}
