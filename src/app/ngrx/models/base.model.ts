import { InitStateName } from './name.model';
import { InitStateGroup } from './group.model';
export interface IAppState {
    group: InitStateGroup;
    name: InitStateName;
}