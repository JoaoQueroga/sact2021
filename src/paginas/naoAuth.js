import {Link} from 'react-router-dom';
import './naoAuth.css';

function NaoAuth(){
    return(
        <div className="naoAuth">
            <h1>Você não tem permissão para vir aqui :)</h1>
            <Link to="/">faça o login</Link>
        </div>
    )
}

export default NaoAuth;