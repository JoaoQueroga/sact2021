import '../admin/admin-projetos/admin-projetos.css';
import './professor-avaliacao.css';

import { useHistory, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../configs/api';

import Swal from 'sweetalert2'; // alerta

function ProfessorAvaliacao(props){


    const history = useHistory();
    const {chave} = useParams();

    const [nota, setNota] = useState(0);
    const [projeto, setProjeto] = useState({});

    useEffect(()=>{
        api.get(`projetos/buscar/${chave}`)
        .then((res)=>{
            setProjeto(res.data[0]);
            setNota((res.data[0].nota_professor)*10)
        })
    },[])

    function voltar(){
        history.push({ 
            pathname: '/professor-projetos-avaliacao',
            state: {
                chave:  props.location.state.chave,
                nome:  props.location.state.nome,
                curso:  props.location.state.curso,
            }
        })
    }

    function avaliar(){
        Swal.fire({
            title: 'confirmar a avaliação',
            text: (nota * 0.1).toFixed(1),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'sim',
            cancelButtonText: 'não'
        }).then((result) => {
            if (result.isConfirmed) { 
                api.post('professor/avaliar',{
                    "chave": projeto.chave,
                    "nota":  (nota * 0.1).toFixed(1),
                }).then(()=>{
                    Swal.fire({
                        title: 'Avaliação completa',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    }).then(() => {
                        history.push({
                            pathname: '/professor-projetos-avaliacao',
                            state: {
                                chave:  props.location.state.chave,
                                nome:  props.location.state.nome,
                                curso:  props.location.state.curso,
                            }
                        });
                    })
                }).catch(()=>{
                    Swal.fire({
                        title: 'Algo deu errado',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    }).then(() => {
                        history.push({
                            pathname: '/professor-projetos-avaliacao',
                            state: {
                                chave:  props.location.state.chave,
                                nome:  props.location.state.nome,
                                curso:  props.location.state.curso,
                            }
                        });
                    })
                })
            }
        })
    }

    return(
        <div className="adminCursos">
       
            <div className="topo-adminCursos">
                <h2>{projeto.nome}</h2>
            </div>
            <div className="main-adminCursos">
                <div className="av-projeto-professor">
                    <h1>{(nota*0.1).toFixed(1)}</h1>
                    <input type="range" min="0" max="100" value={nota} onChange={(e)=>setNota(e.target.value)}></input>
                </div>
                <div className="bts-av-professor"> 
                    <button id="bt-salva-professor" onClick={avaliar}>salvar</button>
                    <button id="bt-canc-professor" onClick={voltar}>cancelar</button>
                </div>
                
            </div>

        </div>
    )
}

export default ProfessorAvaliacao;