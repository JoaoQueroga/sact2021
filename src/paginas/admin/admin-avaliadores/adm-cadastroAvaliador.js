import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import api from '../../../configs/api';
import './avaliadoresCadastro.css';

function AdmCadastroAvaliador(){
    const history = useHistory();

    const [chave, setChave] = useState(11111);
    const [nome, setNome] = useState('');
    const [instituicao, setInst] = useState('');

    const [podeInfo, setPodeInfo] = useState(false);
    const [podeEletro, setPodeEletro] = useState(false);
    const [podeMeca, setPodeMeca] = useState(false);

    function cadastraAvaliador(){
        let restricao = criaString();
        if(nome && instituicao && (restricao !== '000')){
            api.post('avaliador/atualizaChave',{
                "novaChave": parseInt(chave)
            }).then(()=>{
            api.post('avaliador/cadastra-avaliador', {
                    "chave": chave,
                    "nome": nome,
                    "instituicao": instituicao,
                    "pode_avaliar": restricao
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

    function criaString(){ // monta a string para o avaliador [000] a [111] info/eletro/meca ex: 101 
        let s = '';
        if(podeInfo){
            s += '1';
        }else{
            s+= '0';
        }
        if(podeEletro){
            s += '1';
        }else{
            s+= '0';
        }
        if(podeMeca){
            s += '1';
        }else{
            s+= '0';
        }

        return s;
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
                    <label>pode avaliar projetos de</label>
                    <div className="podeAvaliar">
                        <div>
                            <input type="checkbox" name="info" onChange={()=>setPodeInfo(!podeInfo)}/>
                            <label>Informática</label>
                        </div>
                        <div>
                            <input type="checkbox" name="eletro"  onChange={()=>setPodeEletro(!podeEletro)}/>
                            <label>Eletrônica</label>
                        </div>
                        <div>
                            <input type="checkbox" name="meca"  onChange={()=>setPodeMeca(!podeMeca)}/>
                            <label>Mecatrônica</label>
                        </div>
                    </div>
                    <label>chave</label>
                    <div className="chaveDiv">
                        <h1>{chave}</h1>
                    </div>
                    <div className="admCadastroRodape">
                        <button onClick={cadastraAvaliador}>cadastrar</button>
                        <button onClick={cancelar} className="btCancelar">cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdmCadastroAvaliador;
