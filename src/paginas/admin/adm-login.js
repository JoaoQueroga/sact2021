import './adm.css';
import {Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import api from '../../configs/api';
import {login, logout} from '../../configs/auth';

function AdmLogin(){
    const history = useHistory();

    const [chave, setChave] = useState('');

    function logirAdm(){
        if(chave){
            api.post('/auth/admin-login', {
                "chave":chave 
            }).then((res)=>{
                if(res.data){
                    login(res.data); //faz o login na auth
                    Swal.fire({
                        title: 'admin online',
                        icon: 'success',
                        confirmButtonText: 'vamos nessa',
                    }).then(()=>{
                        history.push('/adm-inicio')
                    })
                }else{
                    Swal.fire({
                        title: 'Erro na autenticação',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    })
                }
               
            }).catch((e)=>{
                console.log(e);
                Swal.fire({
                    title: 'Erro na autenticação',
                    icon: 'error',
                    confirmButtonText: 'ok',
                })
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

    useEffect(()=>{
        logout(); // faz o logout
    })

    return(
        <div className="admLogin">   
            <div className="topoAdm">
                <h2>central do administrador </h2>
            </div>
            <div className="mainAdm">
                
                <input type="text" value={chave} onChange={(e)=>setChave(e.target.value)} placeholder="admin"/>
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