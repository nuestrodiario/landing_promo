import React, {useState} from 'react';
import logo from './logoND.svg';
import './App.css';
import { format } from "date-fns";

const App = props =>{
  const [nombreForm, setNombre] = useState('');
  const [emailForm, setEmail] = useState('');
  const [telForm, setTel] = useState('');
  const date = new Date();
  const formatDate = format(date, "Ymd");
  console.log(formatDate);

  const enviarInfo = e => {
    e.preventDefault()
    fetch('https://vaa95pwkke.execute-api.us-east-1.amazonaws.com/dev',{
      method: 'POST',
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify({
        "fecha": formatDate,
        "nombre": nombreForm,
        "email": emailForm,
        "telefono": telForm
      }),
      headers: { "Content-Type": "form-data" },
    })
    .then(res => res.json())
   
    
  }

  return(
    <div className="App">
    <div className='App-logoApp'>
      <img src={logo} className="App-logoAppImg" alt="logo" />
    </div>
    <div className='line-separate'></div>
      <header className="App-header">
      <section>
        <form className='Formulario-Datos' onSubmit={enviarInfo}>
          <label className='Label-Form Title-Form'>Ingresa tus datos para descargar las fotografías</label>
          <label className='Label-Form'>Nombre</label>
          <input type="text" placeholder='Ingresa nombre' className='InputForm' name='nameForm' onChange={event => setNombre({value: event.target.value, type: "nombreForm"})} />
          <label className="Label-Form">Correo</label>
          <input type="email" placeholder='Ingresa correo electrónico' className='InputForm' name='emailForm' onChange={event => setEmail({value: event.target.value, type: "emailForm"})}/>
          <label className="Label-Form">Teléfono</label>
          <input type="number" placeholder='Ingresa teléfono' className='InputForm' name='telForm' onChange={event => setTel({value: event.target.value, type: "telForm"})} />
          <input type="submit" placeholder='Enviar' className='Button-Form link-submit' onClick={() => {window.location.href="https://www.flickr.com/"}}/>
          
        </form>
      </section>
      </header>
    </div>
  )

}

export default App;
