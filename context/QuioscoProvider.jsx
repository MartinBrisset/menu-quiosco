const { useState, createContext, useEffect } = require("react");
import axios from 'axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})

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
    
    return (
        <QuioscoContext.Provider 
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria

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
