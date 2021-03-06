import './admInicio.css';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../configs/api';

function AdmInicio(){

    const [qtdAvaliadores, setQtdAv] = useState(0);
    const [qtdProjetos, setQtdProjs] = useState(0);
    const [qtdProfs, setQtdProfs] = useState(0);
    const [qtdAvaliacoes, setQtdAvs] = useState(0);

    useEffect(()=>{
        api.get('avaliador/cont').then((res)=>{
            setQtdAv(res.data[0].cont);
        })
        api.get('projetos/cont').then((res)=>{
            setQtdProjs(res.data[0].cont);
        })
        api.get('professor/cont').then((res)=>{
            setQtdProfs(res.data[0].cont);
        })
        api.get('avaliacao/cont').then((res)=>{
            setQtdAvs(res.data[0].cont);
        })
    }, [])

    return(
        <div className="admInicioDash">
            <div className="admInicioTopo">
                <p>administração</p>
            </div>
            <div className="admInicioCards">
                <div className="cardAdminInicio">
                    <h1>{qtdProjetos}</h1>
                    <p>projetos</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>{qtdAvaliadores}</h1>
                    <p>avaliadores</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>{qtdProfs}</h1>
                    <p>professores</p>
                </div>
                <div className="cardAdminInicio">
                    <h1>{qtdAvaliacoes}</h1>
                    <p>avalições</p>
                </div>

            </div>
            <div className="admInicioOpcoes">
                <Link to="/adm-avaliadores">avaliadores</Link>
                <Link to={{
                    pathname: '/admin-projetos',
                    state: {
                        curso: "admin"
                    }
                }}>projetos</Link>
                <Link to="/admin-professores">professores</Link>
                <Link to="/admin-criteriosCursos">critérios</Link>
                <Link to="/adm-relatorios">relatórios</Link>
                <Link to="/adm-dados/1">dados</Link>
            </div>
            <div className="admInicioRodape">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default AdmInicio;