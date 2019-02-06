import * as React from 'react';
import styles from './ReactAccordion.module.scss';
import { IReactAccordionProps } from './IReactAccordionProps';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import {
  Accordion,
  AccordionItem
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/react-accessible-accordion.css';
import { IReactAccordionState } from "./IReactAccordionState";
import IAccordionListItem from "../models/IAccordionListItem";
import { AccordionWrapper } from "./AccordionWrapper";
import './accordion.css';
import IAccordionStyles from '../models/IAccordionStyles';


export default class ReactAccordion extends React.Component<IReactAccordionProps, IReactAccordionState> {

  constructor(props: IReactAccordionProps, state: IReactAccordionState) {
    super(props);
    this.state = {
      status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
      items: [],
      listItems: [],
      isLoading: false,
      loaderMessage: '',
      listName: this.props.listName
    };

    if (!this.listNotConfigured(this.props)) {
      this.readItems();
    }

    this.searchTextChange = this.searchTextChange.bind(this);
  }

  private listNotConfigured(props: IReactAccordionProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }

  private searchTextChange(event) {

    if (event === undefined ||
      event === null ||
      event === "") {
      let listItemsCollection = [...this.state.listItems];
      this.setState({ items: listItemsCollection.splice(0, this.props.maxItemsPerPage) });
    }
    else {
      var updatedList = [...this.state.listItems];
      updatedList = updatedList.filter((item) => {
        return item.Title.toLowerCase().search(
          event.toLowerCase()) !== -1 || item.Description.toLowerCase().search(
            event.toLowerCase()) !== -1;
      });
      this.setState({ items: updatedList });
    }
  }

  private readItems(): void {
    let restAPI = this.props.siteUrl + `/_api/web/Lists/GetByTitle('${this.props.listName}')/items?$select=Title,Description,SortOrder&$orderby=SortOrder`;

    this.props.spHttpClient.get(restAPI, SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    })
      .then((response: SPHttpClientResponse): Promise<{ value: IAccordionListItem[] }> => {
        if (response.status === 200)
          return response.json();
        else {
          return Promise.reject(new Error(`Bad Request - List ${this.props.listName} does not have required columns (Title, Description, SortOrder)`));
        }
      })
      .then((response: { value: IAccordionListItem[] }): void => {


        let listItemsCollection = [...response.value];

        this.setState({
          status: "",
          items: listItemsCollection.splice(0, this.props.maxItemsPerPage),
          listItems: response.value,
          isLoading: false,
          loaderMessage: ""
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading all items failed with error: ' + error,
          items: [],
          listItems: [],
          isLoading: false,
          loaderMessage: ""
        });
      });

  }


  public render(): React.ReactElement<IReactAccordionProps> {

    if (this.props.listName !== this.state.listName) {
      let _listName = this.props.listName;
      this.props.updateListName();
      this.setState({ listName: _listName });
      this.readItems();
    }

    console.log("ASDSADASD");
    let displayLoader;
    let faqTitle;
    let { listItems } = this.state;
    let pageCountDivisor: number = this.props.maxItemsPerPage;
    let pageCount: number;
    let pageButtons = [];

    let _pagedButtonClick = (pageNumber: number, listData: any) => {
      let startIndex: number = (pageNumber - 1) * pageCountDivisor;
      let listItemsCollection = [...listData];
      this.setState({ items: listItemsCollection.splice(startIndex, pageCountDivisor) });
    };

    const {
      questionBackgroundColor,
      questionTextColor,
      answerBackgroundColor,
      answerTextColor
    } = this.props;

    const accordionStyles: IAccordionStyles = {
      questionBGColor: questionBackgroundColor,
      questionTextColor: questionTextColor,
      answerBGColor: answerBackgroundColor,
      answerTextColor: answerTextColor
    };

    const items: JSX.Element[] = this.state.items.map((item: IAccordionListItem, i: number): JSX.Element => {
      return (
        <AccordionItem>
          <AccordionWrapper styles={accordionStyles} id={i} item={item} />
        </AccordionItem>
      );
    });

    if (this.state.isLoading) {
      displayLoader = (<div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
        <div className='ms-Grid-col ms-u-lg12'>
          <Spinner size={SpinnerSize.large} label={this.state.loaderMessage} />
        </div>
      </div>);
    }
    else {
      displayLoader = (null);
    }

    if (this.state.listItems.length > 0) {
      pageCount = Math.ceil(this.state.listItems.length / pageCountDivisor);
    }

    for (let i = 0; i < pageCount; i++) {
      pageButtons.push(<PrimaryButton style={{ backgroundColor: this.props.headerBackgroundColor, color: this.props.headerTextColor }} onClick={() => { _pagedButtonClick(i + 1, listItems); }}> {i + 1} </PrimaryButton>);
    }

    const titleStyle = {
      backgroundColor: this.props.headerBackgroundColor,
      color: this.props.headerTextColor
    };

    return (
      <div className={styles.reactAccordion}>
        <div className={styles.container}>
          {faqTitle}
          {displayLoader}
          <div className={styles.webpartTitle} style={titleStyle}>{this.props.title}</div>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-u-lg12'>
              <SearchBox
                onChange={this.searchTextChange}
              />
            </div>
          </div>
          <div className={`ms-Grid-row`}>
            <div className='ms-Grid-col ms-u-lg12'>
              {this.state.status}
              <Accordion accordion={false}>
                {items}
              </Accordion>
            </div>
          </div>
          <div className='ms-Grid-row'>
            <div className='ms-Grid-col ms-u-lg12'>
              {pageButtons}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
