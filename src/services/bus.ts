import { Action } from 'typescript-fsa';
import { Bus } from '@rxfx/bus';
export { Bus } from '@rxfx/bus';

// Defines our bus and its types
export const bus = new Bus<Action<any>>();
bus.guard(
  (e) => !e.type.startsWith('ani'),
  (e) => console.log(e.type, e.payload)
);

window.bus = bus;
