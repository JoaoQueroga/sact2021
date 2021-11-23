import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import {autenticado} from './configs/auth';

//inicio
import Inicio from './paginas/inicio';
//avaliador
import AvaliadorLogin from './paginas/avaliadores/avaliadorLogin';
import AvaliadorInicio from './paginas/avaliadores/avaliador-inicio';
import AvaliadorSelProjeto from './paginas/avaliadores/avaliador-selProjeto';
import AvaliadorAvaliacao from './paginas/avaliadores/avaliador-avaliacao';
//professor
import ProfessorLogin from './paginas/professores/professorLogin';
import ProfessorInicio from  './paginas/professores/professor-inicio';
import ProfessorProjetos from './paginas/professores/professor-projetos';
import ProfessorProjetoCadastro from './paginas/professores/professor-cadastro-projeto';
import ProfessorAvaliacaoProjetos from  './paginas/professores/professor-avaliacao';
import ProfessorAvaliacao from './paginas/professores/professor-avaliacao-projeto';
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

import AdmProfessores from './paginas/admin/admin-professores/adm-professores';
import AdmCadastroProfessor from './paginas/admin/admin-professores/admin-professorCadastro';

import AdmCriterios from './paginas/admin/admin-criterios/adm-criterios';
import CriteriosCurso from './paginas/admin/admin-criterios/adm-criterioTurma';
import CriterioCadastro from './paginas/admin/admin-criterios/adm-criterioCadastro';

import Dados from './paginas/admin/admin-dados/dados';

import Relatorios from './paginas/admin/relatorios/relatorios';
import RelatoriosChaves from './paginas/admin/relatorios/chaves-projetos';

import NaoAuth from './paginas/naoAuth';
import NaoExiste from './paginas/naoEncontrada';

//rotas protegidas
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        autenticado() ? (
            <Component  {...props} />
        ) : (
          <Redirect to={{ pathname: "/naoauth", state: { from: props.location } }} />
        )
      }
    />
);

//rotas
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

                <PrivateRoute exact path="/avaliador-inicio" component={ AvaliadorInicio } />
                <PrivateRoute exact path="/avaliador-select" component={ AvaliadorSelProjeto } />
                <PrivateRoute exact path="/avaliacao" component={ AvaliadorAvaliacao } />

                <PrivateRoute exact path="/professor-inicio" component={ ProfessorInicio } />
                <PrivateRoute exact path="/professor-projetos" component={ ProfessorProjetos } />
                <PrivateRoute exact path="/professor-projeto-cadastro" component={ ProfessorProjetoCadastro } />
                <PrivateRoute exact path="/professor-projetos-avaliacao" component={ ProfessorAvaliacaoProjetos } />
                <PrivateRoute path="/professor-avaliacao/:chave" component={ ProfessorAvaliacao } />

                <Route exact path="/professor-login">
                    <ProfessorLogin/>
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

                <PrivateRoute exact path="/adm-inicio" component={ AdmInicio } />
                <PrivateRoute exact path="/adm-avaliadores" component={ AdmAvaliadores } />
                <PrivateRoute exact path="/cadastro-avaliador" component={ CadastroAvaliador } />
                <PrivateRoute exact path="/admin-projetos" component={ AdminProjetoCursos } />
                <PrivateRoute path="/admin-projetos/:curso" component={ AdminProjetos } />
                <PrivateRoute path="/admin-projetoCadastro/:curso" component={ ProjetoCadastro } />
                <PrivateRoute exact path="/admin-professores" component={ AdmProfessores } />
                <PrivateRoute exact path="/cadastro-professor" component={ AdmCadastroProfessor } />
                <PrivateRoute path="/admin-criterios/:curso" component={ AdmCriterios } />
                <PrivateRoute exact path="/admin-criteriosCursos" component={ CriteriosCurso } />
                <PrivateRoute exact path="/admin-criterioCadastro/:curso" component={ CriterioCadastro } />
                <PrivateRoute exact path="/adm-dados/:op" component={ Dados } />
                <PrivateRoute exact path="/adm-relatorios" component={ Relatorios } />
                <PrivateRoute exact path="/adm-relatorios-chaves" component={ RelatoriosChaves } />
            

                <Route exact path="/naoauth">
                    <NaoAuth/>
                </Route>

                <Route path="*">
                    <NaoExiste/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}


export default Rotas;
