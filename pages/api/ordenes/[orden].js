const { PrismaClient } = require('@prisma/client')
export default async function handler(req, res) {

    if (req.method === 'POST') {
        const prisma = new PrismaClient()
        const { orden } = req.query;

        const ordenUpdate = await prisma.orden.update({
            where: {
                id: parseInt(orden)
            },
            data: {
                estado: 1
            }
        })            

        res.status(200).json(ordenUpdate);
    }

}