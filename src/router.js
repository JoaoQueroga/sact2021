import {BrowserRouter, Route, Switch} from 'react-router-dom';

//inicio
import Inicio from './paginas/inicio';
//avaliador
import AvaliadorLogin from './paginas/avaliadores/avaliadorLogin';
import AvaliadorInicio from './paginas/avaliadores/avaliador-inicio';
import AvaliadorSelProjeto from './paginas/avaliadores/avaliador-selProjeto';
import AvaliadorAvaliacao from './paginas/avaliadores/avaliador-avaliacao';
//professor
import ProfessorLogin from './paginas/professores/professorLogin';
import ProfessorSelecionaProjeto from  './paginas/professores/professor-selecionaProjeto';
//visitante
import VisitanteInicio from './paginas/visitante/visitante-inicio';
import VisitanetSelect from './paginas/visitante/visitante-selecionaProjeto';
import VisitanteAvaliacao from './paginas/visitante/visitante-avaliacao';
//admin
import AdmLogin from './paginas/admin/adm-login';
import AdmInicio from './paginas/admin/adm-inicio';
import AdmAvaliadores from './paginas/admin/admin-avaliadores/admin-avaliadores';
import CadastroAvaliador from './paginas/admin/admin-avaliadores/adm-cadastroAvaliador';

import AdminProjetoCursos from './paginas/admin/admin-projetos/admin-projetoCurso';
import AdminProjetos from './paginas/admin/admin-projetos/admin-projetos';
import ProjetoCadastro from './paginas/admin/admin-projetos/admin-projetoCadastro';


function Rotas(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Inicio/>
                </Route>
                <Route exact path="/avaliador-login">
                    <AvaliadorLogin/>
                </Route>
                <Route exact path="/avaliador-inicio">
                    <AvaliadorInicio/>
                </Route>
                <Route exact path="/avaliador-select">
                    <AvaliadorSelProjeto/>
                </Route>
                <Route exact path="/avaliacao">
                    <AvaliadorAvaliacao/>
                </Route>

                <Route exact path="/professor-login">
                    <ProfessorLogin/>
                </Route>
                <Route exact path="/professor-select">
                    <ProfessorSelecionaProjeto/>
                </Route>

                <Route exact path="/visitante-inicio">
                    <VisitanteInicio/>
                </Route>
                <Route exact path="/visitante-select">
                    <VisitanetSelect/>
                </Route>
                <Route exact path="/visitante-avaliacao">
                    <VisitanteAvaliacao/>
                </Route>

                <Route exact path="/adm-login">
                    <AdmLogin/>
                </Route>
                <Route exact path="/adm-inicio">
                    <AdmInicio/>
                </Route>
                <Route exact path="/adm-avaliadores">
                    <AdmAvaliadores/>
                </Route>
                <Route exact path="/cadastro-avaliador">
                    <CadastroAvaliador/>
                </Route>
                <Route exact path="/admin-projetos-cursos">
                    <AdminProjetoCursos/>
                </Route>
                <Route exact path="/admin-projetos">
                    <AdminProjetos/>
                </Route>
                <Route exact path="/admin-projetoCadastro">
                    <ProjetoCadastro/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}


export default Rotas;
