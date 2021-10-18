import './adm.css'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import api from '../../configs/api'

function AdmAvaliadores(){
    const [avaliadores, setAvaliadores] = useState([]);

    useEffect(()=>{
        api.get('avaliador/todos-avaliadores').then((res)=>{
            setAvaliadores(res.data);
        })
    },[])

    function excluirAvaliador(av){
       
        Swal.fire({
            title: 'Excluir avaliador',
            text: av.nome,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'sim',
            cancelButtonText: 'não'
        }).then((result) => {
            if (result.isConfirmed) { 
                api.get(`avaliador/excluir/${av.chave}`).then(()=>{
                    
                    let avaliadoresAux = avaliadores; 
                    let index = avaliadoresAux.indexOf(av);
                    if(index > -1){
                        avaliadoresAux.splice(index, 1);
                    }
                    setAvaliadores([...avaliadoresAux]);
                    
                    Swal.fire({
                        title: 'Avaliador excluido',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    })
                }).catch(()=>{
                    Swal.fire({
                        title: 'Erro na exclusão',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    })
                })
            }
        })
    }

    return(
        <div className="admAvaliadores">
            <div className="admAvaliadoresTopo">
                <h2>Avaliadores</h2>
                <Link to="/cadastro-avaliador">cadastrar</Link>
            </div>
            
            <div className="admAvaliadoresMain">
                {
                    avaliadores.map((av)=>{
                        return(
                            <div className="admCardAvaliador" key={av.chave}>
                                <div className="nomeAvaliador">
                                    <p>{av.nome}</p>
                                </div>
                                <div className="idAvaliador">
                                    <p>{av.chave}</p>
                                </div>
                                <div className="botoesAvaliador">
                                    <button>editar</button>
                                    <button onClick={()=>{excluirAvaliador(av)}}>excluir</button>
                                </div>
                                <div className="instAvaliador">
                                    <p>{av.instituicao}</p>
                                </div>
                                <div className="statusAvaliador">
                                    <p>{av.projetos_avaliados} avaliações</p>
                                </div>
                            
                            </div>
                        )
                    })
                
                
                }
            </div>
            <div className="admRodape">
                <Link to="/adm-inicio">voltar</Link>
            </div>

        </div>
    )
}

export default AdmAvaliadores;