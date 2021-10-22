import './professores.css'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import api from '../../../configs/api'

function AdmProfessores(){
    const [professores, setProfessores] = useState([1,1,1,1,1,1,1,1,1,1]);

    useEffect(()=>{
        api.get('...').then((res)=>{
            setProfessores(res.data);
        })
    },[])

    function excluirProfessor(prof){
       
        Swal.fire({
            title: 'Excluir professor',
            text: prof.nome,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'sim',
            cancelButtonText: 'não'
        }).then((result) => {
            if (result.isConfirmed) { 
                api.get(`professor/excluir/${prof.chave}`).then(()=>{
                    
                    let professorAux = professores; 
                    let index = professorAux.indexOf(prof);
                    if(index > -1){
                        professorAux.splice(index, 1);
                    }
                    setProfessores([...professorAux]);
                    
                    Swal.fire({
                        title: 'Professor excluido',
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
        <div className="admProfessores">
            <div className="topo-professores">
                <h3>Professores</h3>
                <div className="menuProfessor">
                    <Link to="/cadastro-professor">cadastrar</Link>
                    <Link className="btCancelar" to="/adm-inicio">voltar</Link>
                </div>
            </div>
            
            <div className="admProfessoresMain">
                {
                    professores.map((prof)=>{
                        return(
                            <div className="admCardProfessor">
                                <div className="nomeProfessor">
                                    <p>Sergio Roberto</p>
                                </div>
                                <div className="idProfessor">
                                    <p>1234</p>
                                </div>
                                <div className="botoesProfessor">
                                    <button>editar</button>
                                    <button onClick={()=>{excluirProfessor(prof)}}>excluir</button>
                                </div>
                                <div className="cursoProfessor">
                                    <p>Informática</p>
                                </div>
                                <div className="statusProfessor">
                                    <p>7 avaliações</p>
                                </div>
                            
                            </div>
                        )
                    })
                
                
                }
            </div>
          

        </div>
    )
}

export default AdmProfessores;