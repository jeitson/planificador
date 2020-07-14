using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;

//using reingenia.planificador.data.context;
//using reingenia.planificador.entity;
//using reingenia.utility;

//namespace reingenia.planificador.Data.access
//{

    ///// <summary>
    /////  Representa la informacion de permisos por usuario
    ///// </summary>
    //internal class ViewPermissionDao : ReadOnlyRepositoryBase<ViewPermissionInfo, DBContext>
    //{

    //    #region constructor

    //    public ViewPermissionDao(IDbContextFactory<DBContext> contextFactory) : base(contextFactory)
    //    { 
        
    //    }

    //    #endregion

    //    public List<PermissionInfo> Search(SearchExpression<ViewPermissionInfo> search)
    //    {
    //        List<PermissionInfo> result = null;

    //        try
    //        {
    //            using (DBContext context = CreateContext())
    //            {
    //                result = Search(context, search.Expression).Select(x => new PermissionInfo
    //                {
    //                    Id = x.Id,
    //                    Name = x.Name,
    //                    IsAudit = x.IsAudit
    //                }).ToList();
    //            }
    //        }
    //        catch (Exception ex)
    //        {
    //            ExceptionHandler.HandleException(ex, PolicyType.Data);
    //        }

    //        return result;
    //    }

    //}

//}
