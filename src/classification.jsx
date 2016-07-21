import React, { Component } from 'react';
import sc from './seekclassification.js';
import _ from 'lodash';

export default class Classification extends Component {
  constructor(props) {
    super(props);
    const subclass = props.value;

    let classId = null;
    sc.seekClassification.forEach( e => {
      var cid = e.id;
      var children = e.subclass;
      children.forEach(item => {
        if (item.classname == subclass) {
          classId = cid;
        }
      })
    });
    this.state = {
      subclass,
      classId,
      className: '',
    }
  }
  changeClassId(classId) {
    this.setState(Object.assign({}, this.state, { classId }));
  }
  selectSubClass(className) {
    this.props.onChange(className)
    this.setState(Object.assign({}, this.state, { className }));
  }
  renderSubclass() {
    const _this = this;
    const cid = this.state.classId;
    const parentClass = _.find(sc.seekClassification, o => {
      return o.id == cid
    });

    if (parentClass) {
      const children = parentClass.subclass;
      return <select defaultValue={this.state.subclass} onChange={e => { _this.selectSubClass(e.target.value) } }>{
        children.map(item => <option key={item.id} value={item.classname}>{item.classname}</option>)
      }</select>;
    }

  }
  render() {
    const _this = this;
    return <div>
      <select defaultValue={_this.state.classId} onChange={e => { _this.changeClassId(e.target.value) } }>
      {
      sc.seekClassification.map(item => {
        return <option key={item.id} value={item.id}>{item.classname}</option>
      })
      }
      </select>
      {this.renderSubclass()}
      </div>
  }
}
