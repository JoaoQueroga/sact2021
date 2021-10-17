import { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './visitanteAvaliacao.css';
import Swal from 'sweetalert2'; // alerta

function VisitanteAvaliacao(){

    const history = useHistory();
    const[nota, setNota] = useState(50);

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
                Swal.fire({
                    title: 'Avaliação completa',
                    icon: 'success',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    history.push('/');
                })
            }
        })
    }

    return(
        <div className="visitanteAvaliacao">
            <div className="visitanteAvaliacao-p1">
                <h2>projeto xxxxx</h2>
            </div>
            <div className="visitanteAvaliacao-p2">
                <div className="cardProjeto-visitante">
                    <p>aluno da silva sauro</p>
                    <p>aluno da pereira silva</p>
                    <p>aluno xavier fonseca</p>
                    <p>aluno aguiar de souza</p>

                </div>  
            </div>
            <div className="visitanteAvaliacao-p3">
               
                <h1>{(nota * 0.1).toFixed(1)}</h1>
                <input type="range" min="50" max="100" value={nota} onChange={(e)=>{setNota(e.target.value)}}/>
                <button onClick={avaliar}>avaliar projeto</button>
                
            </div>
            <div className="visitanteAvaliacao-p4">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default VisitanteAvaliacao;