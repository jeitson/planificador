using System;

namespace reingenia.planificador.BusinessEntity.security
{
    
    public class UserSessionBE : Base
    {

        public Guid? UserId { get; set; }

        public string Token { get; set; }

        public DateTime Validity { get; set; }

    }

}
