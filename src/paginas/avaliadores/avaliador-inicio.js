import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './avaliador.css';

function AvaliadorInicio(props){
    const history = useHistory();

    const [chave, setChave] = useState(11111);
    const [projetosAvaliados, setAvaliados] = useState(0);
    const[nome, setNome] = useState('');
    const[instituicao, setInstituicao] = useState('');
    const[podeAvaliar, setPodeAvaliar] = useState('');
    
    const [textoPodeAv, setTextoPodeAv] = useState('');

    function avaliarNovo(){
        history.push({
            pathname: '/avaliador-select',
            state: {
                chave:  chave,
                nome:  nome,
                instituicao:  instituicao,
                projetos_avaliados: projetosAvaliados,
                pode_avaliar: podeAvaliar
               }
        });
    }

    function textoAv(s){
        if(s === '100'){
            setTextoPodeAv('Informática');
        }else if(s === '010'){
            setTextoPodeAv('Eletrônica');
        }else if(s === '001'){
            setTextoPodeAv('Mecatrônica');
        }else if(s === '001'){
            setTextoPodeAv('Mecatrônica');
        }else if(s === '110'){
            setTextoPodeAv('Informática e Eletrônica');
        }else if(s === '101'){
            setTextoPodeAv('Informática e Mecatrônica');
        }else if(s === '011'){
            setTextoPodeAv('Eletrônica e Mecatrônica');
        }else if(s === '111'){
            setTextoPodeAv('Informática, Eletrônica e Mecatrônica');
        }
    }

    useEffect(()=>{
        setChave(props.location.state.chave);
        setAvaliados(props.location.state.projetos_avaliados);
        setNome(props.location.state.nome);
        setInstituicao(props.location.state.instituicao);
        setPodeAvaliar(props.location.state.pode_avaliar);
        textoAv(props.location.state.pode_avaliar);
    },[])

    return(
        <div className="avaliadorLogin">
            <div className="topoAvaliador">
                <h1>{nome}</h1>
                <p>{instituicao}</p>
            </div>
            <div className="mainAvaliador">
                <h1>{projetosAvaliados}</h1>
                <p>projetos avaliados</p>
                <div className="podeAv"> 
                    <p>avaliar projetos de</p>
                    <h3>{textoPodeAv}</h3>
                </div>
                <button className="btAv" onClick={avaliarNovo}>avaliar novo projeto</button>
            </div>
            <div className="rodapeAvaliador">
                <Link to="/avaliador-login">sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorInicio;