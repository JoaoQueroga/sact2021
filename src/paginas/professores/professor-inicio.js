import './professor-inicio.css';
import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

function ProfessorInicio(props){

    const history = useHistory();

    const [curso, setCurso] = useState("");

    useEffect(()=>{
        cursoProf();
    })

    function cursoProf(){
        if(props.location.state.curso === "info"){
            setCurso("Informática")
        }else if(props.location.state.curso === "eletro"){
            setCurso("Eletrônica")
        }else if(props.location.state.curso === "meca"){
            setCurso("Mecatrônica")
        }
    }

    function irProjetos(){
        history.push({
            pathname: `/professor-projetos`,
            state: {
                chave:  props.location.state.chave,
                nome:  props.location.state.nome,
                curso:  props.location.state.curso,
                qtd_avaliacoes: props.location.state.qtd_avaliacoes
            }
       })
    }

    function irProjetosAvaliacao(){
        history.push({
            pathname: `/professor-projetos-avaliacao`,
            state: {
                chave:  props.location.state.chave,
                nome:  props.location.state.nome,
                curso:  props.location.state.curso,
                qtd_avaliacoes: props.location.state.qtd_avaliacoes
            }
       })
    }


    return(
        <div className="professor-inicio">

            <div className="professor-inicio-topo">
                <h2>{props.location.state.nome}</h2>
                <p>{curso}</p>
            </div>

            <div className="professor-inicio-main">
                <button onClick={irProjetos}>projetos</button>
                <button onClick={irProjetosAvaliacao}>avaliação</button>
            </div>

            <div className="professor-inicio-rodape">
                <Link to="professor-login">sair</Link>
            </div>

        </div>
    )
}

export default ProfessorInicio;