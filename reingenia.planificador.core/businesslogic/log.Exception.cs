using System;
using System.Collections.Generic;

using reingenia.planificador.Data.access;
using reingenia.planificador.BusinessEntity.log;
using reingenia.planificador.Interface.log;
using reingenia.Library;
using reingenia.planificador.Configuration;

namespace reingenia.planificador.BusinessLogic.log
{
    
    public class ExceptionBL : IException
    {

        internal ExceptionDAO objDAO = null;

        internal ExceptionDAO daoException
        {
            get
            {
                if (objDAO == null)
                    objDAO = new ExceptionDAO();
                
                return objDAO;
            }
        }

        public ExceptionBE Create(ExceptionBE objBE)
        {
            if (string.IsNullOrEmpty(objBE.Name))
                objBE.Name = objBE.Message;

            objBE.Name = StringExt.Truncate(objBE.Name, 100).ToUpper();

            if (!(objBE.UserId.HasValue))
                objBE.UserId = Guid.Parse(Settings.UserAdministratorId);
            
            objBE.Type = StringExt.Truncate(objBE.Type, 50).ToUpper();

            objBE.Class = StringExt.Truncate(objBE.Class, 50).ToUpper();

            objBE.Method = StringExt.Truncate(objBE.Method, 100).ToUpper();

            objBE.Message = StringExt.Truncate(objBE.Message, 2000).ToUpper();

            objBE.Source = StringExt.Truncate(objBE.Source, 2000).ToUpper();            

            if (!(objBE.OwnerId.HasValue))
                objBE.OwnerId = Guid.Parse(Settings.UserAdministratorId);

            if (!(objBE.StatusId.HasValue))
                objBE.StatusId = Guid.Parse(Settings.StatusActiveId);

            if (!(objBE.CreatedById.HasValue))
                objBE.CreatedById = Guid.Parse(Settings.UserAdministratorId);

            if (!(objBE.ModifiedById.HasValue))
                objBE.ModifiedById = Guid.Parse(Settings.UserAdministratorId);

            return daoException.Create(objBE);
        }
        /*
        public ExceptionBE Update(ExceptionBE item)
        {
            return DAO.Update(item);
        }

        public bool Delete(Guid id)
        {
            DAO.Delete(new ExceptionBE() { Id = id });

            return true;
        }

        public ExceptionBE Get(Guid id)
        {
            return DAO.Find(id);
        }

        public List<ExceptionBE> List()
        {
            return DAO.List();
        }
        */
    }
    
}
