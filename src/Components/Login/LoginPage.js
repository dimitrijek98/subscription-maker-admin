import React, {Component} from 'react';
import AuthService from "../../Services/AuthService";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.state = {
            email: '',
            password: '',
        }
    }

    login = (e) => {
        e.preventDefault();
        const codedPass = btoa(this.state.password);
        this.AuthService.login(this.state.email, codedPass)
            .then(response => {
                if (response.status === 200) {
                    this.AuthService.setUser(response.data);
                    this.props.history.push('/dashboard', {user: response.data});
                }
            })
            .catch(err => {
                console.log(err.body, err.data, err);
                if (err.status === 404) {
                    alert(err.data);
                }
                if (err.status === 422) {
                    alert(err.data);
                }
            });
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        return (
            <div className='container-fluid login-container'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='login-form-container'>
                            <form className='form-size'>

                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control mt-2" name='email'
                                           id="exampleInputEmail1"
                                           aria-describedby="emailHelp" onChange={this.handleInput}/>
                                </div>
                                <div className="form-group pb-4">
                                    <label>Password</label>
                                    <input type="password" name='password' onChange={this.handleInput}
                                           className="form-control mt-2"/>
                                </div>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    paddingBottom: '20px'
                                }}>
                                </div>
                                <button onClick={this.login}
                                        type="submit" className="btn btn-light">Log in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LoginPage;