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

    componentDidMount = () => {
        let user = this.AuthService.getUser();
        if(user && user.rollID === "0"){
            this.props.history.push('/adminDashboard', {user: user});
        } else if(user && user.rollID === "1") {
             this.props.history.push('/employeeDashboard', {user: user});
        }
            
    }

    login = (e) => {
        e.preventDefault();
        this.AuthService.login(this.state.email, this.state.password)
            .then(response => {
                if (response.status === 200) {
                    if(response.data.rollID === "2"){
                        alert("Nedozvoljen pristup!");
                        window.location.reload();
                    }
                    else{
                        this.AuthService.setUser(response.data);
                        if (response.data.rollID === "0") {
                            this.props.history.push('/adminDashboard', {user: response.data});
                        }
                        else {
                            this.props.history.push('/employeeDashboard', {user: response.data});
                        }
                    }
                }
            })
            .catch(err => {
                if(err == "Error: Request failed with status code 404"){
                    alert("Ne postoji zaposleni.");
                }
                else if(err == "Error: Request failed with status code 422"){
                    alert("Pogresili ste sifru.");
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
