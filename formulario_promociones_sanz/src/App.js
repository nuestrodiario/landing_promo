import React, {useState} from 'react';
import { format } from "date-fns";
import { Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from './elementos/Formulario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from './componentes/input';
import logo from './logoND.svg';
import './estilos.css';

const App = () => {
  const [nombreForm, setNombre] = useState({campo: '', valido: null});
  const [munzonaForm, setMunZona] = useState({campo: '', valido: null});
  const [emailForm, setEmail] = useState({campo: '', valido: null});
  const [edadForm, setEdad] = useState({campo: '', valido: null});
  const [telForm, setTel] = useState({campo: '', valido: null});
  const [codigoForm, setCodigo] = useState({campo: '', valido: null});
  const [formularioValido, cambiarFormulario] = useState(null);
  const date = new Date();
  const formatDate = format(date, "Ymmdd HH:mm:ss");
  const concierto = 'AlejandroSanz';

  const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{7,40}$/, // Letras y espacios, pueden llevar acentos.
		munzona: /^[a-zA-Z0-9_-\s]{1,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		edad: /^\d{2,2}$/,
		telefono: /^\d{8,8}$/,
		codigo: /^[\d-]{7,7}$/
	}

  const submitForm = e => {
    e.preventDefault()
    if(
      nombreForm.valido === 'true' &&
      munzonaForm.valido === 'true' &&
      emailForm.valido === 'true' &&
      edadForm.valido === 'true' &&
      telForm.valido === 'true' &&
      codigoForm.valido === 'true'
      ){
        cambiarFormulario(true);
        enviarInfo(nombreForm, munzonaForm, emailForm, edadForm, telForm, codigoForm);
    }else{
        cambiarFormulario(false);
    }
  }

  const enviarInfo = e => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "fecha": formatDate,
        "nombre": nombreForm,
        "munzona": munzonaForm,
        "email": emailForm,
        "edad": edadForm,
        "telefono": telForm,
        "codigo": codigoForm,
        "concierto": concierto,
      })
    };
    fetch(' https://slphhicr3c.execute-api.us-east-1.amazonaws.com/dev', requestOptions)
    .then(response => {
      if(response.status === 200){
        setNombre({campo: '', valido: null});
        setMunZona({campo: '', valido: null});
        setEmail({campo: '', valido: null});
        setEdad({campo: '', valido: null});
        setTel({campo: '', valido: null});
        setCodigo({campo: '', valido: null});
      }
    });

  }

  return(
    <main>
      <div className="App">
      <div className='App-logoApp'>
        <a href="https://es-la.facebook.com/NuestroDiarioGT/" target="_blank" rel='noreferrer'><img src={logo} className="App-logoAppImg" alt="logo" /></a>
      </div>
      <div className='line-separate'></div>
        <header className="App-header">
        <section>
          <form className='Formulario-Datos' onSubmit={submitForm}>
          <label className='Label-Form Title-Form'>Ingresa tus datos para ganar una entrada doble al concierto de Alejandro Sanz</label>  
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
            estado={munzonaForm}
            cambiarEstado={setMunZona}
            tipo="text"
            label="Municipio/Zona"
            placeholder="Ingresa municipio o zona"
            name="munzona"
            leyendaError="Ingresa tu municipio o zona"
            expresionRegular={expresiones.munzona}
          />
          <Input 
            estado={emailForm}
            cambiarEstado={setEmail}
            tipo="email"
            label="Correo electrónico"
            placeholder="Ingresa correo"
            name="email"
            leyendaError="Ingresa un correo válido"
            expresionRegular={expresiones.correo}
          />
          
          <Input 
            estado={edadForm}
            cambiarEstado={setEdad}
            tipo="tel"
            label="Edad"
            placeholder="Ingresa tu edad"
            name="edad"
            leyendaError="Ingresa una edad válida"
            expresionRegular={expresiones.edad}
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
          <Input 
            estado={codigoForm}
            cambiarEstado={setCodigo}
            tipo="text"
            label="Código"
            placeholder="Ingresa el código"
            name="telefono"
            leyendaError="Ingresa el codigo como se ve en la imagen"
            expresionRegular={expresiones.codigo}
          />
            <ContenedorBotonCentrado>
              <Boton type="submit">Enviar</Boton>
              {formularioValido === true && <MensajeExito>¡Formulario enviado exitosamente!</MensajeExito>}
            </ContenedorBotonCentrado>
            
            {formularioValido === false && <MensajeError>
            <p><FontAwesomeIcon icon={faExclamationTriangle} /><b>Error: </b>Por favor rellena correctamente el formulario</p>
          </MensajeError>}
          </form>
        </section>
        </header>
      </div>
    </main>
  );

}

export default App;