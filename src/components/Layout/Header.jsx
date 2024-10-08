import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import { AuthContext } from '../../contexts/AuthContext';
import { useAuth } from "../../contexts/AuthContext";
import drstrange from '../../assets/drstrange.png';
import musica from '../../assets/musica.png'
import { DataContext } from '../../contexts/DataContext';


//const isAuthenticated = localStorage.getItem("authToken") !== null;

//const [userData, setUserData] = useState(null);
//const { token } = useAuth("state");
//setUserData(getProfile(token));

const Header = () => {
  const { logout } = useAuth("actions");
  const { isAuthenticated } = useAuth("state");
  //const {actions} = useContext(AuthContext);
  const { profileData } = useContext(DataContext);


  return (
    <header className="navbar is-dark">
       <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img className='is-rounded'
            src={musica} alt="Logo" />
          </Link>
          <a className ="button" ><Link to="/">Home</Link></a>
        </div>

        {isAuthenticated ? (
                          <>
                            
                            <div className="navbar-end">
                              
                              <p className='subtitle is-size-6'>{profileData.email}</p>
                              <Link to="/profile" className="navbar-item">

                                <figure className="image is-35x35">
                                  <img className="is-rounded" src={drstrange} alt="User profile" />
                                </figure>
                                <span>  </span>
                              </Link>
                            </div>

                            <a className ="button"> <Link to="/profile"> Perfil </Link> </a>
                            <button className="button is-danger is-outlined" onClick={logout}> Salir </button>
                            
                          </>
                        ) : ( 
                          <div className="navbar-end">
                                <button className="button is-primary is-light">
                                              <Link to="/login">Iniciar Sesion</Link>
                                </button>
                          </div>
                        )}
      
    </header>
  );
};

export default Header;
