using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;

using reingenia.planificador.BusinessEntity;
using reingenia.Library;

namespace reingenia.planificador.Data.access
{

    public abstract class ReadOnlyRepository<TEntityType, TContextType>
        where TEntityType : class
        where TContextType : DbContext
    {

        private readonly IDbContextFactory<TContextType> ContextFactory;

        /// <summary>
        /// Constructor por defecto
        /// </summary>
        protected ReadOnlyRepository(IDbContextFactory<TContextType> contextFactory)
        {
            ContextFactory = contextFactory;
        }

        #region public

        /// <summary>
        /// Busca una entidad por sus claves primarias
        /// </summary>
        /// <param name="keys">Claves primarias (en el mismo order que se especifica en el mapper)</param>
        /// <returns>Entidad que coincide con los parámetros de búsqueda</returns>
        public virtual TEntityType Find(params object[] keys)
        {
            TEntityType record = default(TEntityType);

            try
            {
                using (TContextType context = CreateContext())
                    record = context.Set<TEntityType>().Find(keys);
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Data);
            }

            return record;
        }

        /// <summary>
        /// Búsqueda con expresión lambda
        /// </summary>
        /// <param name="predicate">Expresión lambda de búsqueda sobre la entidad</param>
        /// <returns>IQueryable de la entidad</returns>
        public virtual IQueryable<TEntityType> Search(TContextType context, Expression<Func<TEntityType, bool>> predicate)
        {
            IQueryable<TEntityType> result = null;

            try
            {
                Validator.Validate(predicate);

                result = context.Set<TEntityType>().Where(predicate);
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Data);
            }

            return result;
        }

        /// <summary>
        /// Búsqueda paginada
        /// </summary>
        /// <param name="context">Contexto</param>
        /// <param name="search">Objeto de búsqueda a través de una expresión sobre la entidad </param>
        /// <returns>Listado paginado de la entidad</returns>
        public ListEntity<TEntityType> Search(TContextType context, SearchExpression<TEntityType> search)
        {
            ListEntity<TEntityType> result = null;

            try
            {
                Validator.Validate(search);

                var query = Search(context, search.Expression);

                result = new ListEntity<TEntityType>
                {
                    Count = query.Count(),
                    Data = query.Paginate(search).ToList()
                };
            }
            catch (Exception ex)
            {
                ExceptionHandler.HandleException(ex, PolicyType.Data);
            }

            return result;
        }

        #endregion

        /// <summary>
        /// Constructor del contexto
        /// </summary>
        /// <returns>Contexto</returns>
        protected virtual TContextType CreateContext()
        {
            return ContextFactory.Create();
        }

    }

}
