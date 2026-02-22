import { Link } from 'react-router-dom';
import { Fa } from '../common/components/Fa.tsx';
import { faLock, faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import './home.scss';

export const Home = () => {

    const links = [
        { route: '/admin', label: 'Admin', icon: faLock },
        { route: '/health-check', label: 'Health Check', icon: faHeartbeat }
    ];

    return (
        <div className="container">
            <div data-testid="homeComponent" className="my-5 text-center">
                <h1>Welcome to the Home Page</h1>
            </div>
            <div className="row">
                {links.map((link) => (
                    <div className="col-2 home-link" key={link.label}>
                        <Link to={link.route}>
                            <div className="card">
                                <div className="card-body">
                                    <Fa icon={link.icon} className="fa-fw fs-1"></Fa>
                                </div>
                                <div className="card-footer text-center text-black">
                                    {link.label}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
