import React, {useState} from 'react';
import { format } from "date-fns";
import { Formulario, Label, LeyendaError, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from './elementos/Formulario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import ComponenteInput from './componentes/input';
import Input from './componentes/input';
import logo from './logoND.svg';
import './estilos.css';

const App = () => {
  const [nombreForm, setNombre] = useState({campo: '', valido: null});
  const [emailForm, setEmail] = useState({campo: '', valido: null});
  const [telForm, setTel] = useState({campo: '', valido: null});
  const [zonaForm, setZona] = useState({campo: '', valido: null});
  const [edadForm, setEdad] = useState({campo: '', valido: null});
  const [codigoForm, setCodigo] = useState({campo: '', valido: null});
  const date = new Date();
  const formatDate = format(date, "Ymd H:m:s");
  const [formularioValido, cambiarFormulario] = useState(null);

  const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{3,100}$/, // Letras y espacios, pueden llevar acentos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{8,8}$/ // 7 a 14 numeros.
	}

  const onSubmit = (e) => {
    e.preventDefault();
    if(
      nombreForm.valido === 'true' &&
      emailForm.valido === 'true' &&
      telForm.valido === 'true' &&
      zonaForm.valido === 'true' &&
      edadForm.valido === 'true' &&
      codigoForm.valido === 'true'
      ){
        cambiarFormulario(true);
        setNombre({campo: '', valido: null});
        setEmail({campo: '', valido: null});
        setTel({campo: '', valido: null});
        setZona({campo: '', valido: null});
        setEdad({campo: '', valido: null});
        setCodigo({campo: '', valido: null});
        enviarInfo()
    }else{
        cambiarFormulario(false);
    }
  }

  const enviarInfo = e => {
    if(nombreForm === ''){
      alert("No puede ir vacio");
    }
    e.preventDefault()
    fetch('https://slphhicr3c.execute-api.us-east-1.amazonaws.com/dev/',{
      method: 'POST',
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify({
        "fecha": formatDate,
        "nombre": nombreForm,
        "zona": zonaForm,
        "email": emailForm,
        "edad": edadForm,
        "telefono": telForm,
        "codigo": codigoForm
      }),
      headers: { "Content-Type": "form-data" },
    })
    .then(res => res.json())
  }

  

  return(
    <main>
      <div className="App">
      <div className='App-logoApp'>
        <img src={logo} className="App-logoAppImg" alt="logo" />
      </div>
      <div className='line-separate'></div>
        <header className="App-header">
        <section>
          <Formulario className='Formulario-Datos' onSubmit={onSubmit}>
          <label className='Label-Form Title-Form'>Ingresa tus datos para poder participar por las entradas dobles al concierto de Christian Nodal</label>  
          <Input 
            estado={nombreForm}
            cambiarEstado={setNombre}
            tipo="text"
            label="Nombre"
            placeholder="Ingresa nombre"
            name="nombre"
            leyendaError="Por favor ingresa tu nombre"
            expresionRegular={expresiones.nombre}
          />

          {formularioValido === false && <MensajeError>
            <p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error: </b>Por favor rellena correctamente el formulario</p>
          </MensajeError>}

            <ContenedorBotonCentrado>
              <Boton type="submit">Enviar</Boton>
              {formularioValido === true && <MensajeExito>¡Formulario enviado exitosamente!</MensajeExito>}
            </ContenedorBotonCentrado>
            
          </Formulario>
        </section>
        </header>
      </div>
    </main>
  );

}

export default App;