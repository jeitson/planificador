using System;

namespace reingenia.planificador.BusinessEntity.log
{

    public class ExceptionBE : Base
    {

        public Guid? UserId { get; set; }

        public string Type { get; set; }

        public string Class { get; set; }

        public string Method { get; set; }

        public string Message { get; set; }

        public string Source { get; set; }

        public string Stack { get; set; }

    }

}
