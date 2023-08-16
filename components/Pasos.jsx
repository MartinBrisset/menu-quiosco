import { useRouter } from "next/router";

const pasos = [
    { paso: 1, nombre: 'Menu', url: '/' },
    { paso: 2, nombre: 'Pedido', url: '/resumen' },
    { paso: 3, nombre: 'Datos y Total', url: '/total' },
]

export const Pasos = () => {

    const router = useRouter();

    const calcularProgreso = () => {
        if (router.pathname === '/') {
            return 5
        }else if (router.pathname === '/resumen'){
            return 48
        } else {
            return 100
        }
    }

  return (
    <>
        <div className="flex justify-between mb-5">
            {
                pasos.map(paso => (
                    <button
                        className="text-2xl font-bold"
                        key={paso.paso}
                        onClick={() => {
                            router.push(paso.url)
                        }}
                    >
                        {paso.nombre}
                    </button>
                ))
            }
        </div>
        <div className="bg-gray-100 mb-10">
            <div 
                className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" 
                style={{ width: `${calcularProgreso()}%`}}>

            </div>
        </div>
    </>
  )
}
