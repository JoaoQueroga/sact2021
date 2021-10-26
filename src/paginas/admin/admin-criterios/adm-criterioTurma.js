import {Link} from 'react-router-dom';
import './admin-criteriosTurma.css';

function CriteriosCurso(){

    return(
        <div className="criteriosCurso">
            <div className="topo-criteriosCurso">
                <h2>Critérios de avaliação</h2>
            </div>
            <div className="main-criteriosCurso">
               <Link to="/admin-criterios">Informática <span>10</span></Link>
               <Link to="/admin-criterios">Eletrônica <span>14</span></Link>
               <Link to="/admin-criterios">Mecatrônica <span>15</span></Link>
            </div>
            <div className="rodape-criteriosCurso">
                <Link to="/adm-inicio">sair</Link>
            </div>
        </div>
    )
}

export default CriteriosCurso;