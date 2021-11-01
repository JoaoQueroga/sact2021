import {useState, useEffect} from 'react';
import './dados.css';
import api from '../../../configs/api';
import {useHistory, useParams} from 'react-router-dom';


function Dados(){

    const {op} = useParams();
    const history = useHistory();

    const [projetos, setProjetos] = useState([]);
    const [avaliadores, setAvaliadores] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [ranking, setRanking] = useState([]);

    const [opcao, setOpcao] = useState(parseInt(op));

    //dashboard
    const [qtdProjs, setQtdProjs] = useState(0);
    const [qtdProjsAv, setQtdProjsAv] = useState(0);
    const [porcProjsAv, setPorcProjsAv] = useState(0);

    const [qtdAvs, setQtdAvs] = useState(0);
    const [qtdAvsAv, setQtdAvsAv] = useState(0);
    const [porcAvs, setPorcAvs] = useState(0);

    useEffect(()=>{
        api.get('projetos/avaliacoes-realizadas').then((res)=>{
           setProjetos(res.data);
           porcentagemProjetos(res.data);
        })
        api.get('avaliador/avaliacoes-realizadas').then((res)=>{
            setAvaliadores(res.data);
            porcentagemAvaliadores(res.data);
        })
        api.get('avaliacao/avaliacoes-log').then((res)=>{
            setAvaliacoes(res.data);
        })
        api.get('projetos/ranking-geral').then((res)=>{
            setRanking(res.data);
        })
    },[])


    function porcentagemProjetos(dados){
        setQtdProjs(dados.length);
        let cont = 0;
        dados.forEach(p => {
            if(p.qtd_avaliacoes > 0){
               cont++;
               
            }
        });
        setQtdProjsAv(cont);
        let porc = ((cont*100)/dados.length).toFixed(1);
        setPorcProjsAv(porc);
    }
    function porcentagemAvaliadores(dados){
        setQtdAvs(dados.length);
        let cont = 0;
        dados.forEach(p => {
            if(p.projetos_avaliados > 0){
               cont++;
            }
        });
        setQtdAvsAv(cont);
        let porc = ((cont*100)/dados.length).toFixed(1);
        setPorcAvs(porc);
    }

    function escolheOpcao(x){
        setOpcao(x);
    }

    function atualizar(){
        window.location.href=`/adm-dados/${opcao}`;
    }

    function voltar(){
        history.push('/adm-inicio');
    }

    function imprimir(){
        window.print();
    }

    return(
        <div className="dados">
            <div className="dadosTopo">
                <button onClick={()=>escolheOpcao(1)} style={opcao===1?{"border":"5px solid #28ac49"}:{"border":"none"}}>dashboard</button>
                <button onClick={()=>escolheOpcao(2)} style={opcao===2?{"border":"5px solid #28ac49"}:{"border":"none"}}>projetos avaliados</button>
                <button onClick={()=>escolheOpcao(3)} style={opcao===3?{"border":"5px solid #28ac49"}:{"border":"none"}}>avaliadores</button>
                <button onClick={()=>escolheOpcao(4)} style={opcao===4?{"border":"5px solid #28ac49"}:{"border":"none"}}>avaliações</button>
                <button onClick={()=>escolheOpcao(5)} style={opcao===5?{"border":"5px solid #28ac49"}:{"border":"none"}}>ranking parcial</button>
                <button id="btImprimir" onClick={imprimir}>imprimir</button>
                <button id="btAtualizar" onClick={atualizar}>atualizar</button>
                <button id="btSair" onClick={voltar}>voltar</button>
            </div>
            { //select main
                opcao===1?
                <div className="dadosMain">
                    <div className="dados-dashboard">
                        <div className="l1">
                            <div className="dl1">
                                <div className="l1-info">
                                    <h1>{porcProjsAv}%</h1>
                                    <p>{qtdProjsAv}/{qtdProjs}</p>
                                </div>
                                <div className="barra">
                                    <div className="fill" style={{"width":`${porcProjsAv}%`}}></div>
                                </div>
                                <p>projetos avaliados</p>
                            </div>
                            <div className="dl1">
                                <div className="l1-info">
                                    <h1>{porcAvs}%</h1>
                                    <p>{qtdAvsAv}/{qtdAvs}</p>
                                </div>
                                <div className="barra">
                                    <div className="fill" style={{"width":`${porcAvs}%`}}></div>
                                </div>
                                <p>part. avaliadores</p>
                            </div>
                            <div className="dl1">
                                <div className="l1-info">
                                    <h1>30%</h1>
                                    <p>10/100</p>
                                </div>
                                <div className="barra">
                                    <div className="fill" style={{"width":"67%"}}></div>
                                </div>
                                <p>indefinido</p>
                            </div>
                        </div>
                        <div className="l2">
                            <div className="dl2">
                                <h2>30%</h2>
                                <p> de projetos com</p>
                                <p>0 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>30%</h2>
                                <p> de projetos com</p>
                                <p>1 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>30%</h2>
                                <p> de projetos com</p>
                                <p>2 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>30%</h2>
                                <p> de projetos com</p>
                                <p>3 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>30%</h2>
                                <p> de projetos com</p>
                                <p>4 avaliaçoes</p>
                            </div>
                        </div>
                        <div className="l3">
                            <div className="dl3">
                                <p className="rkCurso1">projetos a</p>
                                <p className="rkCurso2">projetos b</p>
                                <p className="rkCurso3">projetos c</p>
                                <p className="rkInfo">Ranking Informatica</p>
                            </div>
                            <div className="dl3">
                                <p className="rkCurso1">projetos b</p>
                                <p className="rkCurso2">projetos c</p>
                                <p className="rkCurso3">projetos c</p>
                                <p className="rkInfo">Ranking Eletrônica</p>
                            </div>
                            <div className="dl3">
                                <p className="rkCurso1">projetos b</p>
                                <p className="rkCurso2">projetos c</p>
                                <p className="rkCurso3">projetos c</p>
                                <p className="rkInfo">Ranking Mecatrônica</p>
                            </div>
                        </div>
                        <div className="l4">
                            <div className="dl4">
                                <h3>projetos a</h3>
                                <div id="palco2">
                                    <p>2°</p>
                                </div>
                            </div>
                            <div className="dl4">
                                <h3>projetos b</h3>
                                <div id="palco1">
                                    <p>1°</p>
                                </div>
                            </div>
                            <div className="dl4">
                                <h3>projetos c</h3>
                                <div id="palco3">
                                    <p>3°</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :opcao===2?
                <div className="dadosMain">
                    <div className="dados-projetosAvaliados" style={{"background":" #faf9dc"}}>
                        <p className="dadosRotulo">nome</p>
                        <p className="dadosRotulo">turma</p>
                        <p className="dadosRotulo">avaliações</p>
                    </div>
                    {
                        projetos.map((p)=>{
                            return(
                                <div className="dados-projetosAvaliados" key={p.chave} 
                                style={p.qtd_avaliacoes >= 4 ? {"background":" #28ac49"}: 
                                p.qtd_avaliacoes === 0 ? {"background":"#ec601f"}:{"background":" #65fa0f"}}
                                >
                                    <p>{p.nome}</p>
                                    <p>{p.turma}</p>
                                    <p>{p.qtd_avaliacoes}</p>
                                </div>
                            )
                        })
                    }
                </div>
                :opcao===3?
                <div className="dadosMain">
                    <div className="dados-avaliadores" style={{"background":" #faf9dc"}}>
                        <p className="dadosRotulo">avaliador</p>
                        <p className="dadosRotulo">instituição</p>
                        <p className="dadosRotulo">avaliações</p>
                    </div>
                    {
                        avaliadores.map((p)=>{
                            return(
                                <div className="dados-avaliadores" key={p.chave} 
                                style={p.projetos_avaliados === 0 ? {"background":"#ec601f"}: 
                                {"background":"#65fa0f"}}
                                >
                                    <p>{p.nome}</p>
                                    <p>{p.instituicao}</p>
                                    <p>{p.projetos_avaliados}</p>
                                </div>
                            )
                        })
                    }
                </div>
                : opcao===4?
                <div className="dadosMain">
                    <div className="dados-avaliacoes" style={{"background":" #faf9dc"}}>
                        <p className="dadosRotulo">avaliador</p>
                        <p className="dadosRotulo">projeto</p>
                        <p className="dadosRotulo">turma</p>
                        <p className="dadosRotulo">hora</p>
                        <p className="dadosRotulo">nota</p>
                    </div>
                    {
                        avaliacoes.map((p)=>{
                            return(
                                <div className="dados-avaliacoes" key={p.id}>
                                    <p>{p.nome_avaliador}</p>
                                    <p>{p.nome_projeto}</p>
                                    <p>{p.turma}</p>
                                    <p>{p.hora_avaliacao}</p>
                                    <p>{p.nota}</p>
                                </div>
                            )
                        })
                    }
                </div>
                : opcao===5?
                <div className="dadosMain">
                    <div className="dados-ranking" style={{"background":" #faf9dc"}}>
                        <p className="dadosRotulo">turma</p>
                        <p className="dadosRotulo">projeto</p>
                        <p className="dadosRotulo">professor</p>
                        <p className="dadosRotulo">avaliador</p>
                        <p className="dadosRotulo">nota final</p>
                    </div>
                    {
                        ranking.map((p)=>{
                            return(
                                <div className="dados-ranking" key={p.chave}>
                                    <p>{p.turma}</p>
                                    <p>{p.nome}</p>
                                    <p>{parseFloat(p.nota_professor).toFixed(3)}</p>
                                    <p>{parseFloat(p.nota_avaliador).toFixed(3)}</p>
                                    <p>{((p.nota_avaliador + p.nota_professor)/2).toFixed(3)}</p>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <span></span>
            }
        </div>
    )
}

export default Dados;