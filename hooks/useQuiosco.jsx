import QuioscoContext from "@/context/QuioscoProvider";

const { useContext } = require("react");

const useQuiosco = () => {
    const context = useContext(QuioscoContext);
    if (!context) {
        throw new Error("useQuiosco debe ser usado dentro de un QuioscoProvider");
    }
    return context;
}

export default useQuiosco;