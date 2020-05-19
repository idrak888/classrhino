import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';
import TeacherModule from './TeacherModule';
import FilterOptions from './FilterOptions';
import BookClass from './BookClass';
import illustration from '../../assets/illustration3.png';

import Fade from 'react-reveal/Fade';

class BrowseTeachers extends Component {
    state = {
        teachers: [],
        keywords: '',
        searchResults: [],
        countries: [],
        selectedTeacher: ''
    }
    componentDidMount() {
        const mainContainer = document.querySelector('.main-container');
        const loader = document.querySelector('.loader');
        var {filters} = this.props.match.params;

        mainContainer.style.display = 'none';
        loader.style.display = 'block';

        axios.get('https://restcountries.eu/rest/v2/all')
        .then(doc => {
            this.setState({countries:doc.data});
        }).catch(e => {
            console.log(e);
        });

        if (filters === 'all') {
            axios.get('https://classrhino-users.herokuapp.com/teachers/limit/20')
            .then(doc => {
                var teachers = doc.data.reverse();
                teachers = teachers.filter(teacher => teacher.approved === true);
                console.log(teachers);

                this.setState({teachers, searchResults: teachers});
                mainContainer.style.display = 'block';
                loader.style.display = 'none';
            }).catch(e => {
                console.log(e);
            });
        } else {
            filters = filters.split('&=');
            axios({
                method: 'POST',
                url: 'https://classrhino-users.herokuapp.com/teachers/filter',
                data: {
                    subject: filters[1],
                    grade: filters[0],
                    gender: '',
                    language: '',
                    country: ''
                }
            }).then(doc => {
                this.setState({searchResults:doc.data});
                console.log(doc.data);
                mainContainer.style.display = 'block';
                loader.style.display = 'none';
            }).catch(e => {
                console.log(e);
            });
        }
    }
    updateKeywords = e => {
        this.setState({keywords:e.target.value});
    }
    search = e => {
        e.preventDefault();
        const loader = document.querySelector('.loader');
        const mainContainer = document.querySelector('.main-container');

        mainContainer.style.display = 'none';
        loader.style.display = 'block';

        var keywords = this.state.keywords.toLowerCase();
        axios.get(`https://classrhino-users.herokuapp.com/teachers/search/${keywords}`)
        .then(doc => {
            this.setState({searchResults:doc.data.reverse()});
            mainContainer.style.display = 'block';
            loader.style.display = 'none';
            console.log(doc);
        }).catch(e => {
            console.log(e);
        });
    }
    viewAll = () => {
        window.location = '/browse/all';
    }
    toggleFilterOptions = e => {
        const FilterOptions = document.querySelector('.FilterOptions');
        const overlay = document.querySelector('.overlay');

        if (FilterOptions.style.display === 'none' || FilterOptions.style.display === '') {
            FilterOptions.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            FilterOptions.style.display = 'none';
            overlay.style.display = 'none';
        }
    }
    applyFilters = (country, language, gender, grade, subject) => {
        this.toggleFilterOptions();
        const mainContainer = document.querySelector('.main-container');
        const loader = document.querySelector('.loader');

        mainContainer.style.display = 'none';
        loader.style.display = 'block';

        axios({
            method: 'POST',
            url: 'https://classrhino-users.herokuapp.com/teachers/filter',
            data: {
                subject,
                grade,
                gender,
                language,
                country
            }
        }).then(doc => {
            this.setState({searchResults:doc.data});
            mainContainer.style.display = 'block';
            loader.style.display = 'none';
            window.scrollTo(0, 0);
        }).catch(e => {
            console.log(e);
        });
    }
    bookClass = teacher => {
        const SignInPopup = document.querySelector('.SignInPopup');
        const overlay = document.querySelector('.overlay');
        var userDoc = localStorage.getItem('userDoc');

        if (!userDoc || userDoc === '' || JSON.parse(userDoc).certificates) {
            SignInPopup.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'block';
            this.setState({selectedTeacher:teacher});
        }
    }
    closeModule = () => {
        const overlay = document.querySelector('.overlay');
        this.setState({selectedTeacher: ''});
        overlay.style.display = 'none';
    }
    bookClassModule = () => {
        if (this.state.selectedTeacher !== '') {
            return (
                <BookClass closeModule={this.closeModule} teacher={this.state.selectedTeacher}/>
            )
        }
    }
    render() {
        return (
            <div className="BrowseTeachers">
                <FilterOptions countries={this.state.countries} applyFilters={this.applyFilters} toggleFilterOptions={this.toggleFilterOptions}/>
                {this.bookClassModule()}
                <div className="SignInPopup modal">
                    <span className="title">Sign in with a student account to continue...</span>
                    <div className="container">
                        <img alt="dummy-alt" src={illustration} className="img-fluid" width="300"/>
                        <br/>
                        <a href="/signin"><button className="btn btn-success">Sign in</button></a>
                        <br/>
                        <h4>OR</h4>
                        <br/>
                        <a href="/student/register"><button className="btn btn-success">Create an account</button></a>
                    </div>
                </div>
                <div className="overlay"></div>
                <div className="top-bar">
                    <form onSubmit={this.search}>
                        <input value={this.state.keywords} type="text" onChange={this.updateKeywords} placeholder="Search by subjects"/><button onClick={this.search} className="btn btn-dark"><img alt="dummy-alt" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/search-512.png"/></button>
                    </form>
                    <div className="options">
                        <button className="btn btn-warning" onClick={this.toggleFilterOptions}>Filters</button>
                    </div>
                </div>
                <br/>
                <img alt="dummy-alt" className="loader" src="https://www.drupal.org/files/issues/throbber_12.gif"/>
                <div className="main-container">
                    <button onClick={this.viewAll} className="btn btn-dark">View all</button>
                    <h2>{this.state.searchResults.length} result(s) found</h2>
                    {this.state.searchResults.map(teacher => {
                        return (
                            <Fade>
                                <TeacherModule 
                                    rate={teacher.rate} 
                                    subjects={teacher.subjects} 
                                    languages={teacher.languages} 
                                    country={teacher.location.city.country} 
                                    city={teacher.location.city.name}
                                    flag={teacher.location.flag}
                                    grades={teacher.grades}
                                    profilePic={teacher.profilePic} 
                                    name={teacher.name}
                                    bookClass={() => this.bookClass(teacher)}
                                />
                            </Fade>
                        )    
                    })}
                </div>
            </div>
        );
    }
}

export default BrowseTeachers;