import React, { useState } from "react";
import { format } from "date-fns";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "./elementos/Formulario";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./componentes/input";
import logo from "./logoND.svg";
import "./estilos.css";

const App = () => {
  const [nombreForm, setNombre] = useState({ campo: "", valido: null });
  const [emailForm, setEmail] = useState({ campo: "", valido: null });
  const [telForm, setTel] = useState({ campo: "", valido: null });
  const [formularioValido, cambiarFormulario] = useState(null);
  const date = new Date();
  const formatDate = format(date, "Ymmdd HH:mm:ss");
  const concierto = "AlejandroSanz";

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{7,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{8,8}$/,
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      nombreForm.valido === "true" &&
      emailForm.valido === "true" &&
      telForm.valido === "true"
    ) {
      cambiarFormulario(true);
      enviarInfo(nombreForm, emailForm, telForm, concierto);
    } else {
      cambiarFormulario(false);
    }
  };

  const enviarInfo = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: formatDate,
        nombre: nombreForm,
        email: emailForm,
        telefono: telForm,
        concierto: concierto,
      }),
    };
    fetch(
      "https://vaa95pwkke.execute-api.us-east-1.amazonaws.com/dev/",
      requestOptions
    ).then((response) => {
      if (response.status === 200) {
        setNombre({ campo: "", valido: null });
        setEmail({ campo: "", valido: null });
        setTel({ campo: "", valido: null });
        window.location.href = "https://flic.kr/s/aHBqjzPrmJ";
      }
    });
  };

  return (
    <main>
      <div className="App">
        <div className="App-logoApp">
          <a
            href="https://es-la.facebook.com/NuestroDiarioGT/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={logo} className="App-logoAppImg" alt="logo" />
          </a>
        </div>
        <div className="line-separate"></div>
        <header className="App-header">
          <section>
            <form className="Formulario-Datos" onSubmit={submitForm}>
              <label className="Label-Form Title-Form">
                Ingresa tus datos para descargar las fotografías
              </label>
              <Input
                estado={nombreForm}
                cambiarEstado={setNombre}
                tipo="text"
                label="Nombre completo"
                placeholder="Ingresa nombre"
                name="nombre"
                leyendaError="Tu nombre debe contener al menos 6 caracteres"
                expresionRegular={expresiones.nombre}
              />
              <Input
                estado={emailForm}
                cambiarEstado={setEmail}
                tipo="text"
                label="Correo electrónico"
                placeholder="Ingresa correo"
                name="email"
                leyendaError="Ingresa un correo válido"
                expresionRegular={expresiones.correo}
              />
              <Input
                estado={telForm}
                cambiarEstado={setTel}
                tipo="tel"
                label="Teléfono"
                placeholder="Ingresa teléfono"
                name="telefono"
                leyendaError="Ingresa un número válido"
                expresionRegular={expresiones.telefono}
              />
              <ContenedorBotonCentrado>
                <Boton type="submit">Enviar</Boton>
                {formularioValido === true && (
                  <MensajeExito>¡Formulario enviado exitosamente!</MensajeExito>
                )}
              </ContenedorBotonCentrado>

              {formularioValido === false && (
                <MensajeError>
                  <p>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <b>Error: </b>Por favor rellena correctamente el formulario
                  </p>
                </MensajeError>
              )}
            </form>
          </section>
        </header>
      </div>
    </main>
  );
};

export default App;
