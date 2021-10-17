import {useState} from 'react';
import Swal from 'sweetalert2'; // alerta
import {useHistory, Link} from 'react-router-dom'
import './professor.css';

function ProfessorSelecionaProjeto(){
    const history = useHistory();

    const [codigo, setCodigo] = useState('');

    function entrar(){
        
    }

    return(
        <div className="professorLogin">
            <div className="topo">
                <p>informe o código do projeto</p>
            </div>
            <div className="main">
               
                <input type="text" placeholder="ex: 1001" value={codigo}/>
                <label>código do projeto</label>
                <button>avaliar</button>
            </div>
            <div className="rodape">
                <Link to="/professor-login">voltar</Link>
            </div>
        </div>
    )
}

export default ProfessorSelecionaProjeto;