import * as React from 'react';

export interface IAccordionItemTitleProps {
    bgColor?: string;
    textColor?: string;
    className: string;
    id: string | number;
    expanded: boolean;
    onClick: () => void;
}


export class AccordionItemTitle extends React.Component<IAccordionItemTitleProps, {}> {

    constructor(props: IAccordionItemTitleProps) {
        super(props);
    }

    public render(): React.ReactElement<IAccordionItemTitleProps> {
        var children = this.props.children;
        var role = 'button';
        let { bgColor, textColor, className, id, expanded } = this.props;

        return (
            <div id={`${this.props.id}`}
                onClick={this.props.onClick}
                style={{ backgroundColor: bgColor, color: textColor }}
                className={className}
                aria-expanded={expanded}
                aria-controls={`accordion__body-${id}`.split('-')[1]}
                role={role}
            >
                {children}
            </div>
        );
    }
}
