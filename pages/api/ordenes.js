import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    //leer ordenes
    if (req.method === 'GET') {
        const ordenes = await prisma.orden.findMany({
            where: {
                estado: 0
            }
        })
        res.json(ordenes)
    }
    

    //crear orden
    if (req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                fecha: req.body.fecha,
                total: req.body.total,
                pedido: req.body.pedido
            }
        })

        res.json(orden)
    }

}