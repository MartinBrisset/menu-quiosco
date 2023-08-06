import QuioscoContext from "@/context/QuioscoProvider";
import Image from "next/image";
import { useContext } from "react";

export const Categoria = ({categoria}) => {

    const { categoriaActual, handleClickCategoria } = useContext(QuioscoContext);

    const { nombre, icono, id } = categoria;

  return (
    <button 
        className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} 
        flex items-center gap-4 w-full border p-3 hover:bg-amber-400 hover:cursor-pointer text-2xl font-bold`}
        type="button"
        onClick={() => handleClickCategoria(id)}
    >
        <Image
            width={80}
            height={30}
            src={`/assets/img/icono_${icono}.svg`}
            alt={nombre}
        />

        {nombre}

    </button>
  )
}
