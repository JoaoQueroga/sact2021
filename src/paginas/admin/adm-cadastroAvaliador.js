import './adm.css'
import {useState} from 'react';
import Swal from 'sweetalert2';
import {Link, useHistory} from 'react-router-dom';

function AdmCadastroAvaliador(){
    const history = useHistory();

    function cadastraAvaliador(){
        history.push('/adm-avaliadores');
    }

    return(
        <div className="admAvaliadores">
            <div className="admAvaliadoresTopo">
                <h2>Cadastrar avaliador</h2>
               
            </div>
            <div className="admAvaliadoresMain">
                <div className="formulario">
                    <label>nome</label>
                    <input></input>
                    <label>instituição</label>
                    <input></input>
                    <label>chave</label>
                    <div>
                        <h1>1001</h1>
                    </div>
                </div>
            </div>
            <div className="admRodape">
                <button onClick={cadastraAvaliador}>cadastrar</button>
                <Link to="/adm-avaliadores">voltar</Link>
            </div>

        </div>
    )
}

export default AdmCadastroAvaliador;