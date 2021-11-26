import './relatorios.css';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../../configs/api';
import qrCode from './qrcode.svg';

import { AiOutlineWifi , AiOutlineLock} from "react-icons/ai";

function ChavesAvaliadores(){

    const history = useHistory();

    function voltar(){
        history.push('/adm-relatorios');
    }

    const [avs, setAvs] = useState([]);

    useEffect(()=>{
        api.get('avaliador/todos-avaliadores')
        .then((res)=>{
            setAvs(res.data);
        })
    },[])
    
    return(
        <div className="relGeral">
            <div className="relatorios-opcoes-chave">

                <button id="bt-re-voltar" onClick={voltar}> voltar </button>
                <h2>Abaixo todas as chaves dos avaliadores</h2>
                <ol>
                    <li>para imprimir Ctrl+P</li>
                    <li>selecione o layout paisagem</li>
                    <li>em "mais definicões" selecione para margens "nenhuma"</li>
                </ol>
                
            </div>
            
               
                    
            <div className="relatorios-avs" >
                { 
                avs.map((p)=>{
                    return(
                        <div className="slotAva" key={p.chave}>
                            <p id="nomeAv">{p.nome}</p>
                            <p className="infoAv">esta é sua chave</p>
                            <h2>{p.chave}</h2>
                            <img src={qrCode} width="150" height="150"/>
                            <p className="infoAv"><AiOutlineWifi/>FMM-Feira <AiOutlineLock/> feira@tec</p>
                            <p className="infoAv">http://10.10.12.190:5000</p>
                           
                        </div>
                    )
                })
                    }
            </div>
                    
               
            
        </div>
    )
}

export default ChavesAvaliadores;

