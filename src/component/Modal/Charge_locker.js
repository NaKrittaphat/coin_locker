import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment, { min } from "moment";
import moment_tz from 'moment-timezone'
import { Row, Col, Input, Button, Label, FormGroup } from 'reactstrap';
moment.tz.add({
    "zones": {
        "Asia/Bangkok": [
            "6:42:4 - LMT 1880 6:42:4",
            "6:42:4 - BMT 1920_3 6:42:4",
            "7 - ICT"
        ],
    }
});
var currentTimeString = moment().tz('Asia/Bangkok').format(' HH:mm:ss');
var data_table = [{
    size: "S",
    first: "50 THB",
    next: "25 THB"
}, {
    size: "M",
    first: "100 THB",
    next: "50 THB"
}, {
    size: "L",
    first: "200 THB",
    next: "100 THB"
}];

export default class Charge_locker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number_locker: '',
            size: '',
            duration_hr: '',
            duration_min: '',
            coin: '',
            cal_coin: 0,
            coin_min: 0,
            coin_hr: 0,
            check_hr_min: '',
            got_item: ''
        }
    }

    componentDidMount() {
        this.setState({ number_locker: this.props.number_locker })
        setTimeout(() => {
            this.separate_size()
        }, 50);
    }
    separate_size() {
        const number_locker = parseInt(this.state.number_locker)
        if ((number_locker == 1) || (number_locker == 4) || (number_locker == 7) || (number_locker == 10)) {
            this.setState({ size: ' S' })
        }
        else if ((number_locker == 2) || (number_locker == 5) || (number_locker == 8) || (number_locker == 11)) {
            this.setState({ size: ' M' })
        }
        else if ((number_locker == 3) || (number_locker == 6) || (number_locker == 9) || (number_locker == 12)) {
            this.setState({ size: ' L' })
        }
    }
    calculate_coin() {
        const duration_hr = parseInt(this.state.duration_hr)
        const duration_min = parseInt(this.state.duration_min)
        const coin = parseInt(this.state.coin)
        const locker = parseInt(this.state.number_locker)
        let { cal_coin, coin_min, coin_hr } = this.state

        if ((locker == 1) || (locker == 4) || (locker == 7) || (locker == 10)) {
            if (duration_hr <= 0) {
                coin_hr = 0
                this.setState({ coin_hr })
                if ((duration_min <= 0)) {
                    coin_min = 0
                    this.setState({ coin_min })
                    setTimeout(() => {
                        cal_coin = (parseInt(this.state.coin_hr) + parseInt(this.state.coin_min))
                        this.setState({ cal_coin, check_hr_min: '' })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false' })
                        }
                    }, 10);
                }
                else if ((duration_min >= 1) && (duration_min <= 59)) {
                    coin_min = duration_min * 25
                    this.setState({ coin_min })
                    setTimeout(() => {
                        cal_coin = (parseInt(this.state.coin_hr) + parseInt(this.state.coin_min))
                        this.setState({ cal_coin, check_hr_min: '' })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false' })
                        }
                    }, 10);
                }
                else {
                    this.setState({ check_hr_min: 'please check your hours or mins !', cal_coin: '', got_item: '' })
                }
            }
            else if ((duration_hr >= 1) && (duration_hr <= 24)) {
                coin_hr = (duration_hr * 50)
                this.setState({ coin_hr })
                if ((duration_min <= 0)) {
                    coin_min = 0
                    this.setState({ coin_min })
                    setTimeout(() => {
                        cal_coin = (parseInt(this.state.coin_hr) + parseInt(this.state.coin_min))
                        this.setState({ cal_coin, check_hr_min: '' })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false' })
                        }
                    }, 10);

                }
                else if ((duration_min >= 1) && (duration_min <= 59)) {
                    coin_min = duration_min * 25
                    this.setState({ coin_min })
                    setTimeout(() => {
                        cal_coin = (parseInt(this.state.coin_hr) + parseInt(this.state.coin_min))
                        this.setState({ cal_coin, check_hr_min: '' })
                        if (cal_coin <= coin) {
                            this.setState({ cal_coin, got_item: 'true' })
                        }
                        else {
                            this.setState({ cal_coin, got_item: 'false' })
                        }
                    }, 10);

                }
                else {
                    this.setState({ check_hr_min: 'please check your hours or mins !', cal_coin: '', got_item: '' })
                }
            }
            else {
                this.setState({ check_hr_min: 'please check your hours or mins !', cal_coin: '', got_item: '' })
            }
        }
        // else if ((locker == 2) || (locker == 5) || (locker == 8) || (locker == 11)) {
        //     if ((duration >= 0) && (duration <= 60)) {
        //     }
        // }
        // else if ((locker == 3) || (locker == 6) || (locker == 9) || (locker == 12)) {
        //     if ((duration >= 0) && (duration <= 60)) {
        //     }

        // }
        setTimeout(() => {
            this.push_data()
        }, 100);
    }
    push_data() {
        const data_locker = []
        data_locker.push({
            got_item: this.state.got_item,
            cal_coin: this.state.cal_coin,
        })
        this.setState({ data_locker }, () => { console.log("data", this.state.data_locker) })


    }
    clear() {
        this.setState({
            check_hr_min: '',
            duration_hr: '',
            duration_min: '',
            coin: '',
            cal_coin: 0,
            coin_min: 0,
            coin_hr: 0,
        })
    }
    render() {
        const { size, coin, duration_hr, duration_min, cal_coin, got_item, check_hr_min } = this.state
        const number_locker = parseInt(this.state.number_locker)
        return (
            <div className="margin-t">
                <Row >
                    <Col sm={12} md={{ size: 8, offset: 2 }}>
                        <BootstrapTable data={data_table}  >
                            <TableHeaderColumn dataAlign="center" width='70' dataField='size' isKey></TableHeaderColumn>
                            <TableHeaderColumn dataAlign="center" dataField='first'>first 60 minutes</TableHeaderColumn>
                            <TableHeaderColumn dataAlign="center" dataField='next'>next minutes</TableHeaderColumn>
                        </BootstrapTable>
                    </Col>
                </Row>
                <div style={{ marginTop: 20, textAlign: 'center' }} >
                    you select locker &nbsp; <a style={{ color: 'blue' }}>{number_locker}</a> &nbsp; size &nbsp; <a style={{ color: 'blue' }}> {size} </a>
                </div>
                {cal_coin ?
                    <div style={{ marginTop: 20, textAlign: 'center' }} >
                        you charge coin : <a style={{ color: 'blue' }}>{cal_coin}</a> THB &nbsp; || &nbsp;
                        Got item back : <a style={{ color: 'blue' }}>{got_item}</a>
                    </div> : null}
                {check_hr_min ?
                    <div style={{ marginTop: 20, textAlign: 'center' }} >
                        <a style={{ color: 'red' }}>{check_hr_min}</a>
                    </div> : null}
                <Row style={{ marginTop: 20 }} form>
                    <Col sm={2} />
                    <Col sm={2} >
                        <Label >Hours</Label>
                        <Input type="number" name="duration_hr" placeholder="insert 0-24"
                            value={duration_hr}
                            onChange={(e) => this.setState({ duration_hr: e.target.value })}
                        />
                        {/* <Input type="text" value={"you select locker " + number_locker + " " + size} /> */}
                    </Col>
                    <Col sm={2} >
                        <Label for="exampleZip">Mins</Label>
                        <Input type="number" name="duration_min" placeholder="insert 0-59"
                            value={duration_min}
                            onChange={(e) => this.setState({ duration_min: e.target.value })}
                        />
                    </Col>
                    <Col sm={4}>
                        <Label >Coin</Label>
                        <Input type="number" name="coin" placeholder="please insert coin"
                            value={coin}
                            onChange={(e) => this.setState({ coin: e.target.value })}
                        />
                    </Col>
                    <Col sm={2} />
                </Row>

                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} className="margin-t">
                    <Button color="success" style={{ marginRight: 10 }} onClick={() => this.calculate_coin()}>Confirm </Button>
                    <Button color="danger" style={{ marginLeft: 10 }} onClick={() => this.clear()}>Clear </Button>
                </Row>
            </div >
        )
    }
}
