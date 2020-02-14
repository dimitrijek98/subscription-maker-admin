import React, {Component} from 'react';
import SubscriptionService from "../../Services/SubscriptionService";
import Loader from "react-loader-spinner";

class DisplayPlans extends Component {
    constructor(props) {
        super(props);
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
            loading: false,
        }
    }
    componentDidMount = () => {
        //this.getAllPlans();
    }

    getAllPlans = () => {
        this.SubscriptionService.getAllPlans()
            .then(response => {
                let data = response.data.map(reg => {
                    return {...reg}
                });
                this.setState({plansData: data, loading: false});
            })
    };

    deletePlan = () => {

    };

    renderPlans = () => {
        return this.state.plansData.map(plan => {
            return <div className='col-lg-5 mt-3 ml-3 contract-card'>
                <h3>{`${plan.name} Info:`}</h3>
                {plan.services.map(service => {
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
                <button onClick={() => this.deletePlan()} className='btn btn-danger mt-5'>Delete plan</button>
            </div>
        })
    }
    render() {
        return (
            <div className='container full-height pt-5'>
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
                    <div className='row'>
                    {this.renderPlans()}
                    </div>
                }

            </div>
        );
    }
}

export default DisplayPlans;
