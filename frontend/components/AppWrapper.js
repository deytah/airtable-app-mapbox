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
    return (
      <Box padding={2} display="flex" alignItems="center" justifyContent="center" height="100%">
        <Text>
          GeoJSON field “{settings.mapboxJsonTitle}” not found for the current table.
        </Text>
      </Box>
    );
  }

  return (
    <ViewportConstraint minSize={{width: 530}}>
      <App settings={settings}
        activeView={activeView}
      />
   </ViewportConstraint>
  );
}

export default AppWrapper;