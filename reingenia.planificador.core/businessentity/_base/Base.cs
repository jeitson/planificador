using System;

namespace reingenia.planificador.BusinessEntity
{

    public class Base
    {

        public Guid? Id { get; set; }
        
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid? OwnerId { get; set; }

        public Guid? StatusId { get; set; }

        public DateTime? CreatedOn { get; set; }

        public Guid? CreatedById { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public Guid? ModifiedById { get; set; }

    }

}
