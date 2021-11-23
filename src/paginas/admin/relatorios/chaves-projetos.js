import './relatorios.css';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../../configs/api';

function RelatoriosChaves(){

    const history = useHistory();

    function voltar(){
        history.push('/adm-relatorios');
    }

    const [projetos, setProjetos] = useState([]);

    useEffect(()=>{
        api.get('projetos/todos')
        .then((res)=>{
            setProjetos(res.data);
        })
    },[])
    
    return(
        <div>
            <div className="relatorios-opcoes-chave">

                <button id="bt-re-voltar" onClick={voltar}> voltar </button>
                <h2>Abaixo todas as chaves dos projetos</h2>
                <ol>
                    <li>para imprimir Ctrl+P</li>
                    <li>selecione o layout paisagem</li>
                    <li>em "mais definicões" selecione para margens "nenhuma"</li>
                </ol>
                
            </div>
            {
                projetos.map((p)=>{
                    return(
                        <div className="relatorios-chaves" key={p.chave}>
                            <p>{p.nome}</p>
                            <h1 id="chaveNumber">{p.chave}</h1>
                            <p>(&nbsp;&nbsp;&nbsp;&nbsp;) finalizado</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RelatoriosChaves;

