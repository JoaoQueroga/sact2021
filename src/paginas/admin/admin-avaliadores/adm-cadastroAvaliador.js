import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import api from '../../../configs/api';

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


    function cancelar(){
        history.push('/adm-avaliadores');
    }

    return(
        <div className="admCadastroAvaliadores">
            <div className="admCadastroAvaliadoresTopo">
                <h3>Cadastrar avaliador</h3>
               
            </div>
            <div className="admCadastroAvaliadoresMain">
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
            <div className="admCadastroRodape">
                <button onClick={cadastraAvaliador}>cadastrar</button>
                <button onClick={cancelar} className="btCancelar">cancelar</button>
            </div>

        </div>
    )
}

export default AdmCadastroAvaliador;