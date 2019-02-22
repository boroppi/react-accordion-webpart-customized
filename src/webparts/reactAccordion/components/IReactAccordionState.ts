import IAccordionListItem from "../models/IAccordionListItem";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

export interface IReactAccordionState {
  status: string;
  items: IAccordionListItem[];
  listItems: IAccordionListItem[];
  isLoading: boolean;
  loaderMessage: string;
  listName: string;
  activeButtonIndex: number;
}
