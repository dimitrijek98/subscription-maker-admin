import React, {Component} from 'react';
import AuthService from "../../Services/AuthService";
import SubscriptionService from "../../Services/SubscriptionService";
import Loader from 'react-loader-spinner';

class EmployeeDashboard extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.SubscriptionService = new SubscriptionService();
        this.state = {
            plansData: [],
            contractsData: [],
            loading: false,
            addContract: false,
            createContract: false,
            email: '',
            target: '',
            noUser: false,
            selectedPlan: '',
            existingUser: false,
            user: {
                name: '',
                surname: '',
                email: '',
                password: ''
            }
        }
    }

    componentDidMount = () => {
        if (!this.AuthService.getUser())
            this.props.history.push("/");
        if(this.AuthService.getUser().rollID === "0")
            this.props.history.push("/adminDashboard");
        this.getAllPlans();
    };

    getAllPlans = () => {
        this.SubscriptionService.getAllPlans()
            .then(response => {
                let data = response.data.map(reg => {
                    return {...reg}
                });
                this.setState({plansData: data});
            })
    };

    findUser = () => {
        this.SubscriptionService.findUser(this.state.email)
            .then(response => {
                if(response.data.rollID === "2"){
                    this.setState({existingUser: true, 
                                    addContract: true, 
                                    user: {...this.state.user, email: response.data.email}
                                });
                    this.getAllUsersContracts(response.data);
                }
                else{
                    this.setState({noUser: true, existingUser:false, addContract: false, createContract:false});
                }
            })
            .catch(err => {
                if(err == "Error: Request failed with status code 404"){
                    this.setState({noUser: true, existingUser:false, addContract: false, createContract:false});
                }
            });
    };

    getAllUsersContracts = (user) => {
        this.setState({loading:true});
        this.SubscriptionService.getAllUsersContracts(user.email)
            .then(response => {
                let data = response.data.map(reg => {
                    return {...reg}
                });
                this.setState({contractsData: data, loading:false});
            })
            .catch(err => {
                this.setState({loading:false});
            })
    };

    deleteContract = (target) => {
        this.SubscriptionService.deleteContract(this.state.user.email, target)
            .then(response => {
                    if (response.status === 200) {
                        this.getAllUsersContracts(this.state.user);
                    }
                }
            );
    };

    addContract = () => {
        let chosenPlan = this.state.plansData.filter(plan => plan.name === this.state.selectedPlan);
        this.SubscriptionService.setNewContract(this.state.user.email, this.state.target, chosenPlan[0])
            .then(response => {
                    if (response.status === 200) {
                        this.getAllUsersContracts(this.state.user);
                        this.setState({createContract: false, selectedPlan: '', target: ''});
                    }
                }
            );
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    logout = () => {
        this.AuthService.LogOut();
        this.props.history.push("/");
    }

    createProfile = () => {
        const user = {...this.state.user};
        this.SubscriptionService.setNewUser(user.email, user.password, user.name, user.surname)
            .then(response => {
                if (response.status === 200) {
                    this.getAllUsersContracts(user);
                    this.setState({noUser:false, existingUser:true, addContract: true});
                }
            });
    };

    renderContracts = () => {
        if (this.state.contractsData.length === 0) {
            return <div className='col-12 p-5'>
                <h3>User has no contracts</h3>
            </div>
        } else {
            return this.state.contractsData.map(contract => {
                return <div className='col-lg-3 p-3'>
                    <div className='contract-card'>
                        <h6>{contract.target}</h6>
                        <h6>Plan name: {contract.plan.name}</h6>
                        <h6>Price: {contract.plan.price} RSD</h6>
                        <button onClick={() => this.deleteContract(contract.target)} className='btn btn-danger mt-5'>Cancel contract</button>
                    </div>
                </div>
            })
        }
    };

    selectPlan = (e) => {
        this.setState({selectedPlan: e.target.value});
    }


    renderPlanInfo = () => {
        let chosenPlan = this.state.plansData.filter(plan => plan.name === this.state.selectedPlan);
        return <div className='col-lg-6 mt-3 contract-card'>
            <h3>{`${chosenPlan[0].name}`}</h3>
            <h5>{`Price: ${chosenPlan[0].price} RSD`}</h5>
            <h3>{`Info:`}</h3>
            {chosenPlan[0].services.map(service => {
                if (service.type === 'Internet') {
                    return <div>
                        <h5>Internet</h5>
                        <h6>{`Speed: ${service.speed}`}</h6>
                    </div>
                } else if(service.type === 'Mobile'){
                    return <div>
                        <h5>Mobile</h5>
                        <h6>{`Internet: ${service.internet}`}</h6>
                        <h6>{`Minutes: ${service.minutes}`}</h6>
                        <h6>{`SMS: ${service.sms}`}</h6>
                    </div>
                } else if(service.type === 'Cable') {
                    return <div>
                        <h5>Cable</h5>
                        <h6>{`Channels: ${service.channels}`}</h6>
                    </div>
                } else {
                    return <div>
                        <h5>Phone</h5>
                        <h6>{`Minutes: ${service.minutes}`}</h6>
                    </div>
                }
            })}
        </div>
    };


    render() {
        return (
            <div className='container full-height pb-5 pt-5'>
                <div className='row'>
                    <div className={'col-12'}>
                        <button onClick={() => this.logout()} className={'btn btn-lg btn-light mb-3'}>Log Out</button>
                    </div>
                    <div className='col-12'>
                        <h1>Enter customer email</h1>
                        <div className="input-group mb-3 mt-3">
                            <input type="text" className="form-control" placeholder="User Email"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2"
                                   value={this.state.email}
                                   onChange={(e) => this.setState({email: e.target.value})}/>
                            <div className="input-group-append">
                                <button onClick={() => this.findUser()} className="btn btn-outline-light"
                                        type="button">Search
                                </button>
                            </div>
                        </div>
                        {this.state.noUser &&
                        <form className='pt-3'>
                            <div className="row pt-4">
                                <div className="col">
                                    <h3>Create New User</h3>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="First name"
                                           value={this.state.user.name}
                                           onChange={(e) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   name: e.target.value
                                               }
                                           })}
                                    />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Last name"
                                           value={this.state.user.surname}
                                           onChange={(e) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   surname: e.target.value
                                               }
                                           })}
                                    />
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <input type="email" className="form-control" placeholder="Email"
                                           value={this.state.user.email}
                                           onChange={(e) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   email: e.target.value
                                               }
                                           })}
                                    />
                                </div>
                                <div className="col">
                                    <input type="password" className="form-control" placeholder="Password"
                                           value={this.state.user.password}
                                           onChange={(e) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   password: e.target.value
                                               }
                                           })}
                                    />
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col">
                                    <button onClick={() => this.createProfile()} className='btn btn-lg btn-light'>Create User
                                        Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                        }
                    </div>
                    {this.state.existingUser &&
                    <div className='col-12 pt-3'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h4>Users contracts</h4>
                                </div>
                            </div>
                            <div className='row'>
                                {this.state.loading ?
                                    <div className='col-12 p-5'>
                                        <Loader
                                            type="Puff"
                                            color="#00BFFF"
                                            height={100}
                                            width={100}
                                            timeout={0} //3 secs

                                        />
                                    </div>
                                    :
                                    this.renderContracts()
                                }
                            </div>
                        </div>
                    </div>} 
                    {this.state.addContract &&                   
                    <div className='col-12 pr-2'>
                            <button className='btn btn-light btn-lg' onClick={() => this.setState({createContract:true})}>Add New Contract</button>
                    </div>
                    }
                    {this.state.createContract &&
                    <React.Fragment>
                        <div className='col-lg-6 pt-3'>
                            <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Target</label>
                                    <input type="text"
                                           className="form-control mt-2"
                                           value={this.state.target}
                                           onChange={(e) => this.setState({target: e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <select className="form-control"
                                        id="exampleFormControlSelect1"
                                        onChange={this.selectPlan}

                                >
                                    <option value=''>Select Plan</option>
                                    {this.state.plansData.map(plan => {
                                        return <option selected={plan.name === this.state.selectedPlan}
                                                       value={plan.name}>{plan.name}</option>
                                    })}
                                </select>
                            </div>
                           {this.state.selectedPlan &&
                            <button className='btn btn-light btn-lg mt-5'
                                    disabled={!this.state.target}
                                    onClick={() => this.addContract()}>Create Contract</button>
                           }
                        </div>
                        {this.state.selectedPlan &&
                        this.renderPlanInfo()
                        }

                    </React.Fragment>
                    }
                </div>

            </div>
        );
    }
}

export default EmployeeDashboard;
