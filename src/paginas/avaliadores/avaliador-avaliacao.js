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

        api.get(`avaliacao/select-projeto/${props.location.state.codigo_projeto}`).then((res)=>{
            if(res.data.length > 0){

                let proj = {
                    'chave': res.data[0].chave,
                    'nome': res.data[0].nome,
                    'a1': res.data[0].aluno1,
                    'a2': res.data[0].aluno2,
                    'a3': res.data[0].aluno3,
                    'a4': res.data[0].aluno4,
                    'descricao': res.data[0].descricao,
                    'nota_prof': res.data[0].nota_professor,
                    'nota_avaliador': res.data[0].nota_avaliador,
                    'qtd_avaliacoes': res.data[0].qtd_avaliacoes,
                    'turma': res.data[0].turma,
                    'curso': res.data[0].curso,
                    'nota_acumulada':res.data[0].nota_acumulada
                }
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
            text: (m * 0.1).toFixed(1),
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
                        //formula da nota NotaAtual += NovaNota / qtdNotasAtual + 1
                       
                        let contNotas = parseFloat(projeto.nota_acumulada) + (m * 0.1);
                        let n = (contNotas)/(parseInt(projeto.qtd_avaliacoes) + 1);
    
                        api.post(`avaliacao/atualiza-nota-projeto/${projeto.chave}`,{
                            "nota_avaliador": parseFloat(n.toFixed(3)),
                            "qtd_avaliacoes": projeto.qtd_avaliacoes + 1,
                            "nota_acumulada": parseFloat(contNotas.toFixed(3))
                        }).then(()=>{
                            api.post(`avaliacao/atualiza-qtd-projetos/${chave}`,{
                                "qtd_avaliacoes": parseInt(projetosAvaliados) + 1
                            }).then(()=>{
                                history.push({
                                    pathname: '/avaliador-inicio',
                                    state: {
                                        chave:  chave,
                                        nome:  nome,
                                        instituicao:  instituicao,
                                        projetos_avaliados: (projetosAvaliados + 1)
                                    }
                                });
                            });
                        })
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
                                projetos_avaliados: projetosAvaliados
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
                    <p>{projeto.a1}</p>
                    {projeto.a2!=='null'?<p>{projeto.a2}</p>:<span></span>}
                    {projeto.a3!=='null'?<p>{projeto.a3}</p>:<span></span>}
                    {projeto.a4!=='null'?<p>{projeto.a4}</p>:<span></span>}
                   
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
                        projetos_avaliados: projetosAvaliados
                    }}
                }>sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorAvaliacao;