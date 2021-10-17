import './adm.css';
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import Swal from 'sweetalert2';

function AdmLogin(){
    const history = useHistory();

    const [chave, setChave] = useState('');

    function logirAdm(){
        if(chave){
            Swal.fire({
                title: 'admin online',
                confirmButtonText: 'vamos nessa',
            }).then((result)=>{
                if (result.isConfirmed) {
                    history.push('/adm-inicio')
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
        <div className="admLogin">   
            <div className="topoAdm">
                <h2>central do administrador </h2>
            </div>
            <div className="mainAdm">
                
                <input type="text" value={chave} onChange={(e)=>setChave(e.target.value)}/>
                <label>informe a sua chave</label>
                <button onClick={logirAdm}>entrar</button>
            </div>
            <div className="rodapeAdm">
                <Link to="/">sair</Link>
            </div>
        </div>
    )
}

export default AdmLogin;