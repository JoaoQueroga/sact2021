import './adm.css'
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {Link, useHistory} from 'react-router-dom';
import api from '../../configs/api';

function AdmCadastroAvaliador(){
    const history = useHistory();

    const [chave, setChave] = useState(11111);
    const [nome, setNome] = useState('');
    const [instituicao, setInst] = useState('');

    function cadastraAvaliador(){
        if(nome && instituicao){
            api.post('avaliador/atualizaChave',{
                "novaChave": parseInt(chave)
            }).then(()=>{
            api.post('avaliador/cadastra-avaliador', {
                    "chave": chave,
                    "nome": nome,
                    "instituicao": instituicao
            }).then(()=>{
                    Swal.fire({
                        title: 'Avaliador cadastrado',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    }).then((result) => {
                        history.push('/adm-avaliadores');
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
        api.get('avaliador/pegaChave').then((res)=>{
           setChave(res.data.chave);
        })
    },[])

    return(
        <div className="admAvaliadores">
            <div className="admAvaliadoresTopo">
                <h2>Cadastrar avaliador</h2>
               
            </div>
            <div className="admAvaliadoresMain">
                <div className="formulario">
                    <label>nome</label>
                    <input value={nome} onChange={(e)=>setNome(e.target.value)}></input>
                    <label>instituição</label>
                    <input value={instituicao} onChange={(e)=>setInst(e.target.value)}></input>
                    <label>chave</label>
                    <div>
                        <h1>{chave}</h1>
                    </div>
                </div>
            </div>
            <div className="admRodape">
                <button onClick={cadastraAvaliador}>cadastrar</button>
                <Link to="/adm-avaliadores">voltar</Link>
            </div>

        </div>
    )
}

export default AdmCadastroAvaliador;