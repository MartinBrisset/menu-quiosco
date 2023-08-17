import axios from 'axios'
import useSWR from 'swr'
import AdminLayout from "@/layout/AdminLayout"
import { Orden } from '@/components/Orden'


const admin = () => {

  const fetcher = () => axios.get('/api/ordenes').then(res => res.data)

  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {
    refreshInterval: 1000
  })

  return (
    <AdminLayout pagina={'Fresh Coffee - Administrador'}>
        <h1 className="text-4xl font-black">Panel de Administracion</h1>
        <p className="text-2xl my-5">Administra las Ordenes </p>

        {data && data.length ? data.map(orden => (
          <Orden
            key={orden.id}
            orden={orden}
          />
        )) : <p className="text-2xl my-5">No hay ordenes</p>}
    </AdminLayout>
  )
}

export default admin