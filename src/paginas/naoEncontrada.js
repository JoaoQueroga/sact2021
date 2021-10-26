import {Link} from 'react-router-dom';
import './naoAuth.css';

function NaoExiste(){
    return(
        <div className="naoExiste">
            <h1>Ops! esta página não existe</h1>
            <Link to="/">aqui que tem uma que existe</Link>
        </div>
    )
}

export default NaoExiste;