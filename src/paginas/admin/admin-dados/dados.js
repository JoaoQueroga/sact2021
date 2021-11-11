import {useState, useEffect} from 'react';
import './dados.css';
import api from '../../../configs/api';
import {useHistory, useParams} from 'react-router-dom';
import Swal from 'sweetalert2'; // alerta

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

    const [qt0, setqt0] = useState(0);
    const [qt1, setqt1] = useState(0);
    const [qt2, setqt2] = useState(0);
    const [qt3, setqt3] = useState(0);
    const [qt4, setqt4] = useState(0);

    const [rk1, setRk1] = useState("");
    const [rk2, setRk2] = useState("");
    const [rk3, setRk3] = useState("");

    const [rkInfo1, setRkInfo1] = useState("");
    const [rkInfo2, setRkInfo2] = useState("");
    const [rkInfo3, setRkInfo3] = useState("");

    const [rkEletro1, setRkEletro1] = useState("");
    const [rkEletro2, setRkEletro2] = useState("");
    const [rkEletro3, setRkEletro3] = useState("");

    const [rkMeca1, setRkMeca1] = useState("");
    const [rkMeca2, setRkMeca2] = useState("");
    const [rkMeca3, setRkMeca3] = useState("");

    useEffect(()=>{
        api.get('projetos/avaliacoes-realizadas').then((res)=>{
           setProjetos(res.data);
           porcentagemProjetos(res.data);
           contagemProjetosAvaliados(res.data);
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
            defineRaking(res.data);
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

    function defineRaking(dados){

        console.log(dados);

        if(dados.length >= 3){
            setRk1(dados[0].nome);
            setRk2(dados[1].nome);
            setRk3(dados[2].nome);
        }else if(dados.length === 2){
            setRk1(dados[0].nome);
            setRk2(dados[1].nome);
        }else if(dados.length === 1){
            setRk1(dados[0].nome);
        }

        //raking por curso
        let info = [];
        let eletro = [];
        let meca = [];

        dados.forEach((p)=>{
            if(p.curso === 'info'){
                info.push(p);
            }else if(p.curso === 'eletro'){
                eletro.push(p);
            }else if(p.curso === 'meca'){
                meca.push(p);
            }
        })
        if(info.length >= 3){
            setRkInfo1(info[0].nome);
            setRkInfo2(info[1].nome);
            setRkInfo3(info[2].nome);
        }else if(info.length === 2){
            setRkInfo1(info[0].nome);
            setRkInfo2(info[1].nome);
        }else if(info.length === 1){
            setRkInfo1(info[0].nome);
        }
        if(eletro.length >= 3){
            setRkEletro1(eletro[0].nome);
            setRkEletro2(eletro[1].nome);
            setRkEletro3(eletro[2].nome);
        }else if(eletro.length === 2){
            setRkEletro1(eletro[0].nome);
            setRkEletro2(eletro[1].nome);
        }else if(eletro.length === 1){
            setRkEletro1(eletro[0].nome);
        }
        if(meca.length >= 3){
            setRkMeca1(meca[0].nome);
            setRkMeca2(meca[1].nome);
            setRkMeca3(meca[2].nome);
        }else if(meca.length === 2){
            setRkMeca1(meca[0].nome);
            setRkMeca2(meca[1].nome);
        }else if(meca.length === 1){
            setRkMeca1(meca[0].nome);
        }
    }
        

    function contagemProjetosAvaliados(dados){
        let cont0 = 0;
        let cont1 = 0;
        let cont2 = 0;
        let cont3 = 0;
        let cont4 = 0;

        dados.forEach((p)=>{
            switch(p.qtd_avaliacoes){
                case 0:
                    cont0++;
                    break;
                case 1:
                    cont1++;
                    break;
                case 2:
                    cont2++;
                    break;
                case 3:
                    cont3++;
                    break;
                case 4:
                    cont4++;
                    break;
                default:
                    break;
            }
        })
        setqt0(((cont0*100)/dados.length).toFixed(1));
        setqt1(((cont1*100)/dados.length).toFixed(1));
        setqt2(((cont2*100)/dados.length).toFixed(1));
        setqt3(((cont3*100)/dados.length).toFixed(1));
        setqt4(((cont4*100)/dados.length).toFixed(1));
    }


    function atualizar(){
        window.location.href=`/adm-dados/${opcao}`;
    }

    function voltar(){
        history.push('/adm-inicio');
    }

    function info(){
        Swal.fire({
            position: 'top-end',
            title: 'legenda',
            html:
            '<p style="text-align:left"><b style="color:#28ac49">VERD.</b> finalizado</p>' +
            '<p style="text-align:left"><b style="color:#65fa0f">AMAR.</b> avaliado, porém incompleto</p>' +
            '<p style="text-align:left"><b style="color:#ec601f">VERM.</b> sem avaliações</p>',
            confirmButtonText: 'entedi',
        })
    }

    function dequem(c, nome){
        api.get(`avaliacao/projeto/${c}`)
        .then((res)=>{
            
            let msg = '';
            if(res.data.length=== 0){
                msg = '<b>sem avaliações</b>'
            }else{
                res.data.forEach((av)=>{
                    msg += '<p style="text-align:left"><b>'+av.nota+'</b> - '+av.nome_avaliador+'</p>'
                })
            }

            Swal.fire({
                title: nome,
                html: msg,
                confirmButtonText: 'ok',
            })
        }).catch(()=>{
            Swal.fire({
                title: "ERRO",
                confirmButtonText: 'ok',
            })
        })
        
    }

    function quais(c, nome){
        api.get(`avaliacao/avaliador/${c}`)
        .then((res)=>{
            let msg = '';
            if(res.data.length=== 0){
                msg = '<b>sem avaliações</b>'
            }else{
                res.data.forEach((av)=>{
                    msg += '<p style="text-align:left"><b>'+av.nota+'</b> - '+av.nome_projeto+'</p>'
                })
            }

            Swal.fire({
                title: nome,
                html: msg,
                confirmButtonText: 'ok',
            })
        }).catch(()=>{
            Swal.fire({
                title: "ERRO",
                confirmButtonText: 'ok',
            })
        })
        
    }



    return(
        <div className="dados">
            <div className="dadosTopo">
                <button onClick={()=>escolheOpcao(1)} style={opcao===1?{"border":"5px solid #28ac49"}:{"border":"none"}}>dashboard</button>
                <button onClick={()=>escolheOpcao(2)} style={opcao===2?{"border":"5px solid #28ac49"}:{"border":"none"}}>projetos avaliados</button>
                <button onClick={()=>escolheOpcao(3)} style={opcao===3?{"border":"5px solid #28ac49"}:{"border":"none"}}>avaliadores</button>
                <button onClick={()=>escolheOpcao(4)} style={opcao===4?{"border":"5px solid #28ac49"}:{"border":"none"}}>avaliações</button>
                <button onClick={()=>escolheOpcao(5)} style={opcao===5?{"border":"5px solid #28ac49"}:{"border":"none"}}>ranking parcial</button>
            
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
                                    <h1>10%</h1>
                                    <p>10/100</p>
                                </div>
                                <div className="barra">
                                    <div className="fill" style={{"width":"67%"}}></div>
                                </div>
                                <p>[sem definição]</p>
                            </div>
                        </div>
                        <p>avaliações por projeto</p>
                        <div className="l2">
                            <div className="dl2">
                                <h2>{qt0}%</h2>
                                
                                <p>0 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>{qt1}%</h2>
                                
                                <p>1 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>{qt2}%</h2>
                               
                                <p>2 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>{qt3}%</h2>
                                
                                <p>3 avaliaçoes</p>
                            </div>
                            <div className="dl2">
                                <h2>{qt4}%</h2>
                               
                                <p>4 avaliaçoes</p>
                            </div>
                        </div>
                        <div className="l3">
                            <div className="dl3">
                                <p className="rkCurso1">{rkInfo1}</p>
                                <p className="rkCurso2">{rkInfo2}</p>
                                <p className="rkCurso3">{rkInfo3}</p>
                                <p className="rkInfo">Ranking Informatica</p>
                            </div>
                            <div className="dl3">
                                <p className="rkCurso1">{rkEletro1}</p>
                                <p className="rkCurso2">{rkEletro2}</p>
                                <p className="rkCurso3">{rkEletro3}</p>
                                <p className="rkInfo">Ranking Eletrônica</p>
                            </div>
                            <div className="dl3">
                                <p className="rkCurso1">{rkMeca1}</p>
                                <p className="rkCurso2">{rkMeca2}</p>
                                <p className="rkCurso3">{rkMeca3}</p>
                                <p className="rkInfo">Ranking Mecatrônica</p>
                            </div>
                        </div>
                        <div className="l4">
                            <div className="dl4">
                                <h3>{rk2}</h3>
                                <div id="palco2">
                                    <p>2°</p>
                                </div>
                            </div>
                            <div className="dl4">
                                <h3>{rk1}</h3>
                                <div id="palco1">
                                    <p>1°</p>
                                </div>
                            </div>
                            <div className="dl4">
                                <h3>{rk3}</h3>
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
                        <div id="info-rot"><p className="dadosRotulo">avaliações</p> <button onClick={info}>info</button></div>
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
                                    <div id="info-proj"><p>{p.qtd_avaliacoes}</p><button id="det" onClick={()=>dequem(p.chave, p.nome)}>de quem?</button></div>
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
                                    <div id="info-proj"><p>{p.projetos_avaliados}</p><button id="det" onClick={()=>quais(p.chave, p.nome)}>quais?</button></div>
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
                        <p className="dadosRotulo">T</p>
                        <p className="dadosRotulo">projeto</p>
                        <p className="dadosRotulo">prof.</p>
                        <p className="dadosRotulo">N1</p>
                        <p className="dadosRotulo">N2</p>
                        <p className="dadosRotulo">N3</p>
                        <p className="dadosRotulo">N4</p>
                        <p className="dadosRotulo">MF</p>
                    </div>
                    {
                        ranking.map((p)=>{
                            return(
                                <div className="dados-ranking" key={p.chave}>
                                    <p>{p.turma}</p>
                                    <p>{p.nome}</p>
                                    <p>{(p.nota_professor)}</p>
                                    <p>{p.n1!==0 ? parseFloat(p.n1):'-'}</p>
                                    <p>{p.n2!==0 ? parseFloat(p.n2):'-'}</p>
                                    <p>{p.n3!==0 ? parseFloat(p.n3):'-'}</p>
                                    <p>{p.n4!==0 ? parseFloat(p.n4):'-'}</p>
                                    <b><p>{(p.nota_final).toFixed(3)}</p></b>
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