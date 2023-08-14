import { formatearMoneda } from "@/helpers";
import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco";

export const Producto = ({producto}) => {
    const { handleSetProducto, handleChangeModal } = useQuiosco();

    const { nombre, imagen, precio } = producto;

  return (
    <div className="border p-3">
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={nombre}
            width={300}
            height={200}
        />
        <div className="p-5">
            <h3 className="text-2xl font-bold">
                {nombre}
            </h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearMoneda(precio)}
            </p>
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-900 w-full mt-5 p-3 text-white uppercase font-bold"
                onClick={() => {
                    handleChangeModal()
                    handleSetProducto(producto)
                }}
            >
                Agregar
            </button>
        </div>
    </div>
  )
}
