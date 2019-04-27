import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import Modal from 'react-responsive-modal'
import { Row, Col, Table } from 'reactstrap';
import Charge_locker from '../Modal/Charge_locker'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { locker_1, locker_2, locker_3, locker_4 } from '../../store/Number'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            locker_1: [],
            locker_2: [],
            locker_3: [],
            locker_4: []
        }
    }
    componentDidMount() {
        this.set_number()
    }
    set_number() {
        this.setState({ locker_1: locker_1 })
        this.setState({ locker_2: locker_2 })
        this.setState({ locker_3: locker_3 })
        this.setState({ locker_4: locker_4 })
    }
    select_locker(e) {
        this.setState({
            number_locker: e
        });
        this.onOpenModal()
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
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
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)} >{e}</button></td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {this.state.locker_2.map((e) => {
                                        return (
                                            <td><button className="btn-locker" onClick={() => this.select_locker(e)}>{e}</button></td>
                                        )
                                    })}
                                </tr>
                                <tr>
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
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <Charge_locker number_locker={this.state.number_locker} />
                </Modal>
            </div >
        )
    }
}
