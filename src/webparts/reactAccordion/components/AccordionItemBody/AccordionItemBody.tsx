import * as React from 'react';
import { IAccordionItemBodyProps } from './IAccordionItemBodyProps';
import { IAccordionItemBodyState } from './IAccordionItemBodyState';


export class AccordionItemBody extends React.Component<IAccordionItemBodyProps, IAccordionItemBodyState> {
    constructor(props: IAccordionItemBodyProps, state: IAccordionItemBodyState) {
        var _dat = super(props);
        this.state = {
            expanded: false
        }
        this.updateExpanded = this.updateExpanded.bind(this);
    }

    protected updateExpanded() {
        this.setState((prevState, props) => ({ expanded: !prevState.expanded }))
    }

    render(): React.ReactElement<IAccordionItemBodyProps> {
        let children = this.props.children;
        let className = this.state.expanded ? this.props.className : `${this.props.className} accordion__body--hidden`;

        return React.createElement(
            'div',
            {
                id: this.props.id,
                onExpandedChange: this.props.onExpandedChange,
                updateExpanded: this.updateExpanded,
                className: className,
                'aria-hidden': !this.state.expanded,
                'aria-labelledby': this.props.id.toString().replace('accordion__body-', 'accordion__title-')
            },
            children
        );
    }
}
