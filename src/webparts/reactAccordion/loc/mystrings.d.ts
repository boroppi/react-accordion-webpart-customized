declare interface IReactAccordionWebPartStrings {
  PropertyPaneGeneralDescription: string;
  PropertyPaneHeaderStylesDescription: string;
  PropertyPaneQuestionStylesDescription: string;
  PropertyPaneAnswerStylesDescription: string;
  BasicGroupName: string;
  ListNameLabel: string;
  MaxItemsPerPageLabel: string;
  HeaderGroupName: string;
  QuestionGroupName: string;
  AnswerGroupName: string;
}

declare module 'ReactAccordionWebPartStrings' {
  const strings: IReactAccordionWebPartStrings;
  export = strings;
}
