import Layout from "@/layout/Layout"
import useQuiosco from "@/hooks/useQuiosco"
import { formatearMoneda } from "@/helpers"


const total = () => {

  const { carrito, nombre, setNombre, confirmarPedido, totalPedido } = useQuiosco()

  
 
  const chequearCarrito = () => {
    if (carrito.length === 0 || nombre.trim() === '') {
      return true
    } else {
      return false
    }
  }

  return (
    <Layout
        pagina={`Fresh Coffee - Total y confirmar`}
    >
        <h1
            className="text-4xl text-gray-800 font-black"
        >Total y confirmar</h1>
        <p className="text-2xl my-5">
           Confirmar pedido  
        </p>
        <p>Coloque su nombre para que lo llamemos</p>

        <form
          onSubmit={confirmarPedido}
        >
          <div>
            <label
              className="block uppercase text-slate-800 font-bold text-xl"
              htmlFor="nombre"
            >Nombre</label>
            <input 
              type="text" 
              className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded" 
              id="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="mt-10">
            <p className="text-2xl">Total a pagar {''} <span className="font-bold">{formatearMoneda(totalPedido)}</span></p>
          </div>
          <div className="mt-5">
            <input 
              type="submit"
              className={`${chequearCarrito() ? 'bg-indigo-300 hover:cursor-not-allowed' : 'bg-indigo-600 hover:cursor-pointer'} bg-indigo-600 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center cursor-pointer`}
            value='Confirmar pedido'
            disabled={chequearCarrito()}
            />
          </div>
        </form>

    </Layout>
  )
}

export default total