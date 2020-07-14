using System;
using System.Linq.Expressions;

using reingenia.Library;

namespace reingenia.planificador.BusinessEntity
{

    public class SearchExpression<TEntity> : Pagination where TEntity : class
    {

        public SearchExpression()
        {

        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="search"></param>
        public SearchExpression(Pagination search)
        {
            Validator.Validate(search);

            ColumnOrder = search.ColumnOrder;
            SortDirection = search.SortDirection;
            PageSize = search.PageSize;
            StartIndex = search.StartIndex;
        }

        /// <summary>
        /// Expresion lambda para filtrar consultas
        /// </summary>
        [Required]
        public Expression<Func<TEntity, bool>> Expression { get; set; }

    }

}
