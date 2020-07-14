using System;
using System.Runtime.Caching;

namespace reingenia.Library
{

    internal class MemoryCacheExtension
    {

        public object GetValue(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;

            return memoryCache.Get(key);
        }

        public bool Add(string key, object value, DateTimeOffset absExpiration)
        {
            MemoryCache memoryCache = MemoryCache.Default;

            return memoryCache.Add(key, value, absExpiration);
        }

        public void Delete(string key)
        {
            MemoryCache memoryCache = MemoryCache.Default;

            if (memoryCache.Contains(key))
                memoryCache.Remove(key);
        }

    }

}
