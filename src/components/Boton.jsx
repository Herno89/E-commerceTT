function Boton({texto, color, titulo}){
    const estilo= {backgroundColor: color, color: "white"}

    function mensaje(){
        alert("Explorando " + titulo)
    }

    return(
            
            <button onClick={mensaje} style={estilo}>{texto}</button> 
        )
}
export default Boton; 