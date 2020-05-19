import React from 'react';
import '../styles/Signup.css';
import illustration3 from '../assets/illustration3.png';

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import * as firebase from 'firebase';
import axios from 'axios';

class Login extends React.Component {
    state = {
        student: true,
        teacher: false
    }
    changeType = e => {
        if (e.target.value === 'student') {
            this.setState({student:true, teacher:false});
            this.props.values.userType = 'student';
        } else {
            this.setState({student:false, teacher:true});
            this.props.values.userType = 'teacher';
        }
    }
    render() {
        return (
                <div className="Login"><img alt="dummy-alt" src={illustration3} className="illustration"/>
                <h1>Sign in</h1>
                <br/>
                <span>Student sign in</span> <input onChange={this.changeType} type="radio" name="usertype" value="student" checked={this.state.student}/><br/>
                <span>Teacher sign in</span> <input onChange={this.changeType} className="radio" type="radio" name="usertype" value="teacher" checked={this.state.teacher}/><br/>
                <Form>
                    <div className="form">
                        <Field className={this.props.touched.email && this.props.errors.email && "error"} name="email" type="email" placeholder="Email"/>
                        { this.props.touched.email && this.props.errors.email && <p className="text-danger">{this.props.errors.email}</p> }
                        <hr/>
                        <Field className={this.props.touched.password && this.props.errors.password && "error"} name="password" type="password" placeholder="Password"/> 
                        { this.props.touched.password && this.props.errors.password && <p className="text-danger">{this.props.errors.password}</p> }        
                        <button id="signup" className="btn btn-success">Sign in</button>   
                        <br/>
                        <a className="text-success" href="/">Forgot password</a>
                        <p className="text-danger authError"></p>
                        <h3>or</h3>
                        <a href="/student/register">Create a new account</a>
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
            password: '',
            userType: 'student'
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
    }),
    handleSubmit(values) {
        const btn = document.querySelector('#signup');
        const authError = document.querySelector('.authError');

        btn.disabled = true;
        btn.innerHTML = 'Signing you in...';

        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .then(auth => {
            axios({
                method: 'GET',
                url: `https://classrhino-users.herokuapp.com/${values.userType}s/${auth.user.uid}`
            }).then(doc => {
                authError.innerHTML = '';
                btn.innerHTML = 'Sign in';
                btn.disabled = false;

                if (values.userType === 'student') {
                    localStorage.setItem('userDoc', JSON.stringify(doc.data[0]));
                    window.location = `/dashboard/student/${doc.data[0]._id}`;
                } else if (values.userType === 'teacher') {
                    localStorage.setItem('userDoc', JSON.stringify(doc.data[0]));
                    if (doc.data[0].workingDays.length > 0) {
                        window.location = `/dashboard/teacher/${doc.data[0]._id}`;
                    } else {
                        window.location = `/scheduling/teacher/${doc.data[0]._id}`;
                    }
                }
            }).catch(e => {
                firebase.auth().signOut();
                authError.innerHTML = 'User not found (try teacher sign in)';
                btn.innerHTML = 'Sign in';
                btn.disabled = false;
            });
        }).catch(error => {
            var errorMessage = error.message;

            authError.innerHTML = errorMessage;
            btn.innerHTML = 'Sign in';
            btn.disabled = false;
        }); 
    }
})(Login);

export default FormikApp;