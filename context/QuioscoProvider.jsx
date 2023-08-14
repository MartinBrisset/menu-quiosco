const { useState, createContext, useEffect } = require("react");
import axios from 'axios';
import { toast } from "react-toastify";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [carrito, setCarrito] = useState([])
    const [paso, setPaso] = useState(1)

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
            const carritoActualizado = carrito.map(productoState => productoState.id ? producto : productoState);
            setCarrito(carritoActualizado);
            toast.success('Pedido actualizado',{
                position: "top-center",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500
            });
        }else{
            setCarrito([...carrito, producto]);
            toast.success('Agregado al Pedido',{
                position: "top-center",
                theme: "colored",
                pauseOnHover: false,
                autoClose: 1500
            });
        }
    }

    const handleChangePaso = (paso) => {
        setPaso(paso);
    }

    
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
                paso,
                handleChangePaso
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
