import "../styles/Equipo.css"

function EquipoTalentoLab({equipo}) {
    return(
        <div className="team-container">
            {equipo.map((persona)=>(
                <div className="team-card">
                    
                        <h1>{persona.nombre}</h1>
                        <p>{persona.rol}</p>
                   
                   
                        <img className="team-image" src={persona.imagen}></img>
                   
                </div>
            
            ))}
        
        
        </div>
    )
    
}
export default EquipoTalentoLab;