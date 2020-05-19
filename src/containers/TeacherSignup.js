import React from 'react';
import '../styles/Signup.css';
import illustration2 from '../assets/illustration2.png';
import axios from 'axios';
import CitySelector from '../components/CitySelector'; 

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import * as firebase from 'firebase';

class TeacherSignup extends React.Component {
    state = {
        countries: [],
        subjects: [],
        languages: [],
        countryFlag: '',
        rate: 0,
        selectedCountry: {},
        selectedCity: {},
        grades: [
            '6-8',
            '8-10',
            '10-12',
            'O level',
            'A level'
        ],
        selectedGrades: []
    }
    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(doc => {
            this.setState({countries:doc.data});
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
            this.props.values.flag = selectedCountry.flag;
        } else {
            city.disabled = true;
        }
    }
    handleCitySelect = selectedCity => {
        this.props.values.city = selectedCity;
    }
    addSubject = e => {
        e.preventDefault();
        const input = document.querySelectorAll('.item-input')[0];

        if (input.value.length > 1) {
            var subjects = this.state.subjects;
            subjects.unshift(input.value.toLowerCase());
            input.value = '';
            this.setState({subjects});

            this.props.values.subjects = this.state.subjects;
        }
    }
    removeSubject = index => {
        var subjects = this.state.subjects;
        subjects.splice(index, 1);
        this.setState({subjects});
        this.props.values.subjects = this.state.subjects;
    }
    addLanguage = e => {
        e.preventDefault();
        const input = document.querySelectorAll('.item-input')[1];
        var languages = this.state.languages;
        if (input.value.length > 1) {
            languages.unshift(input.value.toUpperCase());
            input.value = '';
            this.setState({languages});

            this.props.values.languages = this.state.languages;
        }
    }
    removeLanguage = index => {
        var languages = this.state.languages;
        languages.splice(index, 1);
        this.setState({languages});
        this.props.values.languages = this.state.languages;
    }
    gradeSelectHandler = e => {
        var selectedGrades = this.state.selectedGrades;
        var index = selectedGrades.indexOf(e.target.innerHTML);

        if (index !== -1) {
            selectedGrades.splice(index, 1);
            e.target.classList.remove('selected');
        } else {
            e.target.classList.add('selected');
            selectedGrades.push(e.target.innerHTML);
            this.setState({selectedGrades});
            this.props.values.grades = selectedGrades;
            console.log(selectedGrades);
        }
    }
    render() {
        return (
            <div className="TeacherSignup">
                <img alt="dummy-alt" src={illustration2} className="illustration"/>
                <h1>Sign up as a teacher</h1>
                <p><a href="/student/register">Switch to student sign up</a></p>
                <br/>
                <Form>
                    <div className="form info">
                        <h4>Teacher information</h4>
                        <Field className={this.props.touched.name && this.props.errors.name && "error"} name="name" type="text" placeholder="Full name"/> 
                        { this.props.touched.name && this.props.errors.name && <p className="text-danger">{this.props.errors.name}</p> }
                        
                        <Field className={this.props.touched.gender && this.props.errors.gender && "error"} component="select" name="gender">
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Field>
                        { this.props.touched.gender && this.props.errors.gender && <p className="text-danger">{this.props.errors.gender}</p> }

                        <form onSubmit={this.addSubject}>
                            <input className="item-input" type="text" placeholder="Add subjects"/>
                            <hr/>
                            <div className="items-container">
                            {this.state.subjects.map((subject, index) => {
                                return (
                                    <span className="item">
                                        {subject} <img alt="dummy-alt" key={index} onClick={() => this.removeSubject(index)} src="https://cdn0.iconfinder.com/data/icons/command-buttons/512/Cross-512.png" width="20"/>
                                    </span>
                                )
                            })}
                            </div>
                            <button onClick={this.addSubject} className="btn btn-primary">+</button>
                        </form>
                        { this.props.touched.subjects && this.props.errors.subjects && <p className="text-danger">{this.props.errors.subjects}</p> }
                        
                        <input className="label" value="Select the grades/levels that you teach" disabled/>
                        <div className="gradeContainer">
                            {this.state.grades.map(grade => {
                                return <span onClick={this.gradeSelectHandler} className="grade">{grade}</span>
                            })}
                        </div>

                        <form onSubmit={this.addLanguage}>
                            <input className="item-input" type="text" placeholder="Add communication languages"/>
                            <hr/>
                            <div className="items-container">
                            {this.state.languages.map((language, index) => {
                                return (
                                    <span className="item">
                                        {language} <img alt="dummy-alt" key={index} onClick={() => this.removeLanguage(index)} src="https://cdn0.iconfinder.com/data/icons/command-buttons/512/Cross-512.png" width="20"/>
                                    </span>
                                )
                            })}
                            </div>
                            <button onClick={this.addLanguage} className="btn btn-primary">+</button>
                        </form>
                        { this.props.touched.languages && this.props.errors.languages && <p className="text-danger">{this.props.errors.languages}</p> }

                        <input className="label" value="Your hourly rate (in USD)" disabled/>
                        <Field name="rate" value={this.state.rate} onChange={e => {
                            this.setState({rate: e.target.value});
                            this.props.values.rate = e.target.value;
                        }} type="text" className={this.props.touched.rate && this.props.errors.rate && "error"} name="rate" placeholder="$"/>
                        { this.props.touched.rate && this.props.errors.rate && <p className="text-danger">{this.props.errors.rate}</p> }

                        <input className="label rate" value={`$${this.state.rate}/hr`} disabled/>
                    </div>
                    <div className="form location">
                        <h4>Country and region</h4>
                        <Field className={this.props.touched.country && this.props.errors.country && "error"} component="select" name="country" onChange={this.handleCountrySelection}>
                            <option value="">Country</option>
                            {this.state.countries.map(country => {
                                return <option value={country.name}>{country.name}</option>
                            })}
                        </Field>
                        { this.props.touched.country && this.props.errors.country && <p className="text-danger">{this.props.errors.country}</p> }

                        <CitySelector selectedCity={this.handleCitySelect} countryCode={this.state.selectedCountry.alpha2Code}/>
                    </div>
                    <div className="form files">
                        <h4>Certificate and identity for validation and security purposes</h4>
                        <input className="label" value="Your picture (for profile):" disabled/>
                        <input type="file" id="profilepic" accept="image/*"/>

                        <input className="label" value="Any past certificate with proof of educational qualifications:" disabled/>
                        <input type="file" id="certificate" accept="image/*"/>
                        <br/>
                        <p>Expect certificate of A-levels, O-levels or other pre-university equivalent.</p>
                    </div>
                    <div className="form credentials">
                        <h4>Account credentials</h4>
                        <Field className={this.props.touched.email && this.props.errors.email && "error"} name="email" type="email" placeholder="Email"/>
                        { this.props.touched.email && this.props.errors.email && <p className="text-danger">{this.props.errors.email}</p> }

                        <hr/>
                        <Field className={this.props.touched.password && this.props.errors.password && "error"} name="password" type="password" placeholder="Password"/> 
                        { this.props.touched.password && this.props.errors.password && <p className="text-danger">{this.props.errors.password}</p> }        
                                
                        <Field className={this.props.touched.conPassword && this.props.errors.conPassword && "error"} name="conPassword" type="password" placeholder="Confirm password"/>  
                        <button type="submit" id="signup" className="btn btn-success">Sign up!</button>   
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
            rate: '',
            country: '',
            flag: '',
            subjects: [],
            grades: [],
            languages: [],
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
        subjects: Yup.array().min(1).required(),
        languages: Yup.array().min(1).required(),
        rate: Yup.number().min(10).max(60).required(),
        country: Yup.string().min(1).required(),
        conPassword: Yup.string().required()
    }),
    handleSubmit(values) {
        const btn = document.querySelector('#signup');
        const authError = document.querySelector('.authError');

        btn.disabled = true;
        btn.innerHTML = 'Creating account...';


        var storageRef = firebase.storage().ref();

        var profilePic = document.getElementById('profilepic').files;
        var certificate = document.getElementById('certificate').files;
        console.log(values.city);
        if (values.password === values.conPassword) {
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(auth => {
                btn.innerHTML = 'Uploading files...'
                storageRef.child(`${auth.user.uid}/profilepic`).put(profilePic[0]).then(snapshot => {
                    storageRef.child(`${auth.user.uid}/profilepic`).getDownloadURL().then(url1 => {
                        profilePic = url1;
                        storageRef.child(`${auth.user.uid}/certificate`).put(certificate[0]).then(snapshot => {
                            storageRef.child(`${auth.user.uid}/certificate`).getDownloadURL().then(url2 => {
                                certificate = url2;
                                axios({
                                    method: 'POST',
                                    url: 'https://classrhino-users.herokuapp.com/teachers',
                                    data: {
                                        uid: auth.user.uid,
                                        name: values.name,
                                        gender: values.gender,
                                        subjects: values.subjects,
                                        grades: values.grades,
                                        languages: values.languages,
                                        rate: values.rate,
                                        country: values.country,
                                        city: values.city,
                                        flag: values.flag,
                                        email: values.email,
                                        profilePic,
                                        certificates: [certificate],
                                        workingDays: []
                                    }
                                }).then(doc => {
                                    axios.post('https://sheltered-caverns-26013.herokuapp.com/teacher/signup', {
                                        password:"8nov2016",
                                        userEmail:values.email,
                                        name:values.name
                                    }).then(() => {
                                        axios.post('https://sheltered-caverns-26013.herokuapp.com/new/teacher', {
                                            password:"8nov2016",
                                            name:values.name,
                                            email:values.email,
                                            certificate:doc.data.certificates[0]
                                        }).then(() => {
                                            authError.innerHTML = '';
                                            btn.innerHTML = 'Sign up!';
                                            btn.disabled = false;
                    
                                            localStorage.setItem('userDoc', JSON.stringify(doc.data));
                                            window.location = `/scheduling/teacher/${doc.data._id}`;
                                        });
                                    });
                                }).catch(e => {
                                    authError.innerHTML = e;
                                    btn.innerHTML = 'Sign up!';
                                    btn.disabled = false;
                                });
                            });
                        });
                    });
                });
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
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
    }
})(TeacherSignup);

export default FormikApp;