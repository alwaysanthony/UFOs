// from data.js
const tableData = data;


var tbody = d3.select("tbody");

function buildTable(data) {
 
  tbody.html("");

 
  data.forEach((dataRow) => {
   
    let row = tbody.append("tr");


    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters. 
function updatedFilters() {

    // 4a. Save the element that was changed as a variable.
    let changeElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementvalue = changeElement.property("value");
    console.log(elementvalue)
    // 4c. Save the id of the filter that was changed as a variable.
    let Filterid = changeElement.attr("id")
    console.log(Filterid)
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementvalue){
      filters[Filterid] = elementvalue;
    }
    else {
      delete filters[Filterid]
    }
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let updatedFilters = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.keys(filters).forEach((key) => {
      let userInput = d3.select("#"+key).property("value");
      if (userInput){
      updatedFilters = updatedFilters.filter(row => row[key] === userInput)};

    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(updatedFilters)
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updatedFilters);
  
  // Build the table when the page loads
  buildTable(tableData);