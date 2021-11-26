import {Link, useHistory} from 'react-router-dom';
//import QrReader from 'react-qr-reader'; //qr code
import React,{useState, useEffect} from 'react';
import Swal from 'sweetalert2'; // alerta
import './avaliador.css';
import api from '../../configs/api';

function AvaliadorSelProjeto(props){
    
    const qtd_max_avaliacoes = 3;

    const history = useHistory();
    const [codigo, setCodigo] = useState('');

    //avaliador
    const [chave, setChave] = useState(11111);
    const [projetosAvaliados, setAvaliados] = useState(0);
    const[nome, setNome] = useState('');
    const[instituicao, setInstituicao] = useState('');
    const[podeAvaliar, setPodeAvaliar] = useState('');

    /*function handleScan(data) {
        if (data) {
            setCodigo(data);
        }
      }
    function handleError(err){
        console.error(err)
    }*/

    useEffect(()=>{ 
        setChave(props.location.state.chave);
        setAvaliados(props.location.state.projetos_avaliados);
        setNome(props.location.state.nome);
        setInstituicao(props.location.state.instituicao);
        setPodeAvaliar(props.location.state.pode_avaliar);
    },[])

    function avaliar(){
        if(codigo){
            api.get(`avaliacao/select-projeto/${codigo}`).then((res)=>{
                if(res.data.length > 0){
                    let pode = false;
                    if(res.data[0].curso === 'info' && (podeAvaliar === '100' || podeAvaliar === '110' || podeAvaliar === '101' || podeAvaliar === '111')){
                        pode = true;
                    }
                    if(res.data[0].curso === 'eletro' && (podeAvaliar === '010' || podeAvaliar === '110' || podeAvaliar === '011' || podeAvaliar === '111')){
                        pode = true;
                    }
                    if(res.data[0].curso === 'meca' && (podeAvaliar === '001' || podeAvaliar === '101' || podeAvaliar === '011' || podeAvaliar === '111')){
                        pode = true;
                    }
                    if(!pode){
                        setCodigo('');
                        Swal.fire({
                            title: res.data[0].nome,
                            text: 'não pode ser avaliado, encontre os projetos da sua área',
                            icon: 'error',
                            confirmButtonText: 'ok',
                        })
                    }else{
                        api.get(`avaliacao/projeto/${codigo}`).then((response)=>{
                            if(response.data.length < qtd_max_avaliacoes){
                                Swal.fire({
                                    title: res.data[0].nome,
                                    text: 'este é o projeto?',
                                    icon: 'question',
                                    confirmButtonText: 'avaliar',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                    history.push({ 
                                            pathname:'/avaliacao',
                                            state: {
                                                chave:  chave,
                                                nome:  nome,
                                                instituicao:  instituicao,
                                                projetos_avaliados: projetosAvaliados,
                                                pode_avaliar: podeAvaliar,
                                                codigo_projeto: codigo
                                            }
                                        });
                                    }
                                })
                            }else{
                                Swal.fire({
                                    title: 'Finalizado',
                                    text: 'Este projeto já recebeu o máximo de avaliações',
                                    icon: 'warning',
                                    confirmButtonText: 'ok',
                                })
                            }
                        })
                    }
                }else{
                    Swal.fire({
                        title: 'Projeto não encontrado',
                        icon: 'error',
                        confirmButtonText: 'tentar novamente'
                    })
                }
                
            }).catch(()=>{
                Swal.fire({
                    title: 'Erro ao buscar projeto',
                    text: codigo,
                    icon: 'error',
                    confirmButtonText: 'tentar novamente'
                })
            })
        }else{
            Swal.fire({
                title: 'sem código',
                text: 'informe um',
                icon: 'warning',
                confirmButtonText: 'entendido'
            })
        }
    }

    return(
        <div className="visitanteInicio">
            <div className="topoAvaliador">
                <h3>Seleção de projeto</h3>
            </div>
            <div className="mainAvaliador">
                {/*<div className="qr">
                    <QrReader
                    delay={500}
                    showViewFinder={false}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    />
                    </div>*/}
                <input type="number" placeholder="ex: 10001" value={codigo} onChange={(e)=>{setCodigo(e.target.value)}}/>
                <label>código do projeto</label>
                <button onClick={avaliar}>avaliar</button>
            </div>
            <div className="rodapeAvaliador">
                <Link to={{ 
                    pathname: '/avaliador-inicio',
                    state: {
                        chave:  chave,
                        nome:  nome,
                        instituicao:  instituicao,
                        projetos_avaliados: projetosAvaliados,
                        pode_avaliar: podeAvaliar
                    }}
                }>voltar</Link>
            </div>
        </div>
    )
}

export default AvaliadorSelProjeto;