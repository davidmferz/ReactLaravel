import React from "react";

const MyLayout = ({ children }) => {
    return (
        <div>
            <header className="bg-gray-300">
                <nav class="navigation">
                    <a href="#">Inicio| </a>
                    <a href="#">Acerca de| </a>
                    <a href="#">Servicios | </a>
                    <a href="#">Contacto | </a>
                </nav>
            </header>
            <main>{children}</main>
            <footer className="bg-indigo-200">
                <p>This is the footer.</p>
            </footer>
        </div>
    );
};

export default MyLayout;
