import {Link, useHistory} from 'react-router-dom';
import './visitante.css';

function VisitanteInicio(){

    const history = useHistory();

    function avaliar(){
        history.push('/visitante-select');
    }

    return(
        <div className="visitanteInicio">
            <div className="topoVisitante">
                <h1>Bem vindo visitante</h1>
            </div>
            <div className="mainVisitante">
                <input type="number" placeholder="ex: 1001"/>
                <label>informe o seu código</label>
                <button onClick={avaliar}>avaliar projeto</button>
            </div>
            <div className="rodapeVisitante">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default VisitanteInicio;