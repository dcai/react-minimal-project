import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import Classification from './classification.jsx';

export const FormSchema = {
  type: 'object',
  required: [
    'jobTitle',
    'workType',
    'jobSummary',
    'advertisementDetails',
    'subclassificationId',
  ],
  properties: {
    creationId: {
      type: 'string',
    },
    thirdParties: {
      type: 'object',
      title: 'Additional Properties',
      required: ['advertiserId'],
      properties: {
        advertiserId: {
          type: 'string',
          default: '35679927',
        },
      },
    },
    advertisementType: {
      type: 'string',
      default: 'Classic',
      //enum: ['Classic', 'StandOut'],
    },
    jobTitle: {
      type: 'string',
      title: 'Job Title',
      default: 'Job title...',
    },
    searchJobTitle: {
      type: 'string',
      title: 'Search Job Title',
    },
    granularLocation: {
      type: 'object',
      title: 'Granular Location',
      properties: {
        country: {
          type: 'string',
          default: 'Australia',
        },
        state: {
          type: 'string',
          default: 'NSW',
        },
        city: {
          type: 'string',
          default: 'Sydney',
        },
        postCode: {
          type: 'string',
          default: 2000,
        },
      },
    },
    subclassificationId: {
      type: 'string',
      title: 'Sub-classification Id',
      default: 'DevelopersProgrammers',
    },
    workType: {
      type: 'string',
      title: 'Work Type',
      enum: ['FullTime', 'PartTime', 'Casual', 'ContractTemp'],
      enumNames: ['FullTime', 'PartTime', 'Casual', 'ContractTemp'],
    },
    salary: {
      type: 'object',
      title: 'Salary',
      required: ['type', 'minimum', 'maximum'],
      properties: {
        type: {
          type: 'string',
          title: 'Salary Type',
          enum: ['AnnualPackage', 'AnnualCommission', 'CommissionOnly', 'HourlyRate'],
        },
        minimum: {
          type: 'number',
          title: 'Minimum Salary',
          default: 18,
        },
        maximum: {
          type: 'number',
          title: 'Maximum Salary',
          default: 19,
        },
        details: {
          type: 'string',
          title: 'Details',
        },
      },
    },
    jobSummary: {
      type: 'string',
      title: 'Job Summary',
      default: 'Summary...',
    },
    advertisementDetails: {
      type: 'string',
      title: 'Advertisement Details',
      default: 'Details...',
    },
    contact: {
      type: 'object',
      title: 'Contact',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
        },
        phone: {
          type: 'string',
          title: 'Phone',
        },
        email: {
          type: 'string',
          title: 'Email',
        },
      },
    },
    video: {
      type: 'object',
      title: 'Video',
      properties: {
        url: {
          type: 'string',
        },
        position: {
          type: 'string',
          title: 'Position',
          enum: ['Above', 'Below'],
        },
      },
    },
    applicationEmail: {
      type: 'string',
      title: 'Application Email',
    },
    screenId: {
      type: 'number',
    },
    jobReference: {
      type: 'string',
      title: 'Job Reference',
    },
    //agentJobReference: {
      //type: 'string',
      //title: 'Agent Job Reference',
    //},
    //standout: {
      //type: 'object',
      //title: 'Standout',
      //properties: {
        //logoId: {
          //type: 'number',
        //},
        //bullets: {
          //type: 'array',
          //title: 'Bullets',
          //items: {
            //'type': 'string',
            //'title': 'bullet',
          //}
        //},
      //},
    //},
    additionalProperties: {
      type: 'array',
      title: 'Additional Properties',
      uniqueItems: true,
      items: {
        type: 'string',
        enum: [
          'ResidentsOnly',
          //'Graduate',
        ]
      }
    },
  }
};

export const FormUISchema = {
  additionalProperties: {
    'ui:widget': 'checkboxes',
  },
  creationId: {
    'ui:widget': 'hidden',
  },
  advertisementType: {
    'ui:widget': 'hidden',
  },
  salary: {
    type: {
      'ui:widget': 'radio',
    }
  },
  workType: {
    'ui:widget': 'radio',
  },
  subclassificationId: {
    'ui:widget': Classification,
  },
  advertisementDetails: {
    'ui:widget': (props) => {
      return  (
        <TinyMCE
        content={props.value}
        config={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onChange={
          (event) => {
            props.onChange(event.target.getContent())
          }
        }
        />
      );
    },
  },
  jobSummary: {
    'ui:widget': 'textarea',
  },
};

