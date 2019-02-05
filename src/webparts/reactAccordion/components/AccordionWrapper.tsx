import * as React from 'react';
import { AccordionItemTitle } from './AccordionItemTitle';
import { AccordionItemBody } from './AccordionItemBody';
import IReactAccordionListItem from '../models/IAccordionListItem';
import IAccordionStyles from '../models/IAccordionStyles';

export interface IAccordionWrapperProps {
    id: number;
    item: IReactAccordionListItem;
    styles?: IAccordionStyles;
}

export interface IAccordionWrapperStats {
    expanded: boolean;
}

export class AccordionWrapper extends React.Component<IAccordionWrapperProps, IAccordionWrapperStats> {
    constructor(props: IAccordionWrapperProps, state: IAccordionWrapperStats) {
        super(props);

        this.state = {
            expanded: false
        };

        this.onClick = this.onClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // Triggered on key press
    private handleKeyPress(e) {
        // spacebar or enter key
        if (e.charCode === 13 || e.charCode === 32) {
            this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
        }
    }

    private onClick() {
        this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
    }

    public render(): React.ReactElement<IAccordionWrapperProps> {
        let { Title, Description } = this.props.item;
        let { id } = this.props;
        let { questionBGColor, questionTextColor, answerBGColor, answerTextColor } = this.props.styles;
        // Here removing the styles background-color and color that comes from rich text editor for the span element
        let _Description = Description.replace(/(color&#58;#[a-f0-9]+;)/, '');
        _Description = _Description.replace(/(background-color&#58;#[a-f0-9]+;)/, '');

        return (
            <div id={`accordion__wrapper-${id}`} tabIndex={0} onKeyPress={this.handleKeyPress}>
                <AccordionItemTitle onClick={this.onClick}
                    bgColor={questionBGColor}
                    textColor={questionTextColor}
                    expanded={this.state.expanded} id={`accordion__title-${id}`}
                    className={"accordion__title"}>
                    <h3 className="u-position-relative">{Title}</h3>
                    <div className="accordion__arrow" role="presentation" />
                </AccordionItemTitle>
                <AccordionItemBody bgColor={answerBGColor} textColor={answerTextColor}
                    expanded={this.state.expanded} id={`accordion__body-${id}`}
                    className={"accordion__body"}>
                    <div className="" dangerouslySetInnerHTML={{ __html: _Description }}>
                    </div>
                </AccordionItemBody>
            </div>
        );
    }
}
