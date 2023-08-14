
import { formatearMoneda } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image";
import { useEffect, useState } from "react";

export const ModalProducto = () => {

    const { producto, handleChangeModal, handleAddCarrito, carrito } = useQuiosco();
    const [cantidad, setCantidad] = useState(1)
    const [edicionProducto, setEdicionProducto] = useState(false)

    useEffect(() => {
        // chequear si el producto del modal actual, esta en el carrito
        if (carrito.some(productoState => productoState.id === producto.id)) {
            const productoCarrito = carrito.find(productoState => productoState.id === producto.id);
            setCantidad(productoCarrito.cantidad);
            setEdicionProducto(true);
            
        }
    }, [producto, carrito])
    


  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image
                src={`/assets/img/${producto.imagen}.jpg`}
                alt={producto.nombre}
                height={300}
                width={500}
                
            />   
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => handleChangeModal()}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">
                {producto.nombre}
            </h1>
            <p className="mt-5 font-black text-5xl text-amber-500">
                {formatearMoneda(producto.precio)}
            </p>
            <div className="flex gap-4 mt-5">
                <button
                    type="button"
                    onClick={() =>{
                        if(cantidad <= 1) return;
                        setCantidad(cantidad - 1)
                    }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-7 h-7"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>

                <p className="text-3xl">{cantidad}</p>

                <button
                    type="button"
                    onClick={() => setCantidad(cantidad + 1)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-7 h-7"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <div>
                {/* negrita */}
                <p className="mt-5 mb-5 font-bold">
                    Total: <span className="text-2xl">{formatearMoneda(producto.precio * cantidad)}</span> 
                </p>
                <button
                    type="button"
                    className="bg-amber-500 px-5 py-2 rounded-md text-white hover:bg-amber-900 font-bold uppercase"
                    onClick={() => {
                        handleAddCarrito({...producto, cantidad});
                        handleChangeModal();
                    }}
                >
                    {
                        edicionProducto ? 'Editar pedido actual' : 'Agregar al pedido'
                    }
                </button>
            </div>
        </div>  

    </div>
  )
}
