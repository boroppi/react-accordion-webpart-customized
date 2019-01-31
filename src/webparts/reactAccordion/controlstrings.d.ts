declare interface IControlStringsProps {
    WebPartTitlePlaceholder : string = "Enter a title here";
    WebPartTitleLabel: string = "Add a title";
}

declare module 'ControlStrings' {
    const strings: IControlStringsProps;
    export = strings;
}
