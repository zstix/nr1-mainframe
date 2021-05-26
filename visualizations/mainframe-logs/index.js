import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, AutoSizer } from 'nr1';

import { stringifyResults } from './utils';
import Screen from '../../components/Screen';
import Info from '../../components/Info';
import Type from '../../components/Type';

const MainframeLogsVisualization = ({ accountId, query }) => {
  if (!accountId || !query) {
    return (
      <Screen>
	<p>Awaiting input...</p>
	<p>Enter a query that yeilds tabular data</p>
      </Screen>
    )
  }

  return (
    <AutoSizer>
      {({width, height}) => (
	<Screen>
	  <NrqlQuery
	    query={query}
	    accountId={parseInt(accountId)}
	    pollInterval={NrqlQuery.AUTO_POLL_INTERVAL}
	  >
	    {({data, loading, error}) => {
	      if (loading) {
		return <Info>Loading...</Info>;
	      }

	      if (error || !data.length || !data[0].data) {
		return (
		  <Info color={Info.COLORS.RED}>
		    Critical system failure
		  </Info>
		);
	      }

	      const results = data[0].data;

	      return <Type text={stringifyResults(results)} />;
	    }}
	  </NrqlQuery>
	</Screen>
      )}
    </AutoSizer>
  );
};

MainframeLogsVisualization.propTypes = {
  accountId: PropTypes.number,
  query: PropTypes.string,
};

export default MainframeLogsVisualization;
