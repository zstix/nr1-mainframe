import React from 'react';
import PropTypes from 'prop-types';
import { NrqlQuery, AutoSizer } from 'nr1';

import Screen from '../../components/Screen';
import Info from '../../components/Info';

import map from './map-outline.png';

// NOTE: due to time constraints, I didn't have time to work out correct coordinates
const getPos = ({ asnLatitude, asnLongitude }) => {
  const lat = (asnLatitude * 80) / 90;
  const long = (asnLongitude * 80) / 180;

  return {
    transform: `translate(calc(40% * ${long}), calc(40% * ${lat}) - 100px)`
  };
};

const MainframeMapVisualization = ({ accountId, query }) => {
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
	  <div className="mainframe-map">
	    <img src={map} />
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

		if (!results.some((loc) => 'asnLatitude' in loc || 'asnLongitude' in loc)) {
		  return (
		    <Info color={Info.COLORS.RED}>
		      No location data detected
		    </Info>
		  );
		}

		return results.map((loc, index) => (
		  <div className="mainframe-map-point" style={getPos(loc)} />
		));
	      }}
	    </NrqlQuery>
	  </div>
	</Screen>
      )}
    </AutoSizer>
  );
};

MainframeMapVisualization.propTypes = {
  accountId: PropTypes.number,
  query: PropTypes.string,
};

export default MainframeMapVisualization;
