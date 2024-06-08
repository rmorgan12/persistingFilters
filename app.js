// DDX Bricks Wiki - See https://developer.domo.com/docs/ddx-bricks
// for tips on getting started, linking to Domo data and debugging your app
 
//Step 1. Select your data from the link in the bottom left corner
 

//Step 2. Style your chart using the following properties 
//--------------------------------------------------
// Properties
//--------------------------------------------------
let pageID = "/page/1124167137" // "/kpis/details/318508123" // The page you want to navigate to
let maxUrlLength = 1200 // max filter stringify length so that the browser doesn't truncate pfilter
let NewTab = true // Open page in new tab


let filters = []
domo.onFiltersUpdate(f => filters = f)
domo.onFiltersUpdate(f => console.log('Filters', f))
domo.onFiltersUpdate(f => disableButton())


// Build pfitler URL and naviteage
// domo.onFilterUpdate
function getFiltersAndNavigate() {
  URL = pageID+'?pfilters=' + JSON.stringify(getFilteredColumns(filters)) + ''
  console.log(URL)
  domo.navigate(URL, NewTab)
}

function getFilteredColumns(f) {
  return f.map(function (filter) {
    return {
      column: filter.column,
      operand: filter.operand,
      values: filter.values
    };
  });
}

// Conditionally disable button if URL length exceeds set browser limit
function disableButton() {
  if (JSON.stringify(filters).length > maxUrlLength) {
    document.getElementById("goButton").disabled = true;
    document.getElementById("goButton").innerHTML = "Select Fewer Filters";
  }
  else {
    document.getElementById("goButton").disabled = false;
    document.getElementById("goButton").innerHTML = "Navigate With Filters";
    
  }
}
