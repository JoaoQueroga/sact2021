import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './professor.css';

function ProfessorLogin(){

    const history = useHistory(); 
    function entrar(){
        history.push('/professor-select');
    }

    return(
        <div className="professorLogin">
            <div className="topo">
                <h1>Bem vindo professor</h1>
            </div>
            <div className="mainProfessor">
                
                <input type="number" placeholder="ex: 1001"/>
                <label>informe a sua chave</label>
                <button onClick={entrar}>entrar</button>
            </div>
            <div className="rodape">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default ProfessorLogin;