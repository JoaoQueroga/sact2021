import '../admin/admin-projetos/admin-projetos.css';
import './professor-avaliacao.css';
import {Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../configs/api';



function ProfessorAvaliacaoProjetos(props){

    const history = useHistory();

    const [projetos, setProjetos] = useState([]);

    useEffect(()=>{
        api.get(`professor/projetos/${props.location.state.nome}`)
        .then((res)=>{
            setProjetos(res.data);
        })
    },[])

    function avaliar(c){
        history.push({
            pathname: `/professor-avaliacao/${c}`,
            state: {
                chave:  props.location.state.chave,
                nome:  props.location.state.nome,
                curso:  props.location.state.curso,
                qtd_avaliacoes: props.location.state.qtd_avaliacoes
            }
        });
    }

    return(
        <div className="adminCursos">
            <div className="topo-adminCursos">
                <h2 id="titulo-prof-av">projetos do(a) professor(a) {props.location.state.nome}</h2>
                <Link className="btCancelarProjeto" to={{
                        pathname: '/professor-inicio',
                        state: {
                            chave:  props.location.state.chave,
                            nome:  props.location.state.nome,
                            curso:  props.location.state.curso,
                            qtd_avaliacoes: props.location.state.qtd_avaliacoes
                        }
                }}>voltar</Link>
            </div>
            <div className="main-adminCursos">
                {
                    projetos.map((p)=>{
                        return(
                        <div class="card-prof-av" key={p.chave}>

                            <p className="parte1">{p.turma}</p>
                            <p className="parte2">{p.nome}</p>
                            <div className="parte6">
                                <button id="bt-av" onClick={()=>avaliar(p.chave)}>avaliar</button>
                            </div>

                            <div className="parte3">
                                <p>{p.aluno1}</p>
                                <p>{p.aluno2}</p>
                                <p>{p.aluno3}</p>
                                <p>{p.aluno4}</p>
                            </div>
                            <p className="parte4">{p.descricao}</p>
                            <div className="parte5">
                                <p>{p.nota_professor}</p> 
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProfessorAvaliacaoProjetos;
