const API_KEY = 'v2:c18e92ffdbf73daa34791f238e88238435f8b27a9e915b8bd58df03a0029a2fb:2PEISlu75MBbXAa-XnqRuSXstDY4oNNg'
const CP_AVAIL_URL = "https://api.data.gov.sg/v1/transport/carpark-availability"; 
const CP_DATA_URL = "https://data.gov.sg/api/action/datastore_search?resource_id=d_23f946fa557947f93a8043bbef41dd09&limit=2500";

const AIRTABLE_TOKEN="pat8HdnQLSQS9Kreg.6d93c1d483ad54392ecca8a99dddabac1391c29de48d9c5c442739fd047c610f"
const AIRTABLE_BASE_ID="appp4vOAyvwG6nToW"
const AIRTABLE_TABLE_NAME = "Favorites";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

const AIRTABLE_TOKEN_BU = 'pat8HdnQLSQS9Kreg.6d93c1d483ad54392ecca8a99dddabac1391c29de48d9c5c442739fd047c610f';


const getCarparkData = async () => {
  try {
    const response = await fetch(CP_DATA_URL, {
      headers: {'X-API-Key': API_KEY}
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data. ')
    }
    const result = await response.json();
    const data = result.result.records;
    return data;
  } catch (error) {
    console.log(error);
  }
}

const getCarparkAvailability = async (carpark_number) => {
  try {
    const response = await fetch(CP_AVAIL_URL, {
      headers: {'X-API-Key': API_KEY}
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }
    const result = await response.json();
    const data = result.items[0].carpark_data;
    //console.log(carparkData);
    //Finding specific carpark data 
    // const filteredCarparkData = data.find(cp => cp.carpark_number === carpark_number);

    // if (filteredCarparkData) {
    //   const info = filteredCarparkData.carpark_info[0];
    //   console.log(info);
    //   console.log('Available: ', info.lots_available, ' / ', info.total_lots);
    //   console.log('Last update', result.timestamp)
    // }
//    console.log(result.items[0].carpark_data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

//getCarparkAvailability();

const getFavorites = async () => {
  try {
    const response = await fetch(AIRTABLE_URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch favorites.');
    }
    const result = await response.json();
    return result.records.map((record) => ({
      airtableId : record.id,
      ...record.fields,}));
  } catch (error) {
    console.error(error);
  }
}

const addFavorites = async (carpark) => {
  try {
    const body = {
      fields: {
        address: carpark.address,
        car_park_no: carpark.car_park_no,
        antry_height: carpark.gantry_height,
        free_parking: carpark.free_parking,
      }
    };
    const response = await fetch(AIRTABLE_URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        method: "POST",
        body: JSON.stringify(body),
      }
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteFavorites = async (airtableId) => {
  try {const respond = await fetch(`${AIRTABLE_URL}/${airtableId}`, {
    method: "DELETE",
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  });
  return await respond.json();}
  catch (error) {
    console.error(error);
  }

}

export { getCarparkData, getCarparkAvailability,getFavorites, addFavorites, deleteFavorites };