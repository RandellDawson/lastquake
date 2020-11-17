import React, {Fragment, useState } from 'react'

import { MapDisplay } from '../../component/Map/MapDisplay'

import { options } from './Opitions'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

import './Landing.css'
// import { Search } from '../../component/Search/Search';


export const Landing = () => {
    const [ city, setCity ] = useState('')

    console.log(city)

    const handleSelect = (evt) =>{
        setCity(evt)
    }

    return (
        <Fragment>
            <main role="main">
                <section className="jumbotron text-center bg-color">
                    <div className="container">
                        <h1>Last<span className="main_text_color">Quake</span></h1>
                        <p className="lead text-muted">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, odio? Quasi, in voluptas! Ad laboriosam tempora quaerat aperiam eligendi, unde minus esse dignissimos, nemo vero cumque autem qui quos perferendis nihil maxime maiores inventore odit?
                        </p>
                        <p>
                            <a className="btn btn-secondary my2">Sign Up</a>
                            <a className="btn btn-secondary my2">Register</a>
                        </p>
                    </div>
                </section>
                <div className="container">
                    <DropdownButton
                        title="Citys"
                        id="dropdown-menu-align-end"
                        onSelect={handleSelect}
                     >
                            {
                                options.map(item => (
                                    <div>
                                        <Dropdown.Item eventKey={item.name} key={item.name}>{item.name}</Dropdown.Item>
                                        <Dropdown.Divider />
                                     </div>
                                ))
                            }
                
                    </DropdownButton>
                </div>
            </main>
            {
                city === "" ? <h1>Select a City</h1> : <MapDisplay city={city}/>
            }
             
        </Fragment>
        
    )
}

/*
    alpide
    los angeles
    oakland
    ring of fire
    san andreas fault
    Cape Mendicino
 */
