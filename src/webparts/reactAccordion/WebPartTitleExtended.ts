import * as React from "react";
import {
  WebPartTitle,
  IWebPartTitleProps
} from "@pnp/spfx-controls-react/lib/WebPartTitle";
import * as sp_core_library_1 from "@microsoft/sp-core-library";
import * as WebPartTitle_module_scss_1 from "../../../node_modules/@pnp/spfx-controls-react/lib/controls/webPartTitle/WebPartTitle.module.scss";
import * as strings from "ControlStrings";

export interface IWebPartTitleWithStylesProps extends IWebPartTitleProps {
  titleBGColor?: string;
  titleTextColor?: string;
}

export default class WebPartTitleWithStyles extends React.Component < IWebPartTitleWithStylesProps, {} > {
  

  constructor(props: IWebPartTitleWithStylesProps) {     
    super(props);
    // need to bind it in order to make it work as expected.
    this.onChange = this.onChange.bind(this);
  }

  private onChange(event) {
      this.props.updateProperty(event.target.value);
  }

  public render(): React.ReactElement < IWebPartTitleWithStylesProps > {
    if (
      this.props.title ||
      this.props.displayMode === sp_core_library_1.DisplayMode.Edit
    ) {
     console.log(this.props);
      return React.createElement(
        "div", {
          updateProperty: this.props.updateProperty,
          title: this.props.title,
          displayMode: this.props.displayMode,
          className: WebPartTitle_module_scss_1.default.webPartTitle +
            " " +
            (this.props.className ? this.props.className : ""),
          style: {
            "background-color": this.props.titleBGColor
          }
        },
        this.props.displayMode === sp_core_library_1.DisplayMode.Edit &&
        React.createElement("textarea", {
          style: {
            color: this.props.titleTextColor
          },
          placeholder: strings.WebPartTitlePlaceholder,
          "aria-label": strings.WebPartTitleLabel,
          onChange : this.onChange,
          defaultValue: this.props.title
        }),
        this.props.displayMode !== sp_core_library_1.DisplayMode.Edit &&
        this.props.title &&
        React.createElement(
          "span", {
            style: {
              color: this.props.titleTextColor
            }
          },
          this.props.title
        )
      );
    }
    return null;
  }
}
