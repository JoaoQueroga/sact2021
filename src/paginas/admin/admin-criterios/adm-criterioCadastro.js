import './criterioCadastro.css';
import {useHistory, useParams} from 'react-router-dom';
import { useState } from 'react';
import api from '../../../configs/api';
import Swal from 'sweetalert2';

function CriterioCadastro(){

    const {curso} = useParams();
    const history = useHistory();

    function cancelar(){
        history.push(`/admin-criterios/${curso}`);
    }

    const [peso, setPeso] = useState(1);
    const [criterio, setCriterio] = useState('');

    function cadastrarCriterio(){
        console.log(criterio);
       
        if(peso && criterio){
            
            api.post('criterios/cadastra-criterio', {
                "criterio": criterio,
                "peso": peso,
                "curso": curso
            }).then(()=>{
                Swal.fire({
                    title: `Criterio de ${curso} cadastrado`,
                    icon: 'success',
                    confirmButtonText: 'ok',
                }).then((result) => {
                    history.push(`/admin-criterios/${curso}`);
                })
            })
        }else{
            Swal.fire({
                title: 'Preencha todos os campos',
                icon: 'warning',
                confirmButtonText: 'ok',
            })
        }
    }

    return(
        <div className="criterioadastro">
            <div className="criterioadastro">
                <h3>Cadastrar critério</h3>
            </div>
            <div className="criterioadastroMain">
                <div className="formularioCriterio">
                   
                    <label>descrição</label>
                    <div className="descricaoCriterioCadastro">
                        <textarea value={criterio} onChange={(e)=>setCriterio(e.target.value)}></textarea>
                    </div>
                    <label>peso</label>
                    <div className="descricaoPesoCadastro">
                        <input type="range" min="1" max="5" value={peso} onChange={(e)=>setPeso(e.target.value)}></input>
                        <div>
                            <h3>{peso}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="criterioadastroRodape">
                <button onClick={cadastrarCriterio}>cadastrar</button>
                <button onClick={cancelar} className="btCancelar">cancelar</button>
            </div>
        </div>
    )
}

export default CriterioCadastro;