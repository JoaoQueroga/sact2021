import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './avaliador.css';

function AvaliadorInicio(){
    const history = useHistory();

    const [contAvaliados, setCont] = useState(0);

    function avaliarNovo(){
        history.push('/avaliador-select');
    }

    return(
        <div className="avaliadorLogin">
            <div className="topoAvaliador">
                <h1>Marcela Pessoa</h1>
                <p>UEA</p>
            </div>
            <div className="mainAvaliador">
                <h1>{contAvaliados}</h1>
                {contAvaliados < 2?<p>projeto avaliado</p>:<p>projetos avaliados</p>}
                <button className="btAv" onClick={avaliarNovo}>avaliar novo projeto</button>
            </div>
            <div className="rodapeAvaliador">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorInicio;