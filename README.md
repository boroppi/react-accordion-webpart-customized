## THIS IS A CUSTOMIZED VERSION OF A SAMPLE REACT ACCORDION PLUGIN

This is what the webpart look like:

![Web Part built using SPFx with React Framework showing list data in accordion format](./assets/previewAccordion2.PNG)


This webpart is a customized version of the sample react accordion plugin by microsoft which can be found here:

* [React Accordion](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-accordion)



## Using React Accordion plugin with SPFx


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- clone this repo
- in the command line run:
  - `npm i`
  - `gulp serve --nobrowser`
- in your SharePoint Site create a custom list named FAQ 
- in the FAQ list, create a column Description(internal name) of type Enhanced rich text and another column called SortOrder of type number
- add some list items with Title and Description values

- navigate to the hosted version of SharePoint workbench, eg. **https://contoso.sharepoint.com/sites/test/_layouts/15/workbench.aspx**
- add the Web Part to canvas and in its configuration specify:
- name of the list where list items are stored, eg. **FAQ**


## Features

This project contains sample client-side web part built on the SharePoint Framework illustrating how to show list data in Accordion format using React framework.

This sample illustrates the following concepts on top of the SharePoint Framework:

- general
  - performing SharePoint GET operation in React using inbuilt SP Http Client
  - Using Fabric UI button component for pagination      
  - optimizing REST responses for performance using nometadata option of JSON light
  - using PnP Webpart title control of @pnp/spfx-controls-react library
  - showing SharePoint list data in Accordion format using React Accessible Accordion plugin
  - searching in the fetched data by making use of Search Box from Office Fabric UI


### Add updated image

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
