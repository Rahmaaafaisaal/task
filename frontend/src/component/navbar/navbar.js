import React from 'react';

class Navbar extends React.Component {


    render() {
        return (

            <nav className="navbar sticky-top">
                <a href="/" style={{color:"darkred" , fontWeight:"bold"}} className="navbar-brand" >CityStars</a>
            </nav>
        )

    }

}
export default Navbar;