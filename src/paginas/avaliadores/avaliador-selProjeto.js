import {Link, useHistory} from 'react-router-dom';
import QrReader from 'react-qr-reader'; //qr code
import React,{useState, useEffect} from 'react';
import Swal from 'sweetalert2'; // alerta
import './avaliador.css';
import api from '../../configs/api';

function AvaliadorSelProjeto(props){
    
    const qtd_max_avaliacoes = 5;

    const history = useHistory();
    const [codigo, setCodigo] = useState('');

    //avaliador
    const [chave, setChave] = useState(11111);
    const [projetosAvaliados, setAvaliados] = useState(0);
    const[nome, setNome] = useState('');
    const[instituicao, setInstituicao] = useState('');

    function handleScan(data) {
        if (data) {
            setCodigo(data);
        }
      }
    function handleError(err){
        console.error(err)
    }

    useEffect(()=>{ 
        setChave(props.location.state.chave);
        setAvaliados(props.location.state.projetos_avaliados);
        setNome(props.location.state.nome);
        setInstituicao(props.location.state.instituicao);
    },[])

    function avaliar(){
        if(codigo){

           

            api.get(`avaliacao/select-projeto/${codigo}`).then((res)=>{
                if(res.data.length > 0){
                    api.get(`avaliacao/cont-avaliacoes/${codigo}`).then((response)=>{
                        if(response.data[0].cont < qtd_max_avaliacoes){
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
                <p>Escaneie o QR Code ou digite o código</p>
            </div>
            <div className="mainAvaliador">
                <div className="qr">
                    <QrReader
                    delay={500}
                    showViewFinder={false}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                    />
                </div>
                <input type="text" placeholder="ex: 1001" value={codigo} onChange={(e)=>{setCodigo(e.target.value)}}/>
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
                        projetos_avaliados: projetosAvaliados
                    }}
                }>voltar</Link>
            </div>
        </div>
    )
}

export default AvaliadorSelProjeto;