import { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './avaliacao.css';
import Swal from 'sweetalert2'; // alerta

function AvaliadorAvaliacao(){
    
    //state dinamico notas
    const [notas, setNotas] = useState([]);
    
    function updateNotas({target}, index) {
        const notasCopy = Array.from(notas);
        notasCopy.splice(index, 1, { id: index, value: target.value });
        setNotas(notasCopy);
    }

    //states comuns
    const history = useHistory();
    const [criterios, setCriterios] = useState([])
    const [verInfo, setVerinfo] = useState(false);

    //ciclo de vida

    function criaNotas(x){
        let notasCopy = [] //copia o array
        for(let i = 0; i < x; i++){
            notasCopy.push({id: i, value: 50}); // add no array copia
        }
        setNotas(notasCopy); // atualiza o state
    }

    useEffect(()=>{
        criaNotas(4); // cria notas para 3 itens 
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
                Swal.fire({
                    title: 'Avaliação completa',
                    icon: 'success',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    history.push('/');
                })
            }
        })
    }

    return(
        <div className="avaliadorAvaliacao">
            <div className="avaliadorAvaliacao-p1">
                <h2>Higia</h2>
            </div>
            <div className="avaliadorAvaliacao-p2">
                <div className="cardProjeto-avaliador">
                    <p>aluno da silva sauro</p>
                    <p>aluno da pereira silva</p>
                    <p>aluno xavier fonseca</p>
                    <p></p>
                    {
                        verInfo?
                        <p className="info">
                            Existem muitas variações disponíveis de passagens de Lorem Ipsum, mas a maioria sofreu algum tipo de alteração Existem muitas variações disponíveis de passagens de Lorem Ipsum, mas a maioria sofreu algum tipo de alteração
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
                                <p>Existem muitas variações disponíveis de passagens de Lorem Ipsum, mas a maioria sofreu algum tipo de alteração?</p>
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
                <Link to="/avaliador-inicio">sair</Link>
            </div>
        </div>
    )
}

export default AvaliadorAvaliacao;