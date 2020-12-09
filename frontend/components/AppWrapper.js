import React from 'react';

import {cursor} from '@airtable/blocks';
import {
    useBase,
    useLoadable,
    useWatchable,
    Box,
    Text,
    ViewportConstraint
} from '@airtable/blocks/ui';

import App from './App';

function Error(message) {
  return (
    <Box padding={2} display="flex" alignItems="center" justifyContent="center" height="100%">
      <Text>{message}</Text>
    </Box>
  )
}

function AppWrapper({settings}) {
  useLoadable(cursor);

  // Watch
  useWatchable(cursor, ['activeTableId', 'activeViewId']);

  // Data
  const base = useBase();
  if(!cursor.activeViewId || !cursor.activeViewId) {
    return '';
  }
  const activeTable = base.getTableByIdIfExists(cursor.activeTableId);
  const activeView = activeTable.getViewByIdIfExists(cursor.activeViewId);

  if (activeTable.getFieldByNameIfExists(settings.mapboxJsonTitle) === null) {
    return Error(`GeoJSON field, “${settings.mapboxJsonTitle}”, does not exist on this table.`)
  }

  if (settings.mapboxLabelField && activeTable.getFieldByNameIfExists(settings.mapboxLabelField) === null) {
    return Error(`Label field, "${settings.mapboxLabelField}”, does not exist on this table.`)
  }

  return (
    <ViewportConstraint minSize={{width: 530}}>
      <App
        settings={settings}
        activeTable={activeTable}
        activeView={activeView}
      />
   </ViewportConstraint>
  );
}

export default AppWrapper;
