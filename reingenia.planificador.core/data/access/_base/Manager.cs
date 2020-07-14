using reingenia.planificador.Data.context;

namespace reingenia.planificador.Data.access
{

    internal class Manager<TEntity> : Repository<TEntity, DBContext> where TEntity : class
    {

        /// <summary>
        /// Implementation de <see cref="Repository.CreateContext"/>
        /// </summary>
        protected override DBContext CreateContext()
        {
            return new DBContext();
        }

    }

}
