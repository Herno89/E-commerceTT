
export const eliminarProducto = async (id) => {
 const confirmar = window.confirm('¿Estás seguro de eliminar?');
 if (confirmar) {
   return(

       new Promise(async (res, rej) => {
           
           try {
               const respuesta = await fetch(`https://mockapi.io/api/v1/productos/${id}`, {
                   method: 'DELETE',
                });
                if (!respuesta.ok) throw new Error('Error al eliminar');
                alert('Producto eliminado correctamente.');
                res()
            } catch (error) {
                console.error(error.message);
                alert('Hubo un problema al eliminar el producto.');
                rej()
            }
        })  
        )
        }
    };