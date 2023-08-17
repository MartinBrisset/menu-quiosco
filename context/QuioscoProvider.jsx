const { useState, createContext, useEffect } = require("react");
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
    const router = useRouter()
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [carrito, setCarrito] = useState([])
    const [nombre, setNombre] = useState('')
    const [totalPedido, setTotalPedido] = useState(0)


    const obtenerCategorias = async () => {
        try {
            const { data } = await axios.get('/api/categorias');
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    const handleClickCategoria = (id) => {
        const categoria = categorias.find(categoria => categoria.id === id);
        setCategoriaActual(categoria);
        router.push('/')
    }

    const handleSetProducto = (producto) => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAddCarrito = ({categoriaId, ...producto}) => {
        // chequear si el producto ya existe en el carrito y actualiza la cantidad
        if(carrito.some(productoState => productoState.id === producto.id)){
            //actualizar la cantidad del producto en el carrito
            const carritoActualizado = carrito.map(productoState => {
                if(productoState.id === producto.id){
                    productoState.cantidad = producto.cantidad;
                    return productoState;
                }else{
                    return productoState;
                }
            });

            setCarrito(carritoActualizado);
            toast.success('Pedido actualizado',{
                position: "top-left",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500
            });
        }else{
            setCarrito([...carrito, producto]);
            toast.success('Agregado al Pedido',{
                position: "top-left",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500
            });
        }
    }

    const handleEditarCantidad = id => {
        setModal(!modal)
        const productoActualizar = carrito.filter(
            producto => producto.id === id
        )
        setProducto(productoActualizar[0]);
    }

    const handleDeleteProducto = id =>{
        const carritoActualizado = carrito.filter(
            producto => producto.id !== id
        )
        setCarrito(carritoActualizado);
    }
    
    const confirmarPedido = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/ordenes',{
                pedido: carrito,
                nombre,
                total: totalPedido,
                fecha: Date.now().toString()
            })
            //si la orden se crea, reiniciamos state
            if (data) {
                setCategoriaActual(categorias[0])
                setCarrito([])
                setNombre('')
                setTotalPedido(0)

                toast.success('Pedido confirmado',{
                    position: "top-center",
                    theme: "colored",
                    pauseOnHover: false,
                    autoClose: 1500
                });

                setTimeout(() => {
                    router.push('/')
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        const nuevoTotal = carrito.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotalPedido(nuevoTotal)
    }, [carrito])
    

    
    return (
        <QuioscoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                producto,
                modal,
                handleChangeModal,
                handleAddCarrito,
                carrito,
                handleEditarCantidad,
                handleDeleteProducto,
                nombre,
                setNombre,
                confirmarPedido,
                totalPedido
            }}
        >
        {children}
        </QuioscoContext.Provider>
    );
}

export {
    QuioscoProvider
} 

export default QuioscoContext;
