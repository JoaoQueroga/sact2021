import {Link} from 'react-router-dom';
import './admin-projetos.css';

function AdminProjetoCursos(){

    return(
        <div className="adminCursosP">
            <div className="topo-adminCursosP">
                <h2>Projetos - cursos</h2>
            </div>
            <div className="main-adminCursosP">
               <Link to="/admin-projetos">Informática <span>10</span></Link>
               <Link to="/admin-projetos">Eletrônica <span>14</span></Link>
               <Link to="/admin-projetos">Mecatrônica <span>15</span></Link>
            </div>
            <div className="rodape-adminCursosP">
                <Link to="/adm-inicio">sair</Link>
            </div>
        </div>
    )
}

export default AdminProjetoCursos;