using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace reingenia.planificador.Data.access
{

    public abstract class Repository<TEntityType, TContextType>
        where TEntityType : class
        where TContextType : DbContext
    {

        #region constructor

        /// <summary>
        /// Constructo de la clase
        /// </summary>
        protected Repository() : base()
        {

        }

        #endregion

        /// <summary>
        /// Crear el contexto
        /// </summary>
        /// <returns></returns>
        protected abstract TContextType CreateContext();
        
        /// <summary>
        /// Crea una entidad en el contexto
        /// </summary>
        /// <param name="record"> Entidad a crear </param>
        /// <returns> Entidad creado </returns>
        public virtual async Task<TEntityType> CreateAsync(TEntityType record)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    await Task.Run(() => context.Entry(record).State = EntityState.Added);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return record;
        }

        /// <summary>
        /// Crea una entidad en el contexto
        /// </summary>
        /// <param name="record"> Entidad a crear </param>
        /// <returns> Entidad creado </returns>
        public virtual TEntityType Create(TEntityType record)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    context.Entry(record).State = EntityState.Added;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return record;
        }

        /// <summary>
        /// Crea una lista de entidades en el contexto
        /// </summary>
        /// <param name="list"> Entidad a crear </param>
        /// <returns> Entidad creado </returns>
        public virtual List<TEntityType> Create(List<TEntityType> list)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    foreach (TEntityType record in list)
                        context.Entry(record).State = EntityState.Added;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list;
        }

        /// <summary>
        /// Elimina una entidad del contexto
        /// </summary>
        /// <param name="record">
        /// Entidad a eliminar (no es necesario obtenerla previamente basta con establecer las
        /// ropiedades que correspondan a las llaves primarias)
        /// </param>
        public virtual void Delete(TEntityType record)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    context.Entry(record).State = EntityState.Deleted;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Elimina un listado de entidades del contexto
        /// </summary>
        /// <param name="list"> Entidades a eliminar </param>
        public virtual void Delete(List<TEntityType> list)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    foreach (TEntityType record in list)
                        context.Entry(record).State = EntityState.Deleted;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Busca una entidad por sus claves primarias
        /// </summary>
        /// <param name="keys"> Claves primarias (en el mismo order que se esecifica en el mapper) </param>
        /// <returns> Entidad que coincide con los parametros de busqueda </returns>
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
                throw ex;
            }

            return record;
        }

        /// <summary>
        /// Actualiza una entidad en el contexto
        /// </summary>
        /// <param name="record"> Entidad a actualizar </param>
        /// <returns> Entidad actualizada </returns>
        public virtual TEntityType Update(TEntityType record)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    context.Entry(record).State = EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return record;
        }

        /// <summary>
        /// Actualiza una lista de entidades
        /// </summary>
        /// <param name="list"> Entidades a acualizar </param>
        /// <returns> Entidades actualizadas </returns>
        public virtual List<TEntityType> Update(List<TEntityType> list)
        {
            try
            {
                using (TContextType context = CreateContext())
                {
                    foreach (TEntityType record in list)
                        context.Entry(record).State = EntityState.Modified;

                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list;
        }

        /// <summary>
        /// Lista de entidades
        /// </summary>
        /// <returns> Entidades </returns>
        public virtual List<TEntityType> List()
        {
            List<TEntityType> record = default(List<TEntityType>);

            try
            {
                using (TContextType context = CreateContext())
                    record = context.Set<TEntityType>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return record;
        }

        /// <summary>
        /// Lista de entidades
        /// </summary>
        /// <returns> Entidades </returns>
        public virtual List<TEntityType> List(int[] items)
        {
            List<TEntityType> record = default(List<TEntityType>);

            try
            {
                using (TContextType context = CreateContext())
                    record = context.Set<TEntityType>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return record;
        }

    }

}
