import React from "react";
import { Input, Label, GrupoInput, LeyendaError, IconoValidacion } from './../elementos/Formulario';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({estado, cambiarEstado, tipo, label, placeholder, name, leyendaError, expresionRegular}) => {
    const onChange = (e) =>{
        cambiarEstado({...estado, campo: e.target.value});
    }

    const validacion = (e) => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado, valido: 'true'});
                console.log("input correcto");
            }else{
                cambiarEstado({...estado, valido: 'false'});
                console.log("input incorrecto");
            }
        }
    }
    
    return ( 
        <div>
            <Label className='Label-Form label-form-margin' htmlFor={name} valido={estado.valido}>{label}</Label>
            <GrupoInput >
                <Input 
                    type={tipo} 
                    placeholder={placeholder} 
                    id={name}
                    value={estado.campo}
                    onChange={onChange}    
                    onKeyUp={validacion}
                    onBlur={validacion}
                    valido={estado.valido}
                />
                <IconoValidacion 
                    icon={estado.valido === 'true' ?faCheckCircle:faTimesCircle} 
                    valido={estado.valido} 
                />
            </GrupoInput>
            <LeyendaError className='Texto-Leyenda' valido={estado.valido}>{leyendaError}</LeyendaError>
        </div>
     );
}
 
export default ComponenteInput;