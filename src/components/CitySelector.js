import React, { Component } from 'react';
import axios from 'axios';

class CitySelector extends Component {
    state = {
        cities: []
    }
    typingTimer;              
    keyUp = e => {
        var instruction = document.querySelector('.text-muted');
        var loader = document.querySelector('.loader');
        var namePrefix = e.target.value;

        clearTimeout(this.typingTimer);
        if (namePrefix.length > 3) {
            instruction.style.display = 'block';
            loader.style.display = 'block';
            this.typingTimer = setTimeout(() => {
                axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
                    params: {
                        limit: 10,
                        countryIds: this.props.countryCode,
                        namePrefix
                    },
                    headers: {
                        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                        "x-rapidapi-key": "b6fa25f36amsh243a7350b3e7967p14a420jsne313f3a87f80"
                    }
                }).then(doc => {
                    this.setState({cities:doc.data.data});
                    loader.style.display = 'none';
                });
                console.log('Run search');
            }, 2000);
        } else {
            instruction.style.display = 'none';
            loader.style.display = 'none';
        }
        
    }
    keyDown = e => {
        clearTimeout(this.typingTimer);
    }
    selectCity = (e, index) => {
        e.preventDefault();
        var instruction = document.querySelector('.text-muted');
        var selectedCity = this.state.cities[index];

        this.setState({cities:[]});
        document.querySelector('.city').value = selectedCity.name;
        instruction.style.display = 'none';
        
        this.props.selectedCity(selectedCity);
    }
    render() {
        return (
            <div className="CitySelector">
                <form>
                    <input onKeyUp={this.keyUp} onKeyDown={this.keyDown} className="city" type="text" placeholder="&#xF002;  Search for city" disabled="disabled"/>
                    <p className="text-muted">Please select your city from the list below</p>
                </form>
                <img alt="dummy-alt" className="loader" src="https://www.drupal.org/files/issues/throbber_12.gif"/>
                {this.state.cities.map((city, index) => {
                    return <button type="button" onClick={(e) => this.selectCity(e, index)} key={index} className="btn">{`${city.name}, ${city.countryCode}`}</button>
                })}
                
            </div>
        );
    }
}

export default CitySelector;