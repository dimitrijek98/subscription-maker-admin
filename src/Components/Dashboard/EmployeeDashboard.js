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
            plansData: [
                {name: 'p1', services: [
                        {
                            type: 'Internet',
                            speed: '100/20',
                            amount: '1092'
                        },
                        {
                            type: 'Cable',
                            channelsCount: '160'
                        }
                    ]},
                {name: 'p2', services: [
                        {
                            type: 'Internet',
                            speed: '100/20',
                            amount: '1092'
                        },
                        {
                            type: 'Cable',
                            channelsCount: '160'
                        }
                    ]},
                {name: 'p3', services: [
                        {
                            type: 'Internet',
                            speed: '100/20',
                            amount: '1092'
                        },
                        {
                            type: 'Cable',
                            channelsCount: '160'
                        }
                    ]},
                {name: 'p4', services: [
                        {
                            type: 'Internet',
                            speed: '100/20',
                            amount: '1092'
                        },
                        {
                            type: 'Cable',
                            channelsCount: '160'
                        }
                    ]},
                {name: 'p5', services: [
                        {
                            type: 'Internet',
                            speed: '100/20',
                            amount: '1092'
                        },
                        {
                            type: 'Cable',
                            channelsCount: '160'
                        }
                    ]},
            ],
            contractsData: [
                {name: 'name', target: 'fdff'},
                {name: 'name', target: 'fdff'},
                {name: 'name', target: 'fdff'},
                {name: 'name', target: 'fdff'},
                {name: 'name', target: 'fdff'},
            ],
            loading: false,
            addContract: true,
            email: '',
            target: '',
            plan: {},
            noUser: false,
            selectedPlan: '',
            existingUser:{},
            user: {
                name: '',
                lastName: '',
                email: '',
                password: ''
            }
        }
    }

    componentDidMount = () => {
        if (!this.AuthService.getUser())
            this.props.history.push("/");
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

    findUser = (e) => {
        const email = e.target.value;
        this.setState({noUser: false});
        return;
        //i ovde treba da se prosledi email
        this.SubscriptionService.findUser()
            .then(response => {
                this.getAllUsersContracts(response.data)
            })
            .catch(err => {
                console.log(err);
                this.setState({noUser: true})
            });
    };

    getAllUsersContracts = (user) => {
        this.setState({loading:true});
        //TO-DO: treba dase prosledi user ovde
        this.SubscriptionService.getAllUsersContracts()
            .then(response => {
                let data = response.data.map(reg => {
                    return {...reg}
                });
                this.setState({contractsData: data, loading:false});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading:false});
            })
    };

    deleteContract = (target) => {
        console.log(target);
        return;
        this.SubscriptionService.deleteContract(this.state.email, this.state.target)
            .then(response => {
                    if (response.status === 200) {
                        alert("Contract has been deleted!");
                        window.location.reload();
                    }
                }
            );
    };

    addContract = (e) => {
        return
        this.SubscriptionService.setNewContract(this.state.email, this.state.target, this.state.plan)
            .then(response => {
                    if (response.status === 200) {
                        alert("New contract is done.");
                        window.location.reload();
                    }
                }
            );
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    logOut = () => {
        this.AuthService.LogOut();
        this.props.history.push("/");
    };

    createProfile = () => {
        const user = {...this.state.user};

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
                        <h6>{contract.name}</h6>
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
            <h3>{`${chosenPlan[0].name} Info:`}</h3>
            {chosenPlan[0].services.map(service => {
                if (service.type === 'Internet') {
                    return <div>
                        <h5>Internet</h5>
                        <h6>{`Speed: ${service.speed}`}</h6>
                        <h6>{`Amount: ${service.amount}`}</h6>
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
                        <h6>{`Channels: ${service.channelsCount}`}</h6>
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
                    <div className='col-12'>
                        <h1>Enter customer email</h1>
                        <div className="input-group mb-3 mt-3">
                            <input type="text" className="form-control" placeholder="User Email"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button onClick={this.findUser} className="btn btn-outline-light"
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
                                           value={this.state.user.lastName}
                                           onChange={(e) => this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   lastName: e.target.value
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
                                    <button onClick={this.createProfile} className='btn btn-lg btn-light'>Create User
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
                    <div className='col-12 pr-2'>
                        <button className='btn btn-light btn-lg'>Add New Contract</button>
                    </div>
                    {this.state.addContract &&
                    <React.Fragment>
                        <div className='col-lg-6 pt-3'>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Example select</label>
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
                            <button className='btn btn-light btn-lg mt-5'>Create Contract</button>
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
