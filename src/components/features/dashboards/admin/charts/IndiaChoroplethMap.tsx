'use client';

import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';

import { cn } from '@/lib/utils';

export type IndiaChoroplethDatum = {
    id: string;
    value: number;
};

type HoverState = {
    name: string;
    value: number | null;
};

const INDIA_TOPOJSON_URL =
    'https://raw.githubusercontent.com/varunon9/india-choropleth-javascript/master/src/india.topo.json';

const COLOR_RANGE = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
];

const PROJECTION_CONFIG = {
    // Tuned to fill the typical dashboard card height without excess whitespace.
    scale: 760,
    center: [80.5, 22.8] as [number, number],
};

export function IndiaChoroplethMap({
    data,
    className,
    valueLabel = 'Value',
    valueFormatter,
}: {
    data: IndiaChoroplethDatum[];
    className?: string;
    valueLabel?: string;
    valueFormatter?: (value: number) => string;
}) {
    const [hovered, setHovered] = useState<HoverState | null>(null);

    const { dataById, colorScale, min, max } = useMemo(() => {
        const values = data.map((d) => d.value).filter((v) => Number.isFinite(v));
        const minValue = values.length ? Math.min(...values) : 0;
        const maxValue = values.length ? Math.max(...values) : 0;

        const byId = new Map<string, number>();
        for (const datum of data) byId.set(datum.id, datum.value);

        const scale = scaleQuantile<string>()
            .domain(values.length ? values : [0])
            .range(COLOR_RANGE);

        return { dataById: byId, colorScale: scale, min: minValue, max: maxValue };
    }, [data]);

    const formatValue = (value: number) => (valueFormatter ? valueFormatter(value) : String(value));

    return (
        <div className={cn('relative h-full w-full', className)}>
            <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-lg surface px-3 py-2 text-xs">
                <div className="text-muted-foreground">
                    {hovered
                        ? `${hovered.name}: ${hovered.value == null ? 'N/A' : formatValue(hovered.value)}`
                        : 'Hover a state to see details'}
                </div>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={PROJECTION_CONFIG}
                width={800}
                height={430}
                style={{ width: '100%', height: '100%' }}
            >
                <Geographies geography={INDIA_TOPOJSON_URL}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const value = dataById.get(geo.id);
                            const fill = value == null ? 'hsl(var(--muted))' : colorScale(value);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={fill}
                                    stroke="hsl(var(--border))"
                                    strokeWidth={0.6}
                                    style={{
                                        default: { outline: 'none' },
                                        hover: { outline: 'none', opacity: 0.9 },
                                        pressed: { outline: 'none' },
                                    }}
                                    onMouseEnter={() => {
                                        const name = (geo.properties?.name as string | undefined) ?? 'Unknown';
                                        setHovered({ name, value: value ?? null });
                                    }}
                                    onMouseLeave={() => setHovered(null)}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-lg surface px-3 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground/90">{valueLabel}</span>
                    <span>{min}</span>
                    <div className="flex items-center gap-1">
                        {COLOR_RANGE.map((c) => (
                            <span
                                key={c}
                                className="h-2.5 w-5 rounded-sm"
                                style={{ backgroundColor: c }}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <span>{max}</span>
                </div>
                <div className="hidden sm:block">Source: india-choropleth-javascript</div>
            </div>
        </div>
    );
}
