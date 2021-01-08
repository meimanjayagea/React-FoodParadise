import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";


class App extends Component {
    render() {
        return ( 
        <>
            <Navbar/>
            <Home />
            <Footer />
           </>
        );
    }

}

export default App;