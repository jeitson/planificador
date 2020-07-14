using System;
using System.Collections.Generic;

using reingenia.planificador.BusinessEntity.log;

namespace reingenia.planificador.Interface.log
{

    public interface IException
    {

        ExceptionBE Create(ExceptionBE item);
        /*
        BusinessEntity.log.ExceptionBE Update(BusinessEntity.log.ExceptionBE item);

        bool Delete(Guid id);

        BusinessEntity.log.ExceptionBE Get(Guid id);

        List<BusinessEntity.log.ExceptionBE> List();
        */
    }

}
