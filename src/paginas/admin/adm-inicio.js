import './admInicio.css';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../configs/api';

function AdmInicio(){

    const [qtdAvaliadores, setQtdAv] = useState(0);

    useEffect(()=>{
        api.get('avaliador/cont').then((res)=>{
            setQtdAv(res.data[0].cont);
        })
    }, [])

    return(
        <div className="admInicio">
            <div className="admInicioTopo">
                <p>administração</p>
            </div>
            <div className="admInicioCards">
                <div className="cardAdminInicio">
                    <h1>10</h1>
                    <p>projetos</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>{qtdAvaliadores}</h1>
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
                <Link to="/admin-projetos-cursos">projetos</Link>
                <Link to="#">professores</Link>
                <Link to="#">critérios</Link>
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