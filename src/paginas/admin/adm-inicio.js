import './admInicio.css';
import {Link} from 'react-router-dom';

function AdmInicio(){
    return(
        <div className="admInicio">
            <div className="admInicioTopo">
                <p>adminitração</p>
            </div>
            <div className="admInicioCards">
                <div className="cardAdminInicio">
                    <h1>10</h1>
                    <p>projetos</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>25</h1>
                    <p>avaliadores</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>3</h1>
                    <p>professores</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>0</h1>
                    <p>avalições</p>
                </div>

            </div>
            <div className="admInicioOpcoes">
                <Link to="/adm-avaliadores">avaliadores</Link>
                <Link to="#">projetos</Link>
                <Link to="#">professores</Link>
                <Link to="#">ficha de avaliação</Link>
                <Link to="#">relatórios</Link>
                <Link to="#">dados</Link>
            </div>
            <div className="admInicioRodape">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default AdmInicio;