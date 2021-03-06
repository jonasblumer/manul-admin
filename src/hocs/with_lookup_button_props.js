
import { composeWithTracker, composeAll } from 'mantra-core';
import { withState } from 'recompose';

export const composer = () => ({ context, collectionName, ...props }, onData) => {
  const {
    adminContext: {
      getComponent,
    },
  } = context();

  const LookupButton = getComponent({ collectionName, type: 'lookupButton' });
  const Modal = getComponent({ collectionName, type: 'modal' });

  onData(null, { LookupButton, Modal });
};


export default () => composeAll(
  withState('showLookupModal', 'setShowLookupModal'),
  composeWithTracker(composer()),
);
