import './adm.css'
import {Link, useHistory} from 'react-router-dom';
import {useState} from 'react';
import Swal from 'sweetalert2';

function AdmAvaliadores(){
    return(
        <div className="admAvaliadores">
            <div className="admAvaliadoresTopo">
                <h2>Avaliadores</h2>
                <Link to="/cadastro-avaliador">cadastrar</Link>
            </div>
            <div className="admAvaliadoresMain">
                <div className="admCardAvaliador">
                    <div className="nomeAvaliador">
                        <p>nome do avaliador</p>
                    </div>
                    <div className="idAvaliador">
                        <p>20075</p>
                    </div>
                    <div className="botoesAvaliador">
                        <button>editar</button>
                        <button>excluir</button>
                    </div>
                    <div className="instAvaliador">
                        <p>UFAM</p>
                    </div>
                    <div className="statusAvaliador">
                        <p>4 avaliações</p>
                    </div>
                   
                </div>
                
            </div>
            <div className="admRodape">
                <Link to="/adm-inicio">voltar</Link>
            </div>

        </div>
    )
}

export default AdmAvaliadores;