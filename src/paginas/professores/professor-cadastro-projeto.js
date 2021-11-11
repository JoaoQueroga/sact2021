import '../admin/admin-projetos/projetoCadastro.css';
import {useHistory} from 'react-router-dom';
import { useState , useEffect} from 'react';
import api from '../../configs/api';
import Swal from 'sweetalert2';


function ProfessorProjetoCadastro(props){


    const history = useHistory();

    const [qtdAlunos, setQtdAluno]  = useState([1,2,3]);
    const [c, setC] = useState("");

    const [nome, setNome] = useState("");
    const [turma, setTurma] = useState("");
    const [descricao, setDescricao] = useState("");
    const [aluno1, setAluno1] = useState("");
    const [aluno2, setAluno2] = useState(null);
    const [aluno3, setAluno3] = useState(null);
    const [aluno4, setAluno4] = useState(null);

    const [chave, setChave] = useState(11111);

    function cancelar(){
        history.push({
            pathname: `/professor-projetos`,
            state: {
                chave:  props.location.state.chave,
                nome:  props.location.state.nome,
                curso:  props.location.state.curso,
                qtd_avaliacoes: props.location.state.qtd_avaliacoes
            }
       });
    }

    function defineQtdAlunos(valor){
        if(valor === '3'){  // se editar as opções preenchidas é bom limpar o que está oculto
            setAluno4(null);
        } else if(valor === '2'){
            setAluno4(null);
            setAluno3(null);
        }else if(valor === '1'){
            setAluno4(null);
            setAluno3(null);
            setAluno2(null);
        }
        let qtd = [];
        let key = 1;
        for(let i = 0; i < valor; i++){
            qtd.push(key);
            key++;
        }
        setQtdAluno(qtd);
    }
   
    function defineValorAluno(item, valor){
        switch(item){
            case 1:
                setAluno1(valor);
                break;
            case 2:
                setAluno2(valor);
                break;
            case 3:
                setAluno3(valor);
                break;
            case 4:
                setAluno4(valor);
                break;
            default:
                break;
        }
    }

    function cadastrar(){
       
        if(nome && aluno1 && turma && descricao && turma!=="-"){
            api.post('projetos/atualizaChave',{
                "novaChave": parseInt(chave)
            }).then(()=>{
            api.post('projetos/cadastra-projeto', {
                    "chave": chave,
                    "nome": nome,
                    "turma": turma,
                    "descricao": descricao,
                    "aluno1": aluno1,
                    "aluno2": aluno2,
                    "aluno3": aluno3,
                    "aluno4": aluno4,
                    "professor": props.location.state.nome,
                    "curso": props.location.state.curso /// <--------------------------------alterar aqui
            }).then(()=>{
                    Swal.fire({
                        title: 'Projeto cadastrado',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    }).then((result) => {
                        history.push({
                            pathname: `/professor-projetos`,
                            state: {
                                chave:  props.location.state.chave,
                                nome:  props.location.state.nome,
                                curso:  props.location.state.curso,
                                qtd_avaliacoes: props.location.state.qtd_avaliacoes
                            }
                       });
                    })
            })
            })
        }else{
            Swal.fire({
                title: 'Preencha todos os campos',
                icon: 'warning',
                confirmButtonText: 'ok',
            })
        }
    }

    useEffect(()=>{
        
        api.get('projetos/pegaChave').then((res)=>{
           setChave(res.data.chave);
        })

        if(props.location.state.curso === 'info'){ // nome do curso na interface
            setC("informática")
        }else if(props.location.state.curso === 'eletro'){
            setC("eletrônica")
        }else if(props.location.state.curso === 'meca'){
            setC("mecatrônica")
        }
    },[])


    return(
        <div className="projetoCadastro">
            <div className="projetoCadastroTopo">
                <h3>Cadastrar projeto de {c}</h3>
               
            </div>
            <div className="projetoCadastroMain">
                <div className="formularioProjeto">
                    <label>nome do projeto e turma</label>
                    <div className="nomeProjetoCadastro">
                        <div>
                            <input value={nome} onChange={(e)=>setNome(e.target.value)}/>
                        </div>
                        <div className="selectTurma">
                            { //dependendo do curso tem turmas diferentes
                                props.location.state.curso==="eletro"?
                                <select defaultValue={"-"} value={turma} onChange={(e)=>setTurma(e.target.value)}>
                                    <option value="-">-</option>
                                    <option value="3AE">3AE</option>
                                    <option value="3BE">3BE</option>
                                </select>
                                :
                                props.location.state.curso==="info"?
                                <select defaultValue={"-"} value={turma} onChange={(e)=>setTurma(e.target.value)}>
                                    <option value="-">-</option>
                                    <option value="3AI">3AI</option>
                                    <option value="3BI">3BI</option>
                                    <option value="3CI">3CI</option>
                                </select>
                                :
                                props.location.state.curso==="meca"?
                                <select defaultValue={"-"} value={turma} onChange={(e)=>setTurma(e.target.value)}>
                                    <option value="-">-</option>
                                    <option value="3AM">3AM</option>
                                    <option value="3BM">3BM</option>
                                    <option value="3CM">3CM</option>
                                </select>
                                :
                                <span></span>
                            }
                        </div>
                    </div>
                    <div id="opcoesAlunos">
                        <span className="nameSpan">alunos</span>
                        <div className="selectTurma">
                            <select defaultValue={3}  onChange={(e)=>defineQtdAlunos(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                    </div>
                    <div className="alunosProjetoCadastro">
                        {
                            qtdAlunos.map((item)=>{
                                return(
                                    <input key={item} placeholder={`aluno ${item}`} onChange={(e)=>defineValorAluno(item, e.target.value)}></input>
                                )
                            })
                        }   
                    </div>
                    <span>descrição</span>
                    <div className="descricaoProjetoCadastro">
                        <textarea value={descricao} onChange={(e)=>setDescricao(e.target.value)}></textarea>
                    </div>
                   
                </div>
            </div>
            <div className="projetoCadastroRodape">
                <button  onClick={cadastrar}>cadastrar</button>
                <button onClick={cancelar} className="btCancelar">cancelar</button>
            </div>
        </div>
    )
}

export default ProfessorProjetoCadastro;