using System;

namespace reingenia.planificador.BusinessEntity.security
{

    public class UserAuthenticationBE : Base
    {

        public Guid? UserId { get; set; }

        public string AccessToken { get; set; }

        public string Password { get; set; }

        public string PasswordSalt { get; set; }

        public DateTime? PasswordChangeDate { get; set; }

        public int? NumberFailPasswordAttempt { get; set; }

        public DateTime? PasswordExpiration { get; set; }

        public bool IsLockedOut { get; set; }

        public DateTime? LastLockedOutDate { get; set; }

        public DateTime? LastChangeRequestDate { get; set; }

    }

}
