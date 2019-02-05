import * as React from 'react';

export interface IAccordionItemTitleProps {
    bgColor?: string;
    textColor?: string;
    className: string;
    id: string | number;
    expanded: boolean;
}


export class AccordionItemTitle extends React.Component<IAccordionItemTitleProps, {}> {

    constructor(props: IAccordionItemTitleProps) {
        super(props);

    }

    public render(): React.ReactElement<IAccordionItemTitleProps> {
        var children = this.props.children;
        var role = 'button';

        return React.createElement(
            'div',
            {
                id: this.props.id,
                expanded: this.props.expanded,
                'aria-expanded': this.props.expanded,
                'aria-controls': `accordion__body-${this.props.id.toString().split('-')[1]}`,
                className: this.props.className,
                role: role,
            },
            children
        );
    }

}
