import React from 'react'
import Identicon from 'identicon.js'
import SHA256 from 'sha256-es';
import { Form, Grid, Row, Col, Button, FormControl, ControlLabel, FormGroup, PageHeader, Nav, NavItem } from 'react-bootstrap';
//const figlet = require('figlet');

const colPadding = {
  padding: '2em',
}
const headerAlign = {
  textAlign: "center",
}
export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: 'dcai',
			background: [255, 255, 255, 255],  // rgba white
			margin: 0.2,                       // 20% margin
			size: 120,                         // 420px square
		}
		this.hash = SHA256.hash;
	}
	renderNav() {
		return <Nav bsStyle="pills" activeKey={1} onSelect={ e => e }>
			<NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
			<NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
			<NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
		</Nav>
	}
  renderIdenticon() {
		const _this = this;
		const data = new Identicon(this.hash(this.state.username + Date.now()), this.state).toString()
		const src=`data:image/png;base64,${data}`

    return <Col mdPush={6} md={6} style={colPadding}>
      <h2 style={headerAlign}>Identicon</h2>
      <Form horizontal>
        <FormGroup controlId="formControlUsername">
          <ControlLabel>Username</ControlLabel>
          <FormControl type="text" onChange={ e => _this.setState({ username: e.target.value }) } defaultValue="dcai" />
        </FormGroup>
        <FormGroup controlId="formControlMargin">
          <ControlLabel>Margin: </ControlLabel>
          <FormControl type="text" defaultValue={ this.state.margin } onChange={ e => _this.setState({ margin: e.target.value ? parseFloat(e.target.value) : 0.2 }) } />
        </FormGroup>
        <FormGroup controlId="formControlSize">
          <ControlLabel>Size: </ControlLabel>
          <FormControl type="text" defaultValue={ this.state.size} onChange =
            { e => _this.setState({ size: e.target.value ? parseInt(e.target.value) : 120 }) } />
        </FormGroup>
      </Form>
      <img src={src} width={this.state.size} height={this.state.size} />
    </Col>
  }
  renderLeft() {
    return <Col mdPull={6} md={6} style={colPadding}>
      <h1>tux.im</h1>
    </Col>
  }
  renderFiglet() {
    const _this = this;

    return <Col mdPull={6} md={6} style={colPadding}>
      <h2 style={headerAlign}>figlet</h2>
      <Form horizontal>
        <FormGroup controlId="formControlUsername">
          <ControlLabel>Input</ControlLabel>
          <FormControl type="text" onChange={ e => _this.setState({ textinput: e.target.value }) } defaultValue="dcai" />
        </FormGroup>
        <FormGroup controlId="formControlSize">
          <ControlLabel>Output: </ControlLabel>
           <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>
      </Form>
    </Col>
  }
	render() {
		return <Grid>
      <Row className="show-grid">
        {this.renderIdenticon()}
        {this.renderLeft()}
      </Row>
		</Grid>
	}
}
