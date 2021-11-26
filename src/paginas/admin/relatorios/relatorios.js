import './relatorios.css';
import {useHistory} from 'react-router-dom';

function Relatorios(){

    const history = useHistory();

    function voltar(){
        history.push('/adm-inicio');
    }
    function chaves(){
        history.push('/adm-relatorios-chaves');
    }
    function avaliadores(){
        history.push('/adm-relatorios-avaliadores');
    }


    return(
        <div className="relatorios">
            <h1>Relatórios</h1>

            <div className="relatorios-opcoes">

                <button id="bt-re-voltar" onClick={voltar}> voltar </button>
                <button onClick={chaves}> chaves dos projetos</button>
                <button onClick={avaliadores}> chaves dos avaliadores</button>

            </div>
        </div>
    )
}

export default Relatorios;

