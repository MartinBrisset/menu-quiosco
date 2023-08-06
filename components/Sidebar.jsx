import QuioscoContext from "@/context/QuioscoProvider";
import Image from "next/image"
import { useContext } from "react";
import { Categoria } from "./Categoria";

export const Sidebar = () => {

  const { categorias } = useContext(QuioscoContext);

  return (
    <>
      <Image 
        width={200} 
        height={100} 
        src={"/assets/img/logo.svg"} 
        alt="imagen logo"
        priority={true}
        onClick={() => window.location.reload()}
        className="hover:cursor-pointer"
      />

      <nav className="mt-10">
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </nav>
    </>
  )
}
