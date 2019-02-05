import * as React from 'react';

export interface IAccordionItemBodyProps {
    className: string;
    id: string | number;
    expanded: boolean;
}


export class AccordionItemBody extends React.Component<IAccordionItemBodyProps, {}> {
    constructor(props: IAccordionItemBodyProps) {
        super(props);
    }

    render(): React.ReactElement<IAccordionItemBodyProps> {
        let { children, expanded, className } = this.props;
        let _className = expanded ? className : `${className} accordion__body--hidden`;

        return React.createElement(
            'div',
            {
                id: this.props.id,
                expanded: this.props.expanded,
                className: _className,
                'aria-hidden': !this.props.expanded,
                'aria-labelledby': this.props.id.toString().replace('accordion__body-', 'accordion__title-')
            },
            children
        );
    }
}
