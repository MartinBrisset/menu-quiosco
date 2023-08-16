import Layout from "@/layout/Layout"
import useQuiosco from "@/hooks/useQuiosco"
import { ResumenProducto } from "@/components/ResumenProducto"
import { formatearMoneda } from "@/helpers"

const resumen = () => {

  const { carrito, totalPedido } = useQuiosco()

  return (
    <Layout
        pagina={`Fresh Coffee - Resumen`}
    >
        <h1
            className="text-4xl text-gray-800 font-black"
        >Resumen</h1>
        <p className="text-2xl my-10">
           Revisa tu pedido, total: <span className="font-bold">{formatearMoneda(totalPedido)}</span>
        </p>
        {
          carrito.length === 0 ? (
            <p className="text-center text-2xl">No hay elementos en tu pedido</p>
          ) : (
            carrito.map( producto => (
              <ResumenProducto
                key={producto.id}
                producto={producto}
              />
            ))
          )
        }

    </Layout>
  )
}

export default resumen