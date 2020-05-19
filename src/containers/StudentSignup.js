import React from 'react';
import '../styles/Signup.css';
import illustration3 from '../assets/illustration3.png';
import axios from 'axios';
import CitySelector from '../components/CitySelector';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import * as firebase from 'firebase';

class StudentSignup extends React.Component {
    state = {
        countries: [],
        selectedCountry: {},
        selectedCity: {},
        days: [],
        years: [],
        birthDate: {day: '', month: '', year: ''}
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(doc => {
            var currentYear = new Date().getFullYear();
            var years = [];
            var days = [];

            for (let i=currentYear;i>=(currentYear-50);i--) {
                years.push(i);
            }
            console.log(years);
            for (let i=0;i<=31;i++) {
                days.push(i);
            }
            this.setState({countries:doc.data, days, years});
        }).catch(e => {
            console.log(e);
        });
    }

    handleCountrySelection = e => {
        const city = document.querySelector('.city');
        this.props.values.country = e.target.value;

        if (e.target.value !== 'unselected') {
            city.disabled = false;
            var selectedCountry = this.state.countries.find(country => {
                return country.name === e.target.value;
            });

            this.setState({selectedCountry});
        } else {
            city.disabled = true;
        }
    }

    handleCitySelect = selectedCity => {
        this.props.values.city = selectedCity;
    }

    handleDateInput = e => {
        var dateAttr = e.target.classList[0];
        var birthDate = this.state.birthDate;

        switch(dateAttr) {
            case 'day':
                birthDate.day = e.target.value;
                break;
            case 'month':
                birthDate.month = e.target.value;
                break;
            case 'year':
                birthDate.year = e.target.value;
                break;
            default:
                return false;
        }

        if (birthDate.day !== '' && birthDate.month !== '' && birthDate.year !== '') {
            var dateStr = `${birthDate.day}/${birthDate.month}/${birthDate.year}`;
            document.querySelector('.birthDateDisplay').innerHTML = dateStr;
            this.props.values.birthDate = dateStr;
        } else {
            document.querySelector('.birthDateDisplay').innerHTML = '';
            this.props.values.birthDate = '';
        }

        this.setState({birthDate});
    }
    render() {
        return (
            <div className="StudentSignup">
                <img alt="dummy-alt" src={illustration3} className="illustration"/>
                <h1>Sign up as a student</h1>
                <p><a href="/teacher/register">Want to teach instead?</a></p>
                <br/>
                <Form>
                    <div className="form info">
                        <h4>Student information</h4>
                        <Field className={this.props.touched.name && this.props.errors.name && "error"} name="name" type="text" placeholder="Full name"/> 
                        { this.props.touched.name && this.props.errors.name && <p className="text-danger">{this.props.errors.name}</p> }
                        
                        <Field className={this.props.touched.gender && this.props.errors.gender && "error"} component="select" name="gender">
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Field>
                        { this.props.touched.gender && this.props.errors.gender && <p className="text-danger">{this.props.errors.gender}</p> }

                        <input className="label" value="Birth date" disabled/>
                        <div className="row dropdowns">
                            <div className="col-xs-4">
                                <select className="day" onChange={this.handleDateInput}>
                                   <option value="">Day</option>
                                   {this.state.days.map(day => {
                                       return <option value={day}>{day}</option>
                                   })}
                                </select>
                            </div>
                            <div className="col-xs-4">
                                <select className="month" onChange={this.handleDateInput}>
                                    <option value="">Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className="col-xs-4">
                                <select className="year" onChange={this.handleDateInput}>
                                    <option value="">Year</option>
                                    {this.state.years.map(year => {
                                        return <option value={year}>{year}</option>
                                    })}
                                </select>
                            </div>
                            <br/>
                            <p className="birthDateDisplay"></p>
                        </div>

                        <Field className={this.props.touched.grade && this.props.errors.grade && "error"} name="grade" type="text" placeholder="Current grade, class or level"/> 
                        { this.props.touched.grade && this.props.errors.grade && <p className="text-danger">{this.props.errors.grade}</p> }

                    </div>
                    <div className="form location">
                        <h4>Country and region</h4>
                        <Field className={this.props.touched.country && this.props.errors.country && "error"} component="select" name="country" onChange={this.handleCountrySelection}>
                            <option value="unselected">Country</option>
                            {this.state.countries.map(country => {
                                return <option value={country.name}>{country.name}</option>
                            })}
                        </Field>
                        { this.props.touched.country && this.props.errors.country && <p className="text-danger">{this.props.errors.country}</p> }
                            
                        <CitySelector selectedCity={this.handleCitySelect} countryCode={this.state.selectedCountry.alpha2Code}/>
                    </div>
                    <div className="form credentials">
                        <h4>Account credentials</h4>
                        <Field className={this.props.touched.email && this.props.errors.email && "error"} name="email" type="email" placeholder="Email"/>
                        { this.props.touched.email && this.props.errors.email && <p className="text-danger">{this.props.errors.email}</p> }

                        <hr/>
                        <Field className={this.props.touched.password && this.props.errors.password && "error"} name="password" type="password" placeholder="Password"/> 
                        { this.props.touched.password && this.props.errors.password && <p className="text-danger">{this.props.errors.password}</p> }        

                        <Field className={this.props.touched.conPassword && this.props.errors.conPassword && "error"} name="conPassword" type="password" placeholder="Confirm password"/>  
                        <button id="signup" className="btn btn-success">Sign up!</button>   
                        <p className="text-danger authError"></p>
                    </div>
                </Form>
            </div>
        )
    }
}

const FormikApp = withFormik({
    mapPropsToValues() {
        return {
            name: '',
            gender: '',
            grade: '',
            birthDate: '',
            country: '',
            city: {},
            email: '',
            password: '',
            conPassword: ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required(),
        name: Yup.string().required(),
        gender: Yup.string().min(1).required(),
        grade: Yup.number().required(),
        country: Yup.string().min(1).required(),
        conPassword: Yup.string().required()
    }),
    handleSubmit(values) {
        const btn = document.querySelector('#signup');
        const authError = document.querySelector('.authError');

        btn.disabled = true;
        btn.innerHTML = 'Creating account...';
        console.log(values.birthDate);

        if (values.birthDate !== '') {
            if (values.password === values.conPassword) {
                firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                .then(auth => {
                    axios({
                        method: 'POST',
                        url: 'https://classrhino-users.herokuapp.com/students',
                        data: {
                            uid:auth.user.uid,
                            name:values.name,
                            gender:values.gender,
                            birthDate:values.birthDate,
                            grade:values.grade,
                            country:values.country,
                            city:values.city,
                            email:values.email
                        }
                    }).then(doc => {
                        axios.post('https://sheltered-caverns-26013.herokuapp.com/student/signup', {
                            password:"8nov2016",
                            userEmail:values.email,
                            name:values.name
                        }).then(() => {
                            axios.post('https://sheltered-caverns-26013.herokuapp.com/new/student', {
                                password:"8nov2016",
                                name:values.name,
                                email:values.email
                            }).then(() => {
                                authError.innerHTML = '';
                                btn.innerHTML = 'Sign up!';
                                btn.disabled = false;
    
                                localStorage.setItem('userDoc', JSON.stringify(doc.data));
                                window.location = `/dashboard/student/${doc.data._id}`;
                            });
                        });
                    
                    }).catch(e => {
                        authError.innerHTML = e;
                        btn.innerHTML = 'Sign up!';
                        btn.disabled = false;
                    });
                })
                .catch(function(error) {
                    var errorMessage = error.message;
    
                    authError.innerHTML = errorMessage;
                    btn.innerHTML = 'Sign up!';
                    btn.disabled = false;
                });
            } else {
                authError.innerHTML = 'Passwords do not match.';
                btn.innerHTML = 'Sign up!';
                btn.disabled = false;
            }
        } else {
            authError.innerHTML = 'Please enter a valid birth date.';
            btn.innerHTML = 'Sign up!';
            btn.disabled = false;
        }
        
    }
})(StudentSignup);

export default FormikApp;