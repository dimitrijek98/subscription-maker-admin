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
        return;
        this.AuthService.getUser()
            .then(response => {
                if(response && response.roleId === 1){
                    this.props.history.push('/adminDashboard', {user: response.data});
                } else if(response && response.roleId === 2) {
                    this.props.history.push('/employeeDashboard', {user: response.data});
                }
            })
    }

    login = (e) => {
        e.preventDefault();
        console.log(this);
        const codedPass = btoa(this.state.password);

        let user = {
            email: this.state.email,
            roleId: 1
        };
        this.AuthService.setUser(user);
        if (user.roleId === 1) {
            this.props.history.push('/adminDashboard', {user: user});
        } else {
            this.props.history.push('/employeeDashboard', {user: user});
        }
        return;

        this.AuthService.login(this.state.email, codedPass)
            .then(response => {
                if (response.status === 200) {
                    this.AuthService.setUser(response.data);
                    if (response.data.roleId === 1) {
                        this.props.history.push('/adminDashboard', {user: response.data});
                    } else {
                        this.props.history.push('/employeeDashboard', {user: response.data});
                    }
                }
            })
            .catch(err => {
                /*console.log(err.body, err.data, err);
                if (err.status === 404) {
                    alert(err.data);
                }
                if (err.status === 422) {
                    alert(err.data);
                }*/
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
