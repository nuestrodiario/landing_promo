import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Archivo para dar estilos y componentizar
const colores = {
    borde: "#0075FF",
    error: "#d50000",
    error2: "#fff",
    exito: "#2a90f7"
}

const Formulario = styled.form`
    display: grid;
    grid-template-columns: 2fr;
    gap: 20px;

    @media(max-width: 800px){
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    display: block;
    font-weight: 700;
    min-height: 40px;
    padding: 10px;
    ${props => props.valido === 'true' && css`
        color: ${colores.exito}
    `}
    ${props => props.valido === 'false' && css`
        color: ${colores.error2}
    `}

`;

const GrupoInput = styled.div`
    position: relative;
    z-index: 90;
`;

const Input = styled.input`
    width: 100%;
    background: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 3px solid transparent;

    &:focus{
        border: 3px solid ${colores.borde}
        outline: none;
        box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
    }
    ${props => props.valido === 'true' && css`
        border: 3px solid ${colores.exito};
    `}
    ${props => props.valido === 'false' && css`
        border: 3px solid ${colores.error} !important;
    `}
`;

const LeyendaError = styled.p`
    font-size: 15px;
    margin-bottom: 0;
    color: ${colores.error2};
    display: none;

    ${props => props.valido === 'true' && css`
        display: none;
    `}
    ${props => props.valido === 'false' && css`
        display: block;
    `}
`;

const IconoValidacion = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    bottom: 15px;
    z-index: 100;
    font-size: 16px;
    color: ${colores.borde};
    opacity: 0;

    ${props => props.valido === 'false' && css`
        opacity: 1;
        color: ${colores.error};
    `}
    ${props => props.valido === 'true' && css`
        opacity: 1;
        color: ${colores.exito};
    `}
`;

const ContenedorBotonCentrado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-columns: span 2;

    @media(max-width: 800px){
        grid-column: span 1;
    }
`;

const Boton = styled.button`
    height: 45px;
    line-height: 45px;
    width: 30%;
    background-color: #fff;
    color: #000;
    font-weigth: bold;
    border: none;
    border-radius: 3px;
    transition: .1s ease all;

    &:hover{
        box-shadow: 3px 0px 30px rgba(163, 163, 163,1);
    }
`;

const MensajeExito = styled.p`
    font-size: 14px;
    color: ${colores.exito};
`;

const MensajeError = styled.div`
    height: 40px;
    line-height: 20px;
    font-size: 12px;
    background: ${colores.error};
    padding: 0px 15px;
    border-radius: 3px;
    grid-column: span 2;
    p{
        margin: 0;
    }
    b{
        margin-left: 10px;
    }
    @media(max-width: 800px){
        grid-column: span 1;
    }
`;

export {
    Formulario, 
    Label, 
    GrupoInput, 
    Input, 
    LeyendaError, 
    IconoValidacion, 
    ContenedorBotonCentrado, 
    Boton, 
    MensajeExito,
    MensajeError
};