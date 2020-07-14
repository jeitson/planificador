using System;
using System.Linq;
using System.Linq.Expressions;

//using reingenia.planificador.data.context;
//using reingenia.planificador.entity;

//namespace reingenia.planificador.data.access
//{

    //internal class RoleAccessDao : ManagerDao<RoleAccessInfo>
    //{

    //    /// <summary>
    //    /// Remueve los accesos que tenga un usuario
    //    /// </summary>
    //    /// <param name="userId">identificador del usuario</param>
    //    public void DeleteByUser(int userId)
    //    {
    //        using (DBContext Context = CreateContext())
    //        {
    //            var query = Context.RoleAccess.Where(x => x.UserId == userId).ToList();

    //            if (query != null && query.Count > 0)
    //                Delete(query);
    //        }
    //    }

    //    /// <summary>
    //    /// Retorna los accesos que cumplen con el grupo usuario o proyecto
    //    /// </summary>
    //    /// <param name="roleAccess">la relacion de grupo, proyecto y rol</param>
    //    /// <returns>La información de los accesos a traves del role</returns>
    //    public RoleAccessInfo Get(RoleAccessInfo roleAccess)
    //    {
    //        RoleAccessInfo result = null;

    //        using (DBContext Context = CreateContext())
    //        {
    //            Expression<Func<RoleAccessInfo, bool>> lambdaWhere = GetLambdaWhere(roleAccess);

    //            result = Context.RoleAccess.FirstOrDefault(lambdaWhere);
    //        }

    //        return result;
    //    }

    //    /// <summary>
    //    /// Genera una expresion para formar una busqueda
    //    /// </summary>
    //    /// <param name="roleAccess">la relacion de grupo, usuario, proyecto y rol</param>
    //    /// <returns>Expresíon de busqueda</returns>
    //    private static Expression<Func<RoleAccessInfo, bool>> GetLambdaWhere(RoleAccessInfo roleAccess)
    //    {
    //        return x => x.GroupId == roleAccess.GroupId && x.RoleId == roleAccess.RoleId && x.UserId == roleAccess.UserId;
    //    }

    //}

//}
