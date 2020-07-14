using System;
using System.Linq;
using System.Linq.Expressions;

using reingenia.planificador.BusinessEntity;

namespace reingenia.Library
{

    /// <summary>
    /// Extensión para ordenamiento y paginación
    /// </summary>
    public static class IQueryableExt
    {
        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="paginator"></param>
        /// <returns></returns>
        public static IQueryable<T> Paginate<T>(this IQueryable<T> query, Pagination paginator)
        {
            Validator.Validate(paginator);

            var parameter = Expression.Parameter(typeof(T), "p");
            string[] properties = paginator.ColumnOrder.Split('.');
            MemberExpression mex = Expression.Property(parameter, properties[0]);

            for (int i = 1; i < properties.Length; i++)
                mex = Expression.Property(mex, properties[i]);

            var exp = Expression.Lambda(mex, parameter);

            string method = paginator.SortDirection == SortDirection.Asc ? "OrderBy" : "OrderByDescending";

            Type[] types = new Type[] { query.ElementType, exp.Body.Type };
            var mce = Expression.Call(typeof(Queryable), method, types, query.Expression, exp);
            var temp = query.Provider.CreateQuery<T>(mce).Skip(paginator.StartIndex);

            return paginator.PageSize == 0 ? temp : temp.Take(paginator.PageSize);
        }

    }

}
