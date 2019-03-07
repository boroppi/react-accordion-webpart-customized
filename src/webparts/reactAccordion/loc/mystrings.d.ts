declare interface IReactAccordionWebPartStrings {
  PropertyPaneGeneralDescription: string;
  PropertyPaneHeaderStylesDescription: string;
  PropertyPaneQuestionStylesDescription: string;
  PropertyPaneAnswerStylesDescription: string;
  BasicGroupName: string;
  ListNameLabel: string;
  TitleLabel: string;
  MaxItemsPerPageLabel: string;
  MaxItemsToFetchFromTheListLabel: string;
  HeaderGroupName: string;
  QuestionGroupName: string;
  AnswerGroupName: string;
  HeaderBackgroundColorLabel: string;
  HeaderTextColorLabel: string;
  QuestionBackgroundColorLabel: string;
  QuestionTextColorLabel: string;
  AnswerBackgroundColorLabel: string;
  AnswerTextColorLabel: string;
  ResetStyleButtonText: string;
  isSearchAbleText: string;
}

declare module "ReactAccordionWebPartStrings" {
  const strings: IReactAccordionWebPartStrings;
  export = strings;
}
