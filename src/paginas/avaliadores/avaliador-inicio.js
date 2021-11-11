import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './avaliador.css';

function AvaliadorInicio(props){
    const history = useHistory();

    const [chave, setChave] = useState(11111);
    const [projetosAvaliados, setAvaliados] = useState(0);
    const[nome, setNome] = useState('');
    const[instituicao, setInstituicao] = useState('');


    function avaliarNovo(){
        history.push({
            pathname: '/avaliador-select',
            state: {
                chave:  chave,
                nome:  nome,
                instituicao:  instituicao,
                projetos_avaliados: projetosAvaliados
               }
        });
    }

    useEffect(()=>{
        setChave(props.location.state.chave);
        setAvaliados(props.location.state.projetos_avaliados);
        setNome(props.location.state.nome);
        setInstituicao(props.location.state.instituicao);
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
                <button className="btAv" onClick={avaliarNovo}>avaliar novo projeto</button>
            </div>
            <div className="rodapeAvaliador">
                <Link to="/avaliador-login">sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorInicio;