export interface IAccordionItemBodyProps {
    className: string;
    id: string | number;
    updateExpanded: () => void;
    onExpandedChange: () => void;
}
