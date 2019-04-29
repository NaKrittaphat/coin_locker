import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { Row, Col, Table, Button } from 'reactstrap';
import Charge_locker from '../Modal/Charge_locker'
import { post, get } from '../../server/connect'
import socketIOClient from 'socket.io-client'
import swal from 'sweetalert'
import {
    locker_1,
    locker_2,
    locker_3,
    locker_4,
    locker_5,
    locker_6,
    locker_7,
    locker_8,
    locker_9,
    locker_10,
    locker_11,
    locker_12,
} from '../../store/Number'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            locker_1: [],
            locker_2: [],
            locker_3: [],
            locker_4: [],
            locker_5: [],
            locker_6: [],
            locker_7: [],
            locker_8: [],
            locker_9: [],
            locker_10: [],
            locker_11: [],
            locker_12: [],
            data_locker: [],
            active: [],
            locker: 0,
            duration: 0,
            coin: 0,
            message: [],
            sent_socket: "http://localhost:3013"
        }
    }
    componentDidMount() {
        this.set_number()
        this.response()
    }
    set_number() {
        this.setState({ locker_1: locker_1 })
        this.setState({ locker_2: locker_2 })
        this.setState({ locker_3: locker_3 })
        this.setState({ locker_4: locker_4 })
        this.setState({ locker_5: locker_5 })
        this.setState({ locker_6: locker_6 })
        this.setState({ locker_7: locker_7 })
        this.setState({ locker_8: locker_8 })
        this.setState({ locker_9: locker_9 })
        this.setState({ locker_10: locker_10 })
        this.setState({ locker_11: locker_11 })
        this.setState({ locker_12: locker_12 })

    }
    select_locker(e) {
        this.setState({
            number_locker: e
        });
        let message = this.state.message
        console.log("num", this.state.number_locker);
        if (message.length < 1) {
            this.onOpenModal()
        } else {
            message.map((ele) => {
                if (ele.number_locker == this.state.number_locker) {
                    swal("Busy lockers !", "Please use the new locker.", "error");
                } else {
                    this.onOpenModal()
                }
            })
        }
        console.log("ms", message);
    }
    // select_locker_false(){

    // }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    get_data_modal = (data_locker) => {
        this.setState({ data_locker: data_locker })
        this.onCloseModal()
        setTimeout(() => {
            this.send(data_locker)
            this.active_locker(data_locker)
        }, 100);
    }
    send = (data_locker) => {
        const { sent_socket } = this.state
        const socket = socketIOClient(sent_socket)
        socket.emit('sent-message', data_locker)
    }
    response = () => {
        const { sent_socket, message } = this.state
        const temp = message
        const socket = socketIOClient(sent_socket)
        socket.on('new-message', (messageNew) => {
            temp.push(...messageNew)
            this.setState({ message: temp })
        })
    }
    active_locker(data_locker) {
        data_locker.map((e) => {
            this.setState({
                locker: e.number_locker,
                duration: e.duration,
                coin: e.coin
            })
        })

    }

    submit = async () => {
        const object = {
            locker: this.state.locker,
            duration: this.state.duration,
            coin: this.state.coin
        }
        try {
            if (object) {
                await post(object, "insert/add_locker").then((res) => {
                    if (res.success) {
                        alert("success")
                    } else {
                        alert(res.error_message);
                    }
                });
            }
        } catch (error) {
            // console.log(object);
        }
    }

    render() {
        const { open } = this.state;
        const active = this.state.active
        return (
            <div >
                <div className="margin-t">
                    <Col sm={12} md={{ size: 4, offset: 4 }}>
                        <Table bordered style={{ textAlign: "center" }}>
                            <thead>
                                <tr className="cl-table">
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    {this.state.locker_1.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_2.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_3.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {this.state.locker_4.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_5.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_6.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {this.state.locker_7.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_8.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_9.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {this.state.locker_10.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_11.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                    {this.state.locker_12.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </Table>
                    </Col>

                </div>


                {this.state.message.map((e) => {
                    return (
                        <div style={{ marginTop: 20, textAlign: 'center' }} >
                            you select locker : <a style={{ color: 'blue' }}>{e.number_locker}</a> &nbsp;||&nbsp; Size <a style={{ color: 'blue' }}> {e.size} </a> &nbsp;|| &nbsp;
                            you charge coin : <a style={{ color: 'blue' }}>{e.cal_coin}</a> THB &nbsp; || &nbsp;
                             Got item back : <a style={{ color: 'blue' }}>{e.got_item}</a> <br />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                you charge coin : &nbsp; <a style={{ color: 'blue' }}>{e.coin_charge}</a> &nbsp; THB &nbsp; || &nbsp;
                                {e.bill_1000 ? <div>bill 1000 x <a style={{ color: 'blue' }}>{e.bill_1000}</a>,&nbsp;</div> : null}
                                {e.bill_500 ? <div>bill 500 x <a style={{ color: 'blue' }}>{e.bill_500}</a>,&nbsp;</div> : null}
                                {e.bill_100 ? <div>bill 100 x <a style={{ color: 'blue' }}>{e.bill_100}</a>,&nbsp;</div> : null}
                                {e.bill_50 ? <div>bill 50 x <a style={{ color: 'blue' }}>{e.bill_50}</a>,&nbsp;</div> : null}
                                {e.bill_20 ? <div>bill 20 x <a style={{ color: 'blue' }}>{e.bill_20}</a>,&nbsp;</div> : null}
                                {e.coin_10 ? <div>coin 10 x <a style={{ color: 'blue' }}>{e.coin_10}</a>,&nbsp;</div> : null}
                                {e.coin_5 ? <div>coin 5 x <a style={{ color: 'blue' }}>{e.coin_5}</a>,&nbsp;</div> : null}
                                {e.coin_2 ? <div>coin 2 x <a style={{ color: 'blue' }}>{e.coin_2}</a>&nbsp;</div> : null}
                                {e.coin_1 ? <div>coin 1 x <a style={{ color: 'blue' }}>{e.coin_1}</a></div> : null}
                            </div>
                            {/* <div>active:{this.state.active}</div> */}
                        </div>
                    )
                })}

                <Modal open={open} onClose={this.onCloseModal} center>
                    <Charge_locker number_locker={this.state.number_locker} get_data_modal={(data_locker) => this.get_data_modal(data_locker)} />
                </Modal>
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button color="success" onClick={() => this.submit()}>จอง</Button>
                </div>
            </div >
        )
    }
}
