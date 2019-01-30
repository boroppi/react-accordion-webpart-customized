import { WebPartTitle, IWebPartTitleProps } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export interface IWebPartTitleExtendedProps extends IWebPartTitleProps{
    BGColor: string;
    TextColor: string;
}

export default class WebPartTitleExtended extends WebPartTitle {
    constructor(props: IWebPartTitleExtendedProps) {
        super(props);
    }       

}