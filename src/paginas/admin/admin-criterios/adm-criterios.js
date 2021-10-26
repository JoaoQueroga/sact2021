import './adm-criterios.css'
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import api from '../../../configs/api'

function AdmCriterios(){
    const [criterios, setCriterios] = useState([1,1,1,1,1,1,1,1,1,1]);

    useEffect(()=>{
        api.get('...').then((res)=>{
            setCriterios(res.data);
        })
    },[])

    function excluirCriterio(c){
       
        Swal.fire({
            title: 'Excluir critério',
            text: c.nome,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'sim',
            cancelButtonText: 'não'
        }).then((result) => {
            if (result.isConfirmed) { 
                api.get(`criterios/excluir/${c.id}`).then(()=>{
                    
                    let criteriosAux = criterios; 
                    let index = criteriosAux.indexOf(c);
                    if(index > -1){
                        criteriosAux.splice(index, 1);
                    }
                    setCriterios([...criteriosAux]);
                    
                    Swal.fire({
                        title: 'Criterio excluido',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    })
                }).catch(()=>{
                    Swal.fire({
                        title: 'Erro na exclusão',
                        icon: 'error',
                        confirmButtonText: 'ok',
                    })
                })
            }
        })
    }

    return(
        <div className="admCriterios">
            <div className="topoCriterios">
                <h3>Critérios de informática</h3>
                <div className="menuCriterios">
                    <Link to="/admin-criterioCadastro">cadastrar</Link>
                    <Link className="btCancelar" to="/admin-criteriosCursos">voltar</Link>
                </div>
            </div>
            
            <div className="admCriteriosMain">
                {
                    criterios.map((c)=>{
                        return(
                            <div className="admCardCriterio">
                                
                                <div className="textoCriterio">
                                    <p>Mussum Ipsum, cacilds vidis litro abertis. Paisis, filhis, espiritis santis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Casamentiss faiz malandris se pirulitá.</p>
                                </div>
                                
                                <div className="statusCriterio">
                                    <p>peso 1</p>
                                </div>

                                <div className="botoesCriterio">
                                    <button>editar</button>
                                    <button onClick={()=>{excluirCriterio(c)}}>excluir</button>
                                </div>
                            
                            </div>
                        )
                    })
                
                
                }
            </div>
          

        </div>
    )
}

export default AdmCriterios;