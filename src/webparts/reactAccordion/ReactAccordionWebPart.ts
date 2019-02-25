import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, DisplayMode } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneButton,
  PropertyPaneDropdownOptionType,
  PropertyPaneButtonType
} from "@microsoft/sp-webpart-base";
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";

import * as strings from "ReactAccordionWebPartStrings";
import ReactAccordion from "./components/ReactAccordion";
import { IReactAccordionProps } from "./components/IReactAccordionProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISPLists, ISPList } from "./models/ISPList";
//import { listViewHostComponentId } from '../../../temp/workbench-packages/@microsoft_sp-loader/lib/utilities/componentConstants';

export interface IReactAccordionWebPartProps {
  headerBackgroundColor: string;
  headerTextColor: string;
  questionBackgroundColor: string;
  questionTextColor: string;
  answerBackgroundColor: string;
  answerTextColor: string;
  listName: string;
  choice: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  maxItemsToFetchFromTheList: number;
}

export default class ReactAccordionWebPart extends BaseClientSideWebPart<
  IReactAccordionWebPartProps
> {
  private lists: IPropertyPaneDropdownOption[];

  public render(): void {
    const element: React.ReactElement<
      IReactAccordionProps
    > = React.createElement(ReactAccordion, {
      headerBackgroundColor: this.properties.headerBackgroundColor,
      headerTextColor: this.properties.headerTextColor,
      questionBackgroundColor: this.properties.questionBackgroundColor,
      questionTextColor: this.properties.questionTextColor,
      answerBackgroundColor: this.properties.answerBackgroundColor,
      answerTextColor: this.properties.answerTextColor,
      listName: this.properties.listName,
      spHttpClient: this.context.spHttpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl,
      title: this.properties.title,
      displayMode: this.displayMode,
      maxItemsPerPage: this.properties.maxItemsPerPage,
      maxItemsToFetchFromTheList: this.properties.maxItemsToFetchFromTheList,
      updateListName: () => {
        this.render();
      }
    });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private _getListData(): Promise<ISPLists> {
    let restAPI =
      this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists?$filter=Hidden eq false`;
    return this.context.spHttpClient
      .get(restAPI, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _loadSPLists(): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>(
      (
        resolve: (options: IPropertyPaneDropdownOption[]) => void,
        reject: (error: any) => void
      ) => {
        this._getListData().then(data => {
          var list = [];
          data.value.map((item, i) => {
            list.push({ key: item.Title, text: item.Title });
          });
          resolve(list);
        });
      }
    );
  }

  protected onPropertyPaneConfigurationStart(): void {
    if (this.lists) {
      return;
    }
    this.context.statusRenderer.displayLoadingIndicator(
      this.domElement,
      "lists"
    );
    this._loadSPLists().then(
      (listOptions: IPropertyPaneDropdownOption[]): void => {
        this.lists = listOptions;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      }
    );
  }

  protected onResetHeaderColorProperty = (): void => {
    this.properties.headerBackgroundColor = "#000047";
    this.properties.headerTextColor = "#ffffff";
  };

  protected onResetQuestionColorProperty = (): void => {
    this.properties.questionBackgroundColor = "#ffffff";
    this.properties.questionTextColor = "#000000";
  };

  protected onResetAnswerColorProperty = (): void => {
    this.properties.answerBackgroundColor = "#ffffff";
    this.properties.answerTextColor = "#000000";
  };

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneGeneralDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleLabel
                }),
                PropertyPaneDropdown("listName", {
                  label: strings.ListNameLabel,
                  options: this.lists
                }),
                PropertyPaneSlider("maxItemsToFetchFromTheList", {
                  label: strings.MaxItemsToFetchFromTheListLabel,
                  ariaLabel: strings.MaxItemsToFetchFromTheListLabel,
                  min: 3,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneSlider("maxItemsPerPage", {
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneHeaderStylesDescription
          },
          groups: [
            {
              groupName: strings.HeaderGroupName,
              groupFields: [
                PropertyFieldColorPicker("headerBackgroundColor", {
                  label: strings.HeaderBackgroundColorLabel,
                  selectedColor: this.properties.headerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "headerBackgroundColor"
                }),
                PropertyFieldColorPicker("headerTextColor", {
                  label: strings.HeaderTextColorLabel,
                  selectedColor: this.properties.headerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "headerTextColor"
                }),
                PropertyPaneButton("resetBtn", {
                  onClick: this.onResetHeaderColorProperty,
                  text: strings.ResetStyleButtonText,
                  buttonType: PropertyPaneButtonType.Normal
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneQuestionStylesDescription
          },
          groups: [
            {
              groupName: strings.QuestionGroupName,
              groupFields: [
                PropertyFieldColorPicker("questionBackgroundColor", {
                  label: strings.QuestionBackgroundColorLabel,
                  selectedColor: this.properties.questionBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "questionBackgroundColor"
                }),
                PropertyFieldColorPicker("questionTextColor", {
                  label: strings.QuestionTextColorLabel,
                  selectedColor: this.properties.questionTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "questionTextColor"
                }),
                PropertyPaneButton("resetBtn", {
                  onClick: this.onResetQuestionColorProperty,
                  text: strings.ResetStyleButtonText,
                  buttonType: PropertyPaneButtonType.Normal
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneAnswerStylesDescription
          },
          groups: [
            {
              groupName: strings.AnswerGroupName,
              groupFields: [
                PropertyFieldColorPicker("answerBackgroundColor", {
                  label: strings.AnswerBackgroundColorLabel,
                  selectedColor: this.properties.answerBackgroundColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "answerBackgroundColor"
                }),
                PropertyFieldColorPicker("answerTextColor", {
                  label: strings.AnswerTextColorLabel,
                  selectedColor: this.properties.answerTextColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "answerTextColor"
                }),
                PropertyPaneButton("resetBtn", {
                  onClick: this.onResetAnswerColorProperty,
                  text: strings.ResetStyleButtonText,
                  buttonType: PropertyPaneButtonType.Normal
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
