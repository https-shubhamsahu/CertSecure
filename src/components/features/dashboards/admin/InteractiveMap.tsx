
'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { INDIA_TOPO_JSON, STATE_PARTICIPATION, getStateColor } from '@/lib/india-states-data';

const InteractiveMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');

  return (
    <>
      <div data-tooltip-id="map-tooltip" className='w-full h-[400px] border bg-background rounded-lg'>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 800,
            center: [82, 22]
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup center={[82, 22]} zoom={1}>
            <Geographies geography={INDIA_TOPO_JSON}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm;
                  const participation = STATE_PARTICIPATION[stateName] || 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${stateName}: ${participation}% Participation`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
                      }}
                      style={{
                        default: {
                          fill: getStateColor(participation),
                          outline: 'none',
                          stroke: '#FFF',
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: '#2563eb',
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#1e3a8a',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <ReactTooltip id="map-tooltip" content={tooltipContent} />
      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#e6f5ea]"></div>
              <span>0-20%</span>
          </div>
          <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#b3e0c2]"></div>
              <span>20-40%</span>
          </div>
          <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#80cc99]"></div>
              <span>40-60%</span>
          </div>
          <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#4db870]"></div>
              <span>60-80%</span>
          </div>
          <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#1a9947]"></div>
              <span>80-100%</span>
          </div>
      </div>
    </>
  );
};

export default InteractiveMap;
