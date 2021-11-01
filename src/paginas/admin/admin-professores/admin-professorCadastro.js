import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import api from '../../../configs/api';
import './professorCadastro.css';

function AdmCadastroProfessor(){
    const history = useHistory();

    const [chave, setChave] = useState(11111);
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');

    function cadastraProfessor(){
        if(nome && curso && curso!=='-'){
            api.post('professor/atualizaChave',{
                "novaChave": parseInt(chave)
            }).then(()=>{
            api.post('professor/cadastra-professor', {
                    "chave": chave,
                    "nome": nome,
                    "curso": curso
            }).then(()=>{
                    Swal.fire({
                        title: 'Professor cadastrado',
                        icon: 'success',
                        confirmButtonText: 'ok',
                    }).then((result) => {
                        history.push('/admin-professores');
                    })
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

    useEffect(()=>{
        api.get('professor/pegaChave').then((res)=>{
           setChave(res.data.chave);
        })
    },[])

    function cancelar(){
        history.push('/admin-professores');
    }

    return(
        <div className="admCadastroProfessor">
            <div className="admCadastroProfessorTopo">
                <h3>Cadastrar professor</h3>
            </div>
            <div className="admCadastroProfessorMain">
                <div className="formulario">
                    <label>nome</label>
                    <input value={nome} onChange={(e)=>setNome(e.target.value)}></input>
                    <label>curso</label>
                    <select value={curso} onChange={(e)=>setCurso(e.target.value)}>
                        <option>-</option>
                        <option value="info">Informática</option>
                        <option value="eletro">Eletrônica</option>
                        <option value="meca">Mecatrônica</option>
                    </select>
                    <label>chave</label>
                    <div>
                        <h1>{chave}</h1>
                    </div>
                </div>
            </div>
            <div className="admCadastroRodape">
                <button onClick={cadastraProfessor}>cadastrar</button>
                <button onClick={cancelar} className="btCancelar">cancelar</button>
            </div>

        </div>
    )
}

export default AdmCadastroProfessor;