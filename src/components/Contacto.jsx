import { useState } from "react";
import "../styles/Contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    consulta: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");


    const response = await fetch("https://formspree.io/f/xovdoejk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setStatus("Mensaje enviado con éxito!");
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        consulta: ""
      });
    } else {
      setStatus("Error al enviar el mensaje");
    }
  };

  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="consulta">Consulta:</label>
          <textarea
            id="consulta"
            name="consulta"
            value={formData.consulta}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <button type="submit" className="submit-btn">
          Enviar
        </button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
}

export default Contacto;