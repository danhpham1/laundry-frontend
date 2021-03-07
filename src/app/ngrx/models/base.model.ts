import { InitStateName } from './name.model';
import { InitStateGroup } from './group.model';
import { InitStateLaundry } from './laundry.model';
export interface IAppState {
    group: InitStateGroup;
    name: InitStateName;
    laundry: InitStateLaundry;
}