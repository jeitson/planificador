using System.Linq;

using reingenia.planificador.BusinessEntity.security;
using reingenia.planificador.Data.context;

namespace reingenia.planificador.Data.access
{

    internal class UserDAO : Manager<UserBE>
    {

        //    public ListDataInfo<UserInfo> List(PaginationInfo pagination)
        //    {
        //        ListDataInfo<UserInfo> result = new ListDataInfo<UserInfo>();

        //        using (DBContext Context = CreateContext())
        //        {
        //            var query = Context.User;
        //            result.Count = query.Count();
        //            result.Data = query.Paginate(pagination).ToList();
        //        }

        //        return result;
        //    }

        //    public ListDataInfo<UserInfo> ListByRole(int roleId, PaginationInfo pagination)
        //    {
        //        ListDataInfo<UserInfo> result = new ListDataInfo<UserInfo>();

        //        using (DBContext Context = CreateContext())
        //        {
        //            var usersGroup = from u in Context.User
        //                             join gu in Context.GroupUser on u.Id equals gu.UserId
        //                             join g in Context.Group on gu.GroupId equals g.Id
        //                             join ra in Context.RoleAccess on g.Id equals ra.GroupId
        //                             join r in Context.Role on ra.RoleId equals r.Id
        //                             where r.Id == roleId
        //                             select u;
        //            var userRole = from u in Context.User
        //                           join ra in Context.RoleAccess on u.Id equals ra.UserId
        //                           join r in Context.Role on ra.RoleId equals r.Id
        //                           where r.Id == roleId
        //                           select u;

        //            var query = usersGroup.Union(userRole);

        //            result.Count = query.Count();
        //            result.Data = query.Paginate(pagination).ToList();
        //        }

        //        return result;
        //    }

        //    public ListDataInfo<UserInfo> Search(SearchExpression<UserInfo> search)
        //    {
        //        ListDataInfo<UserInfo> result = new ListDataInfo<UserInfo>();

        //        try
        //        {
        //            using (DBContext Context = CreateContext())
        //            {
        //                var query = Context.User.Where(search.Expression);

        //                result.Count = query.Count();
        //                result.Data = query.Paginate(search).ToList();
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            ExceptionHandler.HandleException(ex, PolicyType.Data);
        //        }

        //        return result;
        //    }

        //    public bool UserInRole(int userId, int groupId)
        //    {
        //        using (DBContext Context = CreateContext())
        //        {
        //            var query = (from u in Context.User.Where(x => x.Id == userId)
        //                         from ug in Context.GroupUser.Where(x => x.UserId == u.Id)
        //                         from g in Context.Group.Where(x => x.Id == ug.GroupId)
        //                         where (g.Id == groupId)
        //                         select g);

        //            return query.Count() > 0;
        //        }
        //    }

        public UserBE GetByUserName(string strUserName)
        {
            using (DBContext Context = CreateContext())
            {
                var query = from u in Context.User
                            where u.UserName == strUserName
                            select u;

                return query.FirstOrDefault();
            }
        }

        //    public UserInfo GetUnique(UserInfo user)
        //    {
        //        using (DBContext context = CreateContext())
        //        {
        //            return context.User.SingleOrDefault(x =>
        //                x.NickName == user.NickName &&
        //                x.LdapId == user.LdapId &&
        //                ((x.GuidLdap == null && user.GuidLdap == null) || x.GuidLdap == user.GuidLdap)
        //            );
        //        }
        //    }

    }

}
