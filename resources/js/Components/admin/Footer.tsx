export default function Footer() {
    return (
        <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
                <nav className="pull-left">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                ThemeKita
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Help
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Licenses
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="copyright">
                    2026, made with{" "}
                    <i className="fa fa-heart text-danger"></i> by{" "}
                    <a href="https://www.themekita.com" target="_blank">
                        ThemeKita
                    </a>
                </div>

                <div>
                    Distributed by{" "}
                    <a href="https://themewagon.com" target="_blank">
                        ThemeWagon
                    </a>
                </div>
            </div>
        </footer>
    );
}