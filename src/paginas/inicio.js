import {Link} from 'react-router-dom';
import './inicio.css';
import {useEffect} from 'react';
import {logout} from '../configs/auth';

function Inicio(){

    useEffect(()=>{
        logout(); // faz o logout
    })

    return(
        <div className="inicio">
            <div className="topo">
                <h1>Feira tecnológica</h1>
            </div>
            <div className="main">
               <Link to="/avaliador-login">Sou avaliador</Link>
               <Link to="/professor-login">Sou professor</Link>
               <Link to="/visitante-inicio">Sou visitante</Link>
            </div>
            <div className="rodape">
                <Link to="/adm-login">administrador</Link>
            </div>
        </div>
    )
}

export default Inicio;