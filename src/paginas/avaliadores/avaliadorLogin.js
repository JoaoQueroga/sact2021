import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import './avaliador.css';
import Swal from 'sweetalert2';

function AvaliadorLogin(){

    const history = useHistory();

    const [chave, setChave] = useState('');

    function logirAvaliador(){
        if(chave){
            Swal.fire({
                title: 'Marcela Pessoa',
                text: 'esse sou eu?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'sim',
                cancelButtonText: 'não'
            }).then((result)=>{
                if (result.isConfirmed) {
                    history.push('/avaliador-inicio')
                }
            })
        }else{
            Swal.fire({
                title: 'sem chave',
                text: 'informe uma',
                icon: 'warning',
                confirmButtonText: 'entendido'
            })
        }
    }

    return(
        <div className="avaliadorLogin">
            <div className="topo">
                <h1>Bem vindo avaliador</h1>
            </div>
            <div className="mainAvaliador">
                
                <input type="number" placeholder="ex: 1001" value={chave} onChange={(e)=>setChave(e.target.value)}/>
                <label>informe a sua chave</label>
                <button onClick={logirAvaliador}>entrar</button>
            </div>
            <div className="rodape">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorLogin;