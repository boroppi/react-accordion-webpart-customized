import * as React from 'react';
import { AccordionItemTitle } from './AccordionItemTitle';
import { AccordionItemBody } from './AccordionItemBody';
import IReactAccordionListItem from '../models/IAccordionListItem'

export interface IAccordionWrapperProps {
    id: number;
    item: IReactAccordionListItem;
}

export interface IAccordionWrapperStats {
    expanded: boolean;
}

export class AccordionWrapper extends React.Component<IAccordionWrapperProps, IAccordionWrapperStats> {
    constructor(props: IAccordionWrapperProps, state: IAccordionWrapperStats) {
        super(props)

        this.state = {
            expanded: false
        }

        this.onClick = this.onClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    // Triggered on key press
    protected handleKeyPress(e) {
        // spacebar or enter key
        if (e.charCode === 13 || e.charCode === 32) {
            this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
        }
    }

    protected onClick() {
        this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
    }

    render(): React.ReactElement<IAccordionWrapperProps> {
        let { Title, Description } = this.props.item;
        let { id } = this.props;
        return (
            <div id={`accordion__wrapper-${id}`} tabIndex={0} onClick={this.onClick} onKeyPress={this.handleKeyPress}>
                <AccordionItemTitle expanded={this.state.expanded} id={`accordion__title-${id}`} className={"accordion__title"}>
                    <h3 className="u-position-relative">{Title}</h3>
                    <div className="accordion__arrow" role="presentation" />
                </AccordionItemTitle>
                <AccordionItemBody expanded={this.state.expanded} id={`accordion__body-${id}`} className={"accordion__body"}>
                    <div className="" dangerouslySetInnerHTML={{ __html: Description }}>
                    </div>
                </AccordionItemBody>
            </div>
        );
    }
}
