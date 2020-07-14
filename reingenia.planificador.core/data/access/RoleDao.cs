using System.Collections.Generic;
using System.Linq;

//using reingenia.planificador.data.context;
//using reingenia.planificador.entity;

//namespace reingenia.planificador.data.access
//{

    //internal class RoleDao : ManagerDao<RoleInfo>
    //{

    //    /// <summary>
    //    /// Obtiene los roles de un usuario por aplicación
    //    /// </summary>
    //    /// <param name="userId">Identificador del usuario</param>
    //    /// <returns></returns>
    //    internal List<RoleInfo> GetByUser(int userId)
    //    {
    //        using (DBContext Context = CreateContext())
    //        {
    //            var query = from roles in IQueryableGetByUser(userId, Context)
    //                        select roles;

    //            return query.ToList();
    //        }
    //    }

    //    private static IQueryable<RoleInfo> IQueryableGetByUser(int userId, DBContext Context)
    //    {
    //        return (from rac in Context.RoleAccess
    //                from g in Context.Group.Where(x => x.Id == rac.GroupId).DefaultIfEmpty()
    //                from gu in Context.GroupUser.Where(x => x.GroupId == g.Id).DefaultIfEmpty()
    //                from r in Context.Role.Where(x => x.Id == rac.RoleId)
    //                where
    //                    (gu.UserId == userId || rac.UserId == userId)
    //                select r).Distinct();
    //    }

    //}

//}
