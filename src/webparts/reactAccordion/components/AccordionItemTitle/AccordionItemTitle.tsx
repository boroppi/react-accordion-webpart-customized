import * as React from 'react';
import { IAccordionItemTitleProps } from './IAccordionItemTitleProps';
import { IAccordionItemTitleState } from './IAccordionItemTitleState';

export class AccordionItemTitle extends React.Component<IAccordionItemTitleProps, IAccordionItemTitleState> {


    constructor(props: IAccordionItemTitleProps, state: IAccordionItemTitleState) {
        super(props);
        this.state = {
            expanded: false
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    // Triggered on key press
    protected handleKeyPress(e) {
        // spacebar or enter key
        if (e.charCode === 13 || e.charCode === 32) {
            this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
            console.log(this.state.expanded);
        }
    }

    protected onClick(e) {
        this.setState((prevState, props) => ({ expanded: !prevState.expanded }));
        console.log(this.state.expanded);
    }



    public render(): React.ReactElement<IAccordionItemTitleProps> {
        var children = this.props.children;
        var role = 'button';

        return React.createElement(
            'div',
            {
                id: this.props.id,
                onExpandedChange: this.props.onExpandedChange,
                expanded: this.state.expanded,
                'aria-expanded': this.state.expanded,
                'aria-controls': `accordion__body-${this.props.id.toString().split('-')[1]}`,
                className: this.props.className,
                onClick: this.onClick,
                role: role,
                tabIndex: '0' // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                , onKeyPress: this.handleKeyPress
            },
            children
        );
    }

}
