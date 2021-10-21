import './projetoCadastro.css';
import {useHistory} from 'react-router-dom';
import { useState } from 'react';

function ProjetoCadastro(){

    const history = useHistory();

    const [quartoAluno, setQuartoAluo]  = useState(false);

    function cancelar(){
        history.push('/admin-projetos');
    }

    function habilitaQuartoAluno(){
       setQuartoAluo(!quartoAluno);
    }

    return(
        <div className="projetoCadastro">
            <div className="projetoCadastroTopo">
                <h3>Cadastrar projeto</h3>
               
            </div>
            <div className="projetoCadastroMain">
                <div className="formularioProjeto">
                    <label>nome do projeto e turma</label>
                    <div className="nomeProjetoCadastro">
                        <div>
                            <input ></input>
                        </div>
                        <div className="selectTurma">
                            <select>
                                <option>-</option>
                                <option>3AI</option>
                                <option>3BI</option>
                                <option>3CI</option>
                            </select>
                        </div>
                    </div>
                    <div id="opcoesAlunos">
                        <span className="nameSpan">alunos</span>
                        <span className="opSpan">
                            <input type="checkbox" onClick={habilitaQuartoAluno}></input>
                            <span>+1</span>
                        </span>
                    </div>
                    <div className="alunosProjetoCadastro">
                        <input placeholder="aluno 1"></input>
                        <input placeholder="aluno 2"></input>
                        <input placeholder="aluno 3"></input>
                        { quartoAluno ? <input placeholder="aluno 4"></input> : <span></span>}
                    </div>
                    <span>descrição</span>
                    <div className="descricaoProjetoCadastro">
                        <textarea></textarea>
                    </div>
                   
                </div>
            </div>
            <div className="projetoCadastroRodape">
                <button >cadastrar</button>
                <button onClick={cancelar} className="btCancelar">cancelar</button>
            </div>
        </div>
    )
}

export default ProjetoCadastro;