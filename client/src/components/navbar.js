import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img style={{ height: 48 }} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupported Content">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/create">
                                Create Record
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            </div>

        </nav>

    )
}
