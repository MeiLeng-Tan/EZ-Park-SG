const API_KEY = 'v2:c18e92ffdbf73daa34791f238e88238435f8b27a9e915b8bd58df03a0029a2fb:2PEISlu75MBbXAa-XnqRuSXstDY4oNNg'
const CP_AVAIL_URL = "https://api.data.gov.sg/v1/transport/carpark-availability"; 
const CP_DATA_URL = "https://data.gov.sg/api/action/datastore_search"//?resource_id=d_23f946fa557947f93a8043bbef41dd09&limit=2500";
const CP_DATA_RESOURCE_ID = "d_23f946fa557947f93a8043bbef41dd09"

const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID="appp4vOAyvwG6nToW"
const AIRTABLE_TABLE_NAME = "Favorites";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

const getCarparkData = async (filters) => {
  try {
    const row_filters = {
      address: filters.address || " ",      
    };

    const dataFilters = {};
    for (const [key, value] of Object.entries(row_filters)) {
      dataFilters[key] = {
        type: key === 'address' ? "ILIKE" : "EQ",
        value: value
      };
    }
    const urlParams = new URLSearchParams({
      resource_id: CP_DATA_RESOURCE_ID,
      filters: JSON.stringify(dataFilters),
      limit: 2500,
    })

    const response = await fetch(`${CP_DATA_URL}?${urlParams.toString()}`, {
      headers: {'X-API-Key': API_KEY}
    });
    if (!response.ok) {
      throw new Error('Failed to fetch carpark data. ')
    }
    const result = await response.json();
    const data = result.result.records;
    return data;
  } catch (error) {
    console.error("Error in fetching carpark data: ",  error);
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

    return data;
  } catch (error) {
    console.error("Error in fetching carpark live availability data: ",  error);
  }
};

const getFavorites = async () => {
  try {
    const response = await fetch(AIRTABLE_URL, {
      headers: {
        "Authorization": "Bearer " + AIRTABLE_TOKEN,
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
    console.error("Error in fetching favorites carpark data: ", error);
    return [];
  }
}

const addFavorites = async (carpark) => {
  try {
    const body = {
      fields: {
        address: carpark.address,
        carpark_no: carpark.carpark_no,
        gantry_height: carpark.gantry_height,
        free_parking: carpark.free_parking,
      }
    };
    const response = await fetch(AIRTABLE_URL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + AIRTABLE_TOKEN,
        "Content-Type": "application/json",
        },
      body: JSON.stringify(body),
      
    });
    return await response.json();
  } catch (error) {
    console.error("Error in writing favorites carpark data: ", error);
  }
};

const deleteFavorites = async (airtableId) => {
  try {
      const respondDelete = await fetch(`${AIRTABLE_URL}/${airtableId}`, {
        method: "DELETE",
      headers: {
      "Authorization": "Bearer " + AIRTABLE_TOKEN
      }
    });
    
 } catch (error) {
    console.error("Error in modifying favorites carpark data: ", error);
  }

}

export { getCarparkData, getCarparkAvailability,getFavorites, addFavorites, deleteFavorites };