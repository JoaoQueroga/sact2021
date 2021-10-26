import {Link} from 'react-router-dom';
import './admin-projetos.css';
import {useState, useEffect} from 'react';
import api from '../../../configs/api';

function AdminProjetoCursos(){

    const [info, setQtdInfo] = useState(0);
    const [meca, setQtdMeca] = useState(0);
    const [eletro, setQtdEletro] = useState(0);

    useEffect(()=>{
        api.get('projetos/cont/info').then((res)=>{
            setQtdInfo(res.data[0].cont);
        })
        api.get('projetos/cont/meca').then((res)=>{
            setQtdMeca(res.data[0].cont);
        })
        api.get('projetos/cont/eletro').then((res)=>{
            setQtdEletro(res.data[0].cont);
        })
    }, [])

    return(
        <div className="adminCursosP">
            <div className="topo-adminCursosP">
                <h2>Projetos - cursos</h2>
            </div>
            <div className="main-adminCursosP">
               <Link to="/admin-projetos/info">Informática <span>{info}</span></Link>
               <Link to="/admin-projetos/eletro">Eletrônica <span>{eletro}</span></Link>
               <Link to="/admin-projetos/meca">Mecatrônica <span>{meca}</span></Link>
            </div>
            <div className="rodape-adminCursosP">
                <Link to="/adm-inicio">sair</Link>
            </div>
        </div>
    )
}

export default AdminProjetoCursos;