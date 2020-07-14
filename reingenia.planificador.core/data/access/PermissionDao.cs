using System;
using System.Collections.Generic;
using System.Linq;

//using reingenia.planificador.data.context;
//using reingenia.planificador.entity;
//using reingenia.utility;

//namespace reingenia.planificador.data.access
//{

    //internal class PermissionDao : ManagerDao<PermissionInfo>
    //{

    //    /// <summary>
    //    /// Retorna los permisos para un usuario dado un proyecto y aplicación
    //    /// </summary>
    //    /// <param name="userId"> Identificador del usuario</param>
    //    /// <returns>Listado de permisos</returns>
    //    public List<PermissionInfo> GetByUser(int userId)
    //    {
    //        List<PermissionInfo> permissions = null;

    //        try
    //        {
    //            using (DBContext Context = CreateContext())
    //            {
    //                var query = from v in Context.ViewPermission
    //                            where
    //                              v.UserId == userId
    //                            select v;

    //                permissions = QueryToList(query);
    //            }
    //        }
    //        catch (Exception ex)
    //        {
    //            ExceptionHandler.HandleException(ex, PolicyType.Data);
    //        }

    //        return permissions;
    //    }

    //    private List<PermissionInfo> QueryToList(IQueryable<ViewPermissionInfo> query)
    //    {
    //        List<PermissionInfo> result = new List<PermissionInfo>();
    //        var items = query.ToList();

    //        items.ForEach(x => result.Add(new PermissionInfo()
    //        {
    //            Id = x.Id,
    //            Name = x.Name,
    //            IsAudit = x.IsAudit
    //        }));

    //        return result;
    //    }

    //}

//}
