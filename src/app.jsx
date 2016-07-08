import React, { Component } from 'react';
import Modal from 'react-modal';
import Form from "react-jsonschema-form";
import fetch from 'isomorphic-fetch';
import isEmpty from 'lodash/isEmpty';
import unset from 'lodash/unset';
import {FormSchema, FormUISchema} from './schema.js';
import uuid from 'node-uuid';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      errors: [],
      statusText: '',
    };
  }
  renderForm() {
    const refId = uuid.v4();
    let formData = {
      creationId: refId,
      jobReference: refId,
    };
    let onSubmit = this.onSubmit.bind(this);
    if (window.__jobDetails) {
      formData = __jobDetails;
    }
    return <Form schema={FormSchema}
      uiSchema={FormUISchema}
      formData={formData}
      onChange={this.onChange}
      onSubmit={onSubmit}
      onError={this.onError} />
  }

  openModal(text, errors = []) {
    this.setState(Object.assign({}, this.state, { modal: true, statusText: text, errors: errors }));
  }

  closeModal() {
    this.setState(Object.assign({}, this.state, { modal: false }));
    window.location.reload(false);
  }

  renderErrors() {
    if (this.state.errors) {
      return <dl>
        {this.state.errors.map(error =>
          <div><dt>{error.field}</dt><dd>{error.message}</dd></div>
        )}
      </dl>
    }
  }

  render() {
    const _this = this;
    return (<div>
      { this.renderForm() }
      <Modal isOpen={_this.state.modal}>
        <h4> {_this.state.statusText} </h4>
        {this.renderErrors()}
        <button onClick={this.closeModal.bind(this)}>close</button>
      </Modal>
    </div>);
  }

  processFormData(formData) {
    if (!(formData.video && formData.video.url)) {
      unset(formData, 'video');
    }
    if (!(formData.granularLocation && formData.granularLocation.Country)) {
      unset(formData, 'granularLocation');
    }
    return formData;
  }

  onSubmit(e) {
    const formData = e.formData;
    console.dir(e);
    const _this = this;
    _this.openModal('Saving job details...');
    const data = this.processFormData(formData);
    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    fetch("/api/post", options)
    .then(res => {
      if (res.status > 400) {
        throw new Error(res);
      }
      return res.json()
    })
    .then(json => {
      if (json.message) {
        _this.openModal(json.message, json.errors);
      } else {
        _this.openModal('Saved!');
      }
    })
    .catch(res => console.error(res))
  }
  onChange({formData}) {
    console.dir(formData);
  }
  onError(data) {
    console.error(data);
  }
}
