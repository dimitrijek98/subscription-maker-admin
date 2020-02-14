import React, {Component} from 'react';

class CreateWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            type: '',
            name: '',
            price: '',
            internetSelect: false,
            mobileSelect: false,
            phoneSelect: false,
            cableSelect: false,
            internet: {
                speed: '',
                amount: '',
            },
            mobile: {
                minutes: '',
                sms: '',
                internet: '',
            },
            phone: {
                minutes: ''
            },
            cable: {
                channelsCount: ''
            },
        }
    }

    handleInput = (e) => {

    };

    handleSelect = (e) => {
        this.setState({[e.target.value]: !this.state[e.target.value]});
    };

    render() {
        return (
            <div className='container wizard-container'>
                <div className='row'>
                    {this.state.step === 1 &&
                    <React.Fragment>
                        <div className='col-12 p-5'>
                            <h4>Choose plan type</h4>
                        </div>
                        <div className='col-md-6 p-5'>
                            <div onClick={() => this.setState({type: 'home', step: 2})} className='my-card clickable'>

                                <h4>Home Plan</h4>
                                <img src={require('../../Assets/home.png')} height='150'/>
                            </div>
                        </div>
                        <div className='col-md-6 p-5'>
                            <div onClick={() => this.setState({type: 'phone', step: 2})} className='my-card'>
                                <h4>Phone Plan</h4>
                                <img src={require('../../Assets/phone.png')} height='150'/>
                            </div>
                        </div>
                    </React.Fragment>
                    }
                    {this.state.step === 2 && this.state.type === 'home' &&
                    <React.Fragment>
                        <div className='col-12 p-5'>
                            <h4>What will your plan include</h4>
                        </div>
                        <div className='col-md-4 p-5'>
                            <div className='my-card'>
                                <input type='checkbox' className='form-control' checked={this.state.internetSelect}
                                       onChange={this.handleSelect} value={'internetSelect'}/>
                                <label>Internet</label>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Speed</label>
                                    <input type="text"
                                           className="form-control mt-2"
                                           disabled={!this.state.internetSelect}
                                           value={this.state.internet.speed}
                                           onChange={(e) => this.setState({internet: {...this.state.internet, speed: e.target.value}})}/>
                                </div>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Amount</label>
                                    <input type="text" className="form-control mt-2"
                                           disabled={!this.state.internetSelect}
                                           value={this.state.internet.amount}
                                           onChange={(e) => this.setState({internet: {...this.state.internet,amount: e.target.value}})}/>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4 p-5'>
                            <div className='my-card'>
                                <input type='checkbox' className='form-control' checked={this.state.phoneSelect}
                                       onChange={this.handleSelect} value={'phoneSelect'}/>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Minute</label>
                                    <input type="text" className="form-control mt-2"
                                           disabled={!this.state.phoneSelect}
                                           value={this.state.phone.minutes}
                                           onChange={(e) => this.setState({phone: {...this.state.phone,minutes: e.target.value}})}/>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 p-5'>
                            <div className='my-card'>
                                <input type='checkbox' className='form-control'  checked={this.state.cableSelect}
                                       onChange={this.handleSelect} value={'cableSelect'}/>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Channels number</label>
                                    <input type="text" className="form-control mt-2"
                                           disabled={!this.state.cableSelect}
                                           value={this.state.cable.channelsCount}
                                           onChange={(e) => this.setState({cable: {...this.state.cable,channelsCount: e.target.value}})}/>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-light' onClick={() => this.setState({step: this.state.step + 1})}>Next</button>
                        </div>
                    </React.Fragment>
                    }
                    {this.state.step === 2 && this.state.type === 'phone' &&
                    <React.Fragment>
                        <div className='col-12 p-5'>
                            <h4>What will your plan include</h4>
                        </div>
                        <div className='col-md-4 p-5'>
                            <div className='my-card'>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Internet</label>
                                    <input type="text" className="form-control mt-2"
                                           value={this.state.mobile.internet}
                                           onChange={(e) => this.setState({mobile: {...this.state.mobile,internet: e.target.value}})}/>
                                </div>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Minutes</label>
                                    <input type="text" className="form-control mt-2"
                                           value={this.state.mobile.minutes}
                                           onChange={(e) => this.setState({mobile: {...this.state.mobile,minutes: e.target.value}})}/>
                                </div>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">SMS</label>
                                    <input type="text" className="form-control mt-2"
                                           value={this.state.mobile.sms}
                                           onChange={(e) => this.setState({mobile: {...this.state.mobile,sms: e.target.value}})}/>
                                </div>

                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-light'
                                    onClick={() => this.setState({step: this.state.step + 1})}>Next
                            </button>
                        </div>
                    </React.Fragment>
                    }
                    {this.state.step === 3 &&
                    <React.Fragment>
                        <div className='col-12 p-5'>
                            <h4>Plan Info</h4>
                        </div>
                        <div className='col-md-12 p-5'>
                            <div className='my-card'>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Name</label>
                                    <input type="text" className="form-control mt-2" name='email'
                                           value={this.state.name}
                                           onChange={(e) => this.setState({name: e.target.value})}/>
                                </div>
                                <div className="form-group pb-3">
                                    <label htmlFor="exampleInputEmail1">Price</label>
                                    <input type="text" className="form-control mt-2" name='email'
                                           value={this.state.price}
                                           onChange={(e) => this.setState({price: e.target.value})}/>
                                </div>

                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-light btn-lg'
                                    onClick={() => this.setState({step: this.state.step + 1})}>Create
                            </button>
                        </div>
                    </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default CreateWizard;
