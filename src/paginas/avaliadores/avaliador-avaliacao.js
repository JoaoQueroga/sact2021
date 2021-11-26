import { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './avaliacao.css';
import Swal from 'sweetalert2'; // alerta
import api from  '../../configs/api';

function AvaliadorAvaliacao(props){
    
    //state dinamico notas
    const [notas, setNotas] = useState([]);
    
    function updateNotas({target}, index) {
        const notasCopy = Array.from(notas);
        notasCopy.splice(index, 1, { id: index, value: target.value });
        setNotas(notasCopy);
    }

    //states comuns
    const history = useHistory();
    const [verInfo, setVerinfo] = useState(false);

    //avaliador
    const [chave, setChave] = useState(11111);
    const [projetosAvaliados, setAvaliados] = useState(0);
    const[nome, setNome] = useState('');
    const[instituicao, setInstituicao] = useState('');
    const[podeAvaliar, setPodeAvaliar] = useState('');

    //projeto
    const [projeto, setProjeto] = useState({});
  
    //ficha
    const [criterios, setCriterios] = useState([]);

    //ciclo de vida
    function criaNotas(x){
        let notasCopy = [] //copia o array
        for(let i = 0; i < x; i++){
            notasCopy.push({id: i, value: 50}); // add no array copia
        }
        setNotas(notasCopy); // atualiza o state
    }

    useEffect(()=>{
       

        setChave(props.location.state.chave);
        setAvaliados(props.location.state.projetos_avaliados);
        setNome(props.location.state.nome);
        setInstituicao(props.location.state.instituicao);
        setPodeAvaliar(props.location.state.pode_avaliar);

        api.get(`avaliacao/select-projeto/${props.location.state.codigo_projeto}`).then((res)=>{
            if(res.data.length > 0){

                let proj = res.data[0];
                setProjeto(proj);

                api.get(`criterios/todos/${res.data[0].curso}`).then((res)=>{ // busca a ficha de avaliaco
                    setCriterios(res.data);
                    criaNotas(res.data.length);
                })
            }else{
                Swal.fire({
                    title: 'Projeto não encontrado',
                    icon: 'error',
                    confirmButtonText: 'tentar novamente'
                })
            }
        });
    },[])

    //metodos
    function verMais(){
        setVerinfo(!verInfo);
    }

    function calculaMedia(){
        let cont = 0;
        for(let i = 0; i < notas.length; i++){
            cont += parseInt(notas[i].value);
        }
        let media = cont/notas.length
        return media;
    }

    function avaliar(){
        let m = calculaMedia();
        Swal.fire({
            title: 'confirmar a avaliação',
            text: (m * 0.1).toFixed(2),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'sim',
            cancelButtonText: 'não'
        }).then((result) => {
            if (result.isConfirmed) { 
                api.post('avaliacao/avaliar',{
                    "chave_projeto": projeto.chave,
                    "nome_projeto": projeto.nome,
                    "chave_avaliador": chave,
                    "nome_avaliador": nome,
                    "tipo_avaliador": "avaliador",
                    "nota":  (m * 0.1).toFixed(1),
                    "hora": new Date().toLocaleString(),
                    "turma": projeto.turma,
                    "curso": projeto.curso
                }).then(()=>{
                    Swal.fire({
                        title: 'Avaliação completa',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    }).then(() => {
                       
                        history.push({
                            pathname: '/avaliador-inicio',
                            state: {
                                chave:  chave,
                                nome:  nome,
                                instituicao:  instituicao,
                                projetos_avaliados: (projetosAvaliados + 1),
                                pode_avaliar: podeAvaliar
                            }
                        });
                
                        //local da avaliacao
                        /*
                        let dados = {};
                        if(projeto.qtd_avaliacoes === 0){
                            dados = {
                                "n1": parseFloat((m * 0.1).toFixed(2)),
                                "n2": projeto.n2,
                                "n3": projeto.n3,
                                "n4": projeto.n4,
                                "qtd_avaliacoes": projeto.qtd_avaliacoes + 1,
                                "nota_final": parseFloat((((m * 0.1) + projeto.nota_professor)/2).toFixed(2))
                            }
                        }else if(projeto.qtd_avaliacoes === 1){
                            dados = {
                                "n1": projeto.n1,
                                "n2": parseFloat((m * 0.1).toFixed(2)),
                                "n3": projeto.n3,
                                "n4": projeto.n4,
                                "qtd_avaliacoes": projeto.qtd_avaliacoes + 1,
                                "nota_final": parseFloat((((m * 0.1) + projeto.n1+ projeto.nota_professor)/3).toFixed(2))
                            }
                        }else if(projeto.qtd_avaliacoes === 2){
                            dados = {
                                "n1": projeto.n1,
                                "n2": projeto.n2,
                                "n3": parseFloat((m * 0.1).toFixed(2)),
                                "n4": projeto.n4,
                                "qtd_avaliacoes": projeto.qtd_avaliacoes + 1,
                                "nota_final": parseFloat((((m * 0.1) + projeto.n1 + projeto.n2+ projeto.nota_professor)/4).toFixed(2))
                            }
                        }else if(projeto.qtd_avaliacoes === 3){
                            dados = {
                                "n1": projeto.n1,
                                "n2": projeto.n2,
                                "n3": projeto.n3,
                                "n4": parseFloat((m * 0.1).toFixed(2)),
                                "qtd_avaliacoes": projeto.qtd_avaliacoes + 1,
                                "nota_final": parseFloat((((m * 0.1) + projeto.n1 + projeto.n2 + projeto.n3+ projeto.nota_professor)/5).toFixed(2))
                            }
                        }
    
                        api.post(`avaliacao/atualiza-nota-projeto/${projeto.chave}`,dados)
                        .then(()=>{
                            api.post(`avaliacao/atualiza-qtd-projetos/${chave}`,{
                               "qtd_avaliacoes":(projetosAvaliados + 1)
                            })
                            .then(()=>{
                                history.push({
                                    pathname: '/avaliador-inicio',
                                    state: {
                                        chave:  chave,
                                        nome:  nome,
                                        instituicao:  instituicao,
                                        projetos_avaliados: (projetosAvaliados + 1),
                                        pode_avaliar: podeAvaliar
                                    }
                                });
                            })
                        })
                        */
                    })
                }).catch(()=>{
                    Swal.fire({
                        title: 'Algo deu errado',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    }).then(() => {
                        history.push({
                            pathname: '/avaliador-inicio',
                            state: {
                                chave:  chave,
                                nome:  nome,
                                instituicao:  instituicao,
                                projetos_avaliados: projetosAvaliados,
                                pode_avaliar: podeAvaliar
                            }
                        });
                    })
                })
            }
        })
    }

    return(
        <div className="avaliadorAvaliacao">
            <div className="avaliadorAvaliacao-p1">
            <h2>{projeto.nome}</h2>
            </div>
            <div className="avaliadorAvaliacao-p2">
                <div className="cardProjeto-avaliador">
                    <p>{projeto.aluno1}</p>
                    {projeto.aluno2!=='null'?<p>{projeto.aluno2}</p>:<span></span>}
                    {projeto.aluno3!=='null'?<p>{projeto.aluno3}</p>:<span></span>}
                    {projeto.aluno4!=='null'?<p>{projeto.aluno4}</p>:<span></span>}
                   
                    <p></p>
                    {
                        verInfo?
                        <p className="info">
                            {projeto.descricao}
                        </p>
                        :
                        <p className="info"></p>
                    }

                    <button onClick={verMais}>{verInfo ?'ver menos':'ver mais'}</button>

                </div>  
            </div>
            <div className="avaliadorAvaliacao-p3">
                {
                    notas.map(({id, value}, index)=>{
                       
                        
                        return(
                            <div className="itemAvaliacao" key={id}>
                            <div className="texto">
                                <p>{criterios[index].criterio}</p>
                            </div>
                        
                            <div className="nota">
                                <h1>{ value < 100 ? (value * 0.1).toFixed(1) : (value * 0.1)}</h1>
                            </div>

                            <div className="entrada">
                                <input type="range" min="50" max="100" value={value} onChange={(e)=>{updateNotas(e,index)}}/>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
            <div className="avaliadorAvaliacao-p4">
                <button onClick={avaliar}>enviar avaliação</button>
                <Link to={{ 
                    pathname: '/avaliador-inicio',
                    state: {
                        chave:  chave,
                        nome:  nome,
                        instituicao:  instituicao,
                        projetos_avaliados: projetosAvaliados,
                        pode_avaliar: podeAvaliar
                    }}
                }>sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorAvaliacao;