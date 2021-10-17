import {Link, useHistory} from 'react-router-dom';
import QrReader from 'react-qr-reader'; //qr code
import React,{useState} from 'react';
import Swal from 'sweetalert2'; // alerta
import './avaliador.css';

function AvaliadorSelProjeto(){
    
    const history = useHistory();
    const [codigo, setCodigo] = useState('');

    function handleScan(data) {
        if (data) {
            setCodigo(data);
        }
      }
    function handleError(err){
        console.error(err)
    }

    function avaliar(){
        if(codigo){
            Swal.fire({
                title: 'projeto',
                text: codigo,
                icon: 'question',
                confirmButtonText: 'avaliar'
            }).then((result) => {
                if (result.isConfirmed) {
                  history.push('/avaliacao');
                }
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
                <Link to="/avaliador-inicio">voltar</Link>
            </div>
        </div>
    )
}

export default AvaliadorSelProjeto;