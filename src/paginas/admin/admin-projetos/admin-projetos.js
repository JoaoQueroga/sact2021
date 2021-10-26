import {Link, useParams} from 'react-router-dom';
import './admin-projetos.css';
import {useState, useEffect} from 'react';
import api from '../../../configs/api';
import Swal from 'sweetalert2';

function AdminProjetos(){

    let {curso} = useParams();

    const [projetos, setProjetos] = useState([]); 
    const [c, setC] = useState("");

    useEffect(()=>{
        api.get(`projetos/todos/${curso}`).then((res)=>{
            setProjetos(res.data);
        })

        if(curso === 'info'){ // nome do curso na interface
            setC("informática")
        }else if(curso === 'eletro'){
            setC("eletrônica")
        }else if(curso === 'meca'){
            setC("mecatrônica")
        }

    },[])

    function excluirProjeto(p){
       
        Swal.fire({
            title: 'Excluir projeto',
            text: p.nome,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'sim',
            cancelButtonText: 'não'
        }).then((result) => {
            if (result.isConfirmed) { 
                api.get(`projetos/excluir/${p.chave}`).then(()=>{
                    
                    let projetosAux = projetos; 
                    let index = projetosAux.indexOf(p);
                    if(index > -1){
                        projetosAux.splice(index, 1);
                    }
                    setProjetos([...projetosAux]);
                    
                    Swal.fire({
                        title: 'Projeto excluido',
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
        <div className="adminCursos">
            <div className="topo-adminCursos">
                <h2>Projetos de {c}</h2>
                <div className="menuProjeto">
                    <Link to={`/admin-projetoCadastro/${curso}`}>cadastrar</Link>
                    <Link className="btCancelarProjeto" to="/admin-projetos">voltar</Link>
                </div>
            </div>
            <div className="main-adminCursos">
                {
                    projetos.map((p)=>{
                        return(
                        <div className="cardProjeto" key={p.chave}>
                            <div className="nomeProjeto">
                                    <p>{p.nome}</p>
                            </div>
                            <div className="chaveProjeto">
                                    <p>{p.chave}</p>
                            </div>
                            <div className="turmaProjeto">
                                <h3>{p.turma}</h3>
                            </div>
                            <div className="alunosProjeto">
                                    <p>{p.aluno1}</p>
                                    {p.aluno2 !== 'null' ? <p>{p.aluno2}</p> : <span></span>}
                                    {p.aluno3 !== 'null' ? <p>{p.aluno3}</p> : <span></span>}
                                    {p.aluno4 !== 'null' ? <p>{p.aluno4}</p> : <span></span>}
                            </div>
                            <div className="descricaoProjeto">
                                    <p>
                                    {p.descricao}
                                    </p>
                            </div>
                            <div className="botoesProjeto">
                                    <button>editar</button>
                                    <button onClick={()=>{excluirProjeto(p)}}>excluir</button>
                            </div>
                        </div>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default AdminProjetos;