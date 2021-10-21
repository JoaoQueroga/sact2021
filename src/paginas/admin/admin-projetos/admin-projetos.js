import {Link} from 'react-router-dom';
import './admin-projetos.css';
import {useState} from 'react';

function AdminProjetos(){

    const [projetos, setProjetos] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]); 

    return(
        <div className="adminCursos">
            <div className="topo-adminCursos">
                <h2>Projetos de informática</h2>
                <div className="menuProjeto">
                    <Link to="/admin-projetoCadastro">cadastrar</Link>
                    <Link className="btCancelarProjeto" to="/admin-projetos-cursos">voltar</Link>
                </div>
            </div>
            <div className="main-adminCursos">
                {
                    projetos.map(()=>{
                        return(
                            <div className="cardProjeto">
                            <div className="nomeProjeto">
                                    <p>SACT 2021</p>
                            </div>
                            <div className="turmaProjeto">
                                <h3>3CI</h3>
                            </div>
                            <div className="alunosProjeto">
                                    <p>Joao queroga</p>
                                    <p>Pedro oliveira</p>
                                    <p>Hiago de jesus</p>
                                    <p>Dayvson silva</p>
                            </div>
                            <div className="descricaoProjeto">
                                    <p>
                                    Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. Leite de capivaris, leite de mula manquis sem cabeça. Interagi no mé, cursus quis, vehicula ac nisi. Aenean aliquam molestie leo, vitae iaculis nisl.
                                    </p>
                            </div>
                            <div className="botoesProjeto">
                                    <button>editar</button>
                                    <button>excluir</button>
                            </div>
                        </div>
                        )
                    })

                }
            </div>
        </div>
    )
}

export default AdminProjetos;