import { PanelListModel } from "./panelList.model";

export class PanelPopulatedModel {
    _id?: string;
    name?: string;
    members?: PanelListModel[];
    isClosed?: boolean;
}