import Layout from "@/layout/Layout";
import useQuiosco from "../hooks/useQuiosco";

export default function Home() {

  const { categoriaActual } = useQuiosco();

  return (
    <Layout pagina={`${categoriaActual?.nombre}`}>
      <h1
        className="text-4xl text-gray-800 font-black"
      >
        {categoriaActual?.nombre}
      </h1>
      <p
        className="text-2xl my-10"
      >
        Elije y personaliza tu pedido
      </p>
    </Layout>
  )
}

