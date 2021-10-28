import {Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './avaliador.css';
import Swal from 'sweetalert2';
import api from '../../configs/api';
import {login, logout} from '../../configs/auth';

function AvaliadorLogin(){

    const history = useHistory();

    const [chave, setChave] = useState('');

    function logirAvaliador(){
        if(chave){
            api.post('/auth/avaliador-login', {
                "chave":chave 
            }).then((res)=>{
                if(res.data){
                    login(res.data.token); //faz o login na auth
                    Swal.fire({
                        title: `Bem vindo ${res.data.user.nome}`,
                        text: res.data.user.instituicao,
                        icon: 'success',
                        confirmButtonText: 'entrar',
                    }).then(()=>{
                        history.push({
                             pathname: '/avaliador-inicio',
                             state: {
                                 chave:  res.data.user.chave,
                                 nome:  res.data.user.nome,
                                 instituicao:  res.data.user.instituicao,
                                 projetos_avaliados: res.data.user.projetos_avaliados
                                }
                        })
                    })
                }else{
                    Swal.fire({
                        title: 'Erro na autenticação',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    })
                }
               
            }).catch((e)=>{
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
        <div className="avaliadorLogin">
            <div className="topo">
                <h1>Login do avaliador</h1>
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