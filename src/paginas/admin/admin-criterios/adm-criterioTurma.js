import {Link} from 'react-router-dom';
import './admin-criteriosTurma.css';
import {useEffect, useState} from 'react';
import api from '../../../configs/api';

function CriteriosCurso(){

    const [info, setQtdInfo] = useState(0);
    const [meca, setQtdMeca] = useState(0);
    const [eletro, setQtdEletro] = useState(0);

    useEffect(()=>{
        api.get('criterios/cont/info').then((res)=>{
            setQtdInfo(res.data[0].cont);
        })
        api.get('criterios/cont/meca').then((res)=>{
            setQtdMeca(res.data[0].cont);
        })
        api.get('criterios/cont/eletro').then((res)=>{
            setQtdEletro(res.data[0].cont);
        })
    }, [])

    return(
        <div className="criteriosCurso">
            <div className="topo-criteriosCurso">
                <h2>Critérios de avaliação</h2>
                <Link to="/adm-inicio">voltar</Link>
            </div>
            <div className="main-criteriosCurso">
                <Link to="/admin-criterios/info">Informática <span>{info}</span></Link>
                <Link to="/admin-criterios/eletro">Eletrônica <span>{eletro}</span></Link>
                <Link to="/admin-criterios/meca">Mecatrônica <span>{meca}</span></Link>
            </div>
        </div>
    )
}

export default CriteriosCurso;