import React, {Component} from 'react';
import ImageAndWelcome from "../components/ImageAndWelcome";
import CityList from "../components/CityList";
import SearchCity from "../components/SearchCity";
import axios from 'axios';

class Home extends Component{
    constructor() {
        super();
        this.state = {
            keyword: "",
            FeaturedCities: null,
            citiesResultSearch: null,
            CityKeywordSearch: ""
        };
    }

    ChangeKeywordHandler = (event) => {
        this.setState({ keyword: event.target.value });
    };
    SearchHandler = () => {
        let keyword = this.state.keyword;
        var url = "https://developers.zomato.com/api/v2.1/cities"
        axios.get(url, {
            headers: {
                'user-key': 'ee8c2c150e8c245c779339b2d2ecbef4'
            },
            params: {
                q: keyword
            }
            })
            .then(({ data }) => {
                if (data.status === "succes") {
                    this.setState({
                        citiesResultSearch: data.location_suggestions,
                        keyword: " ",
                        CityKeywordSearch: keyword
                    })
                }
            }).catch(err => console.log(err));
    }
    
    GetFeaturedCities = () => {
        var url = "https://developers.zomato.com/api/v2.1/cities"
        axios.get(url, {
            headers: {
                'user-key' : 'ee8c2c150e8c245c779339b2d2ecbef4'
            },
            params:{
                city_ids : "74,11052,170"
            }
        })
        .then(({ data }) => {
            if (data.status === "success"){
                this.setState({
                    FeaturedCities: data.location_suggestions,
                })
            }
        }).catch(err => console.log(err));
    }
    componentDidMount() {
    this.GetFeaturedCities();
    }

    render() {
        const citiesDummy = [
            { id: 72, name: "Jakarta", country_name: "indonesia" },
            { id: 11052, name: "bandung", country_name: "Indonesia" },
            { id: 170, name: "Bali", country_name: "Indonesia" },
        ];
        return (
<>
            <ImageAndWelcome/>
             <div className = "container" style = {{ marginTop: 30, marginBottom: 30 }}>
             <CityList cities = {this.state.FeaturedCities} title={'Featured Cityes'}
             />
            <SearchCity
                value={this.state.keyword}
                onChange={this.ChangeKeywordHandler}
                onClickSearch={this.SearchHandler}
             /> 
            <CityList 
             title ={'Search Result'}
             cities={this.state.citiesResultSearch}
                        showSubtitle={true}
                        
             />
            </div>
            </>
        )
            
        
    }
}

export default Home;