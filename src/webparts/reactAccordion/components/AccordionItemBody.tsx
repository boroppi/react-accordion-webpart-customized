import * as React from 'react';

export interface IAccordionItemBodyProps {
    className: string;
    id: string | number;
    expanded: boolean;
    bgColor?: string;
    textColor?: string;
}


export class AccordionItemBody extends React.Component<IAccordionItemBodyProps, {}> {
    constructor(props: IAccordionItemBodyProps) {
        super(props);
    }

    public render(): React.ReactElement<IAccordionItemBodyProps> {
        let { children, expanded, className, bgColor, textColor, id } = this.props;
        let _className = expanded ? className : `${className} accordion__body--hidden`;
        let style = `background-color: ${bgColor}; color: ${textColor}`;

        return (
            <div id={`${id}`}
                className={_className}
                style={{ backgroundColor: bgColor, color: textColor }}
                aria-hidden={!expanded}
                aria-labelledby={`${id}`.replace('accordion__body-', 'accordion__title-')}
            >
                {children}
            </div>
        );
    }
}
