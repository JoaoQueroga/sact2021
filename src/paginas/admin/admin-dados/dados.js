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

    useEffect(()=>{
        api.get('projetos/avaliacoes-realizadas').then((res)=>{
           setProjetos(res.data);
        })
        api.get('avaliador/avaliacoes-realizadas').then((res)=>{
            setAvaliadores(res.data);
        })
        api.get('avaliacao/avaliacoes-log').then((res)=>{
            setAvaliacoes(res.data);
        })
        api.get('projetos/ranking-geral').then((res)=>{
            setRanking(res.data);
        })
    },[])

    function escolheOpcao(x){
        setOpcao(x);
    }


    function atualizar(){
        window.location.href=`/adm-dados/${opcao}`;
    }

    function voltar(){
        history.push('/adm-inicio');
    }

    return(
        <div className="dados">
            <div className="dadosTopo">
                <button onClick={()=>escolheOpcao(1)} style={opcao=='1'?{"border":"5px solid #28ac49"}:{"border":"none"}}>dashboard</button>
                <button onClick={()=>escolheOpcao(2)} style={opcao=='2'?{"border":"5px solid #28ac49"}:{"border":"none"}}>projetos avaliados</button>
                <button onClick={()=>escolheOpcao(3)} style={opcao=='3'?{"border":"5px solid #28ac49"}:{"border":"none"}}>avaliadores</button>
                <button onClick={()=>escolheOpcao(4)} style={opcao=='4'?{"border":"5px solid #28ac49"}:{"border":"none"}}>avaliações</button>
                <button onClick={()=>escolheOpcao(5)} style={opcao=='5'?{"border":"5px solid #28ac49"}:{"border":"none"}}>ranking parcial</button>
                <button id="btAtualizar" onClick={atualizar}>atualizar</button>
                <button id="btSair" onClick={voltar}>voltar</button>
            </div>
            { //select main
                opcao===2?
                <div className="dadosMain">
                    <div className="dados-projetosAvaliados" style={{"background":" #faf9dc"}}>
                        <p>NOME</p>
                        <p>TURMA</p>
                        <p>AVALIAÇÕES</p>
                    </div>
                    {
                        projetos.map((p)=>{
                            return(
                                <div className="dados-projetosAvaliados" key={p.chave} 
                                style={p.qtd_avaliacoes >= 5 ? {"background":" #28ac49"}: 
                                p.qtd_avaliacoes == 0 ? {"background":"#ec601f"}:{"background":" #65fa0f"}}
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
                        <p>AVALIADOR</p>
                        <p>INSTITUIÇÃO</p>
                        <p>AVALIAÇÕES</p>
                    </div>
                    {
                        avaliadores.map((p)=>{
                            return(
                                <div className="dados-avaliadores" key={p.chave} 
                                style={p.projetos_avaliados == 0 ? {"background":"#ec601f"}: 
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
                        <p>AVALIADOR</p>
                        <p>PROJETO</p>
                        <p>TURMA</p>
                        <p>HORA</p>
                        <p>NOTA</p>
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
                        <p>PROJETO</p>
                        <p>PROFESSOR</p>
                        <p>AVALIADOR</p>
                        <p>NOTA FINAL</p>
                    </div>
                    {
                        ranking.map((p)=>{
                            return(
                                <div className="dados-ranking" key={p.chave}>
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