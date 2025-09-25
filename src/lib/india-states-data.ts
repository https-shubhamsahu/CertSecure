

export const INDIA_TOPO_JSON = {
  "type": "Topology",
  "objects": {
    "india": {
      "type": "GeometryCollection",
      "geometries": [
        // This is a truncated version for brevity. A full GeoJSON file would have all coordinates.
        { "type": "Polygon", "arcs": [[0]], "properties": { "st_nm": "Andaman & Nicobar Islands" } },
        { "type": "Polygon", "arcs": [[1]], "properties": { "st_nm": "Andhra Pradesh" } },
        { "type": "Polygon", "arcs": [[2]], "properties": { "st_nm": "Arunachal Pradesh" } },
        { "type": "Polygon", "arcs": [[3]], "properties": { "st_nm": "Assam" } },
        { "type": "Polygon", "arcs": [[4]], "properties": { "st_nm": "Bihar" } },
        { "type": "Polygon", "arcs": [[5]], "properties": { "st_nm": "Chandigarh" } },
        { "type": "Polygon", "arcs": [[6]], "properties": { "st_nm": "Chhattisgarh" } },
        { "type": "Polygon", "arcs": [[7]], "properties": { "st_nm": "Dadra & Nagar Haveli and Daman & Diu" } },
        { "type": "Polygon", "arcs": [[8]], "properties": { "st_nm": "Delhi" } },
        { "type": "Polygon", "arcs": [[9]], "properties": { "st_nm": "Goa" } },
        { "type": "Polygon", "arcs": [[10]], "properties": { "st_nm": "Gujarat" } },
        { "type": "Polygon", "arcs": [[11]], "properties": { "st_nm": "Haryana" } },
        { "type": "Polygon", "arcs": [[12]], "properties": { "st_nm": "Himachal Pradesh" } },
        { "type": "Polygon", "arcs": [[13]], "properties": { "st_nm": "Jammu & Kashmir" } },
        { "type": "Polygon", "arcs": [[14]], "properties": { "st_nm": "Jharkhand" } },
        { "type": "Polygon", "arcs": [[15]], "properties": { "st_nm": "Karnataka" } },
        { "type": "Polygon", "arcs": [[16]], "properties": { "st_nm": "Kerala" } },
        { "type": "Polygon", "arcs": [[17]], "properties": { "st_nm": "Ladakh" } },
        { "type": "Polygon", "arcs": [[18]], "properties": { "st_nm": "Lakshadweep" } },
        { "type": "Polygon", "arcs": [[19]], "properties": { "st_nm": "Madhya Pradesh" } },
        { "type": "Polygon", "arcs": [[20]], "properties": { "st_nm": "Maharashtra" } },
        { "type": "Polygon", "arcs": [[21]], "properties": { "st_nm": "Manipur" } },
        { "type": "Polygon", "arcs": [[22]], "properties": { "st_nm": "Meghalaya" } },
        { "type": "Polygon", "arcs": [[23]], "properties": { "st_nm": "Mizoram" } },
        { "type": "Polygon", "arcs": [[24]], "properties": { "st_nm": "Nagaland" } },
        { "type": "Polygon", "arcs": [[25]], "properties": { "st_nm": "Odisha" } },
        { "type": "Polygon", "arcs": [[26]], "properties": { "st_nm": "Puducherry" } },
        { "type": "Polygon", "arcs": [[27]], "properties": { "st_nm": "Punjab" } },
        { "type": "Polygon", "arcs": [[28]], "properties": { "st_nm": "Rajasthan" } },
        { "type": "Polygon", "arcs": [[29]], "properties": { "st_nm": "Sikkim" } },
        { "type": "Polygon", "arcs": [[30]], "properties": { "st_nm": "Tamil Nadu" } },
        { "type": "Polygon", "arcs": [[31]], "properties": { "st_nm": "Telangana" } },
        { "type": "Polygon", "arcs": [[32]], "properties": { "st_nm": "Tripura" } },
        { "type": "Polygon", "arcs": [[33]], "properties": { "st_nm": "Uttar Pradesh" } },
        { "type": "Polygon", "arcs": [[34]], "properties": { "st_nm": "Uttarakhand" } },
        { "type": "Polygon", "arcs": [[35]], "properties": { "st_nm": "West Bengal" } }
      ]
    }
  },
  "arcs": [
    [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]],
    [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]],
    [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]],
    [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]], [[1,1]],
    [[1,1]], [[1,1]], [[1,1]], [[1,1]]
  ]
};

export const STATE_PARTICIPATION: Record<string, number> = {
    "Maharashtra": 95,
    "Karnataka": 92,
    "Tamil Nadu": 88,
    "Delhi": 78,
    "Gujarat": 75,
    "West Bengal": 71,
    "Rajasthan": 58,
    "Uttar Pradesh": 55,
    "Telangana": 52,
    "Bihar": 38,
    "Odisha": 35,
    "Jharkhand": 31,
    "Andhra Pradesh": 65,
    "Kerala": 85,
    "Madhya Pradesh": 48,
    "Haryana": 68,
    "Punjab": 62,
    "Assam": 25,
    "Chhattisgarh": 42,
    "Himachal Pradesh": 45,
    "Uttarakhand": 50,
    "Jammu & Kashmir": 28,
    "Goa": 70,
    "Tripura": 18,
    "Meghalaya": 15,
    "Manipur": 19,
    "Nagaland": 12,
    "Arunachal Pradesh": 10,
    "Mizoram": 22,
    "Sikkim": 30,
    "Andaman & Nicobar Islands": 5,
    "Chandigarh": 40,
    "Dadra & Nagar Haveli and Daman & Diu": 20,
    "Lakshadweep": 8,
    "Puducherry": 35,
    "Ladakh": 11,
};

export const getStateColor = (participation: number): string => {
    if (participation > 80) return "#1a9947"; // Deep green
    if (participation > 60) return "#4db870"; // Medium green
    if (participation > 40) return "#80cc99"; // Light green
    if (participation > 20) return "#b3e0c2"; // Orange (using a light green instead of orange)
    return "#e6f5ea"; // Red (using a very light green instead of red)
};


    
