import Image from "next/image"
import { formatearMoneda } from "@/helpers"
import axios from "axios"
import { toast } from "react-toastify"

export const Orden = ({orden}) => {
    const { id, nombre, total, pedido } = orden

    const completarOrden = async (id) => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden completada',{
                position: "top-left",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500
            });
        } catch (error) {
            toast.error('Hubo un error',{
                position: "top-left",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500
            });
            console.log(error)
        }
    }

  return (
    <div className="border p-10 space-y-5">
        <h3 className="text-2xl font-bold">Orden: {id}</h3>
        <p className="text-lg font-bold">Cliente: {nombre}</p>

        <div>
            {pedido.map(plato => (
                <div key={plato.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                    <div className="w-32">
                        <Image 
                            src={`/assets/img/${plato.imagen}.jpg`}
                            alt={plato.nombre}
                            width={400}
                            height={500}
                        />
                    </div>
                    <div className="p-5 space-y-2">
                        <h4 className="text-xl font-bold">{plato.nombre}</h4>
                        <p className="text-lg font-bold">Cantidad: {plato.cantidad}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="md:flex md:items-center md:justify-between my-10">
            <p className="mt-5 font-black text-4xl">
                Total a pagar: {formatearMoneda(total)}
            </p>
            <button
                type="button"
                className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold uppercase md:mt-0 hover:bg-blue-700"
                onClick={() => completarOrden(id)}
            >
                Cobrar y preparar
            </button>
        </div>
    </div>
  )
}
