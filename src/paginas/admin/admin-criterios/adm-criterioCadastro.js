import './criterioCadastro.css';
import {useHistory} from 'react-router-dom';
import { useState } from 'react';

function CriterioCadastro(){

    const history = useHistory();

    function cancelar(){
        history.push('/admin-criterios');
    }

    const [peso, setPeso] = useState(1);

    return(
        <div className="criterioadastro">
            <div className="criterioadastro">
                <h3>Cadastrar critério</h3>
               
            </div>
            <div className="criterioadastroMain">
                <div className="formularioCriterio">
                   
                    <label>descrição</label>
                    <div className="descricaoCriterioCadastro">
                        <textarea></textarea>
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
                <button >cadastrar</button>
                <button onClick={cancelar} className="btCancelar">cancelar</button>
            </div>
        </div>
    )
}

export default CriterioCadastro;