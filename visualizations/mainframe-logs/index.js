import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, AutoSizer } from 'nr1';

import Screen from '../../components/Screen';
import Info from '../../components/Info';

const MainframeLogsVisualization = ({ nrqlQueries }) => {
  const nrqlQueryPropsAvailable =
	nrqlQueries &&
	nrqlQueries[0] &&
	nrqlQueries[0].accountId &&
	nrqlQueries[0].query;

  if (!nrqlQueryPropsAvailable) {
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
	    query={nrqlQueries[0].query}
	    accountId={parseInt(nrqlQueries[0].accountId)}
	    pollInterval={NrqlQuery.AUTO_POLL_INTERVAL}
	  >
	    {({data, loading, error}) => {
	      if (loading) return <Info>Loading...</Info>;
	      if (error) return <Info color="red">Critical system failure</Info>;

	      return (
		<p>Data recieved</p>
	      );
	    }}
	  </NrqlQuery>
	</Screen>
      )}
    </AutoSizer>
  );
};

MainframeLogsVisualization.propTypes = {
  nrqlQueries: PropTypes.arrayOf(
    PropTypes.shape({
      accountId: PropTypes.number,
      query: PropTypes.string,
    })
  ),
};

export default MainframeLogsVisualization;
