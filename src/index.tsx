import React, { createElement } from 'react';
import { after } from '@rxfx/after';
import { bus } from './services/bus';
import { createRoot } from 'react-dom/client';
import { blockService } from './services/blockService';
import { initialState } from './services/blockService.reducer';
import { animationService } from './services/animationService';
import { Viz } from './components/Viz';
import { concat, takeUntil } from 'rxjs';

const viz = document.getElementById('viz') as HTMLElement;
const reqBtn = document.getElementById('request') as HTMLButtonElement;
const demoBtn = document.getElementById('demo') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const vizRoot = createRoot(viz);

// window.addEventListener('DOMContentLoaded', () => {
// console.log('DOMContentLoaded');

let i = 0;
reqBtn.addEventListener('click', () => blockService(i++));
demoBtn.addEventListener('click', () => {
  concat(
    after(0, () => blockService(i++)),
    after(1200, () => blockService(i++))
  )
    .pipe(takeUntil(bus.query(blockService.actions.cancel.match)))
    .subscribe();
});
resetBtn.addEventListener('click', () => {
  document.location.reload();
});
cancelBtn.addEventListener('click', () => {
  blockService.cancelCurrentAndQueued();
  animationService.cancelCurrent(); // singleton - has no queue
});
vizRoot.render(createElement(Viz, { blocks: initialState.blocks }));
// });
