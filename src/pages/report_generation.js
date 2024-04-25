
// Function to fetch countries by population in descending order for the entire world
function fetchCountriesByPopulationDescending_World() {
    
    // Clear the table container
    document.getElementById("tableContainer").innerHTML = "";
    
    // Get the population count from the input field
    var count_world = document.getElementById("count_world").value;
  
    // Fetch data from the server
    fetch('http://localhost:1337/topcountries/'+ count_world)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Output the data to console for testing purposes
  
        // Create HTML table structure
        var table = "<table>";
        table += "<tr><th>Code</th><th>Name</th><th>Continent</th><th>Region</th><th>Surface Area</th><th>Indep Year</th><th>Population</th><th>Life Expectancy</th><th>GNP</th><th>GNP Old</th><th>Local Name</th><th>Government Form</th><th>Head of State</th><th>Capital</th><th>Code2</th></tr>";
  
        // Populate table rows with data
        data.forEach(function(country) {
          table += "<tr>";
          table += "<td>" + country.Code + "</td>";
          table += "<td>" + country.Name + "</td>";
          table += "<td>" + country.Continent + "</td>";
          table += "<td>" + country.Region + "</td>";
          table += "<td>" + country.SurfaceArea + "</td>";
          table += "<td>" + country.IndepYear + "</td>";
          table += "<td>" + country.Population + "</td>";
          table += "<td>" + country.LifeExpectancy + "</td>";
          table += "<td>" + country.GNP + "</td>";
          table += "<td>" + country.GNPOld + "</td>";
          table += "<td>" + country.LocalName + "</td>";
          table += "<td>" + country.GovernmentForm + "</td>";
          table += "<td>" + country.HeadOfState + "</td>";
          table += "<td>" + country.Capital + "</td>";
          table += "<td>" + country.Code2 + "</td>";
          table += "</tr>";
        });
  
        table += "</table>";
  
        // Insert the table into the div with id "tableContainer"
        document.getElementById("tableContainer").innerHTML = table;
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Function to fetch countries by population in descending order for a specific continent
  function fetchCountriesByPopulationDescending_Continent() {
    document.getElementById("tableContainer").innerHTML = "";
    var count_Continent = document.getElementById("count_Continent").value;
    var ContinentName = document.getElementById("ContinentName").value;
  
    fetch('http://localhost:1337/topcountries/'+ContinentName+'/'+count_Continent)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Output the data to console for testing purposes
        // Create HTML table
        var table = "<table>";
        table += "<tr><th>Code</th><th>Name</th><th>Continent</th><th>Region</th><th>Surface Area</th><th>Indep Year</th><th>Population</th><th>Life Expectancy</th><th>GNP</th><th>GNP Old</th><th>Local Name</th><th>Government Form</th><th>Head of State</th><th>Capital</th><th>Code2</th></tr>";
  
        // Populate table rows with data
        data.forEach(function(country) {
          table += "<tr>";
          table += "<td>" + country.Code + "</td>";
          table += "<td>" + country.Name + "</td>";
          table += "<td>" + country.Continent + "</td>";
          table += "<td>" + country.Region + "</td>";
          table += "<td>" + country.SurfaceArea + "</td>";
          table += "<td>" + country.IndepYear + "</td>";
          table += "<td>" + country.Population + "</td>";
          table += "<td>" + country.LifeExpectancy + "</td>";
          table += "<td>" + country.GNP + "</td>";
          table += "<td>" + country.GNPOld + "</td>";
          table += "<td>" + country.LocalName + "</td>";
          table += "<td>" + country.GovernmentForm + "</td>";
          table += "<td>" + country.HeadOfState + "</td>";
          table += "<td>" + country.Capital + "</td>";
          table += "<td>" + country.Code2 + "</td>";
          table += "</tr>";
        });
  
        table += "</table>";
  
        // Insert table into div with id "tableContainer"
        document.getElementById("tableContainer").innerHTML = table;
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Function to fetch countries by population in descending order for a specific region
  function fetchCountriesByPopulationDescending_Region() {
    document.getElementById("tableContainer").innerHTML = "";
    var count_Region = document.getElementById("count_Region").value;
    var RegionName = document.getElementById("RegionName").value;
  
    fetch('http://localhost:1337/topcountriesinregion/'+RegionName+'/'+count_Region)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Output the data to console for testing purposes
        // Create HTML table
        var table = "<table>";
        table += "<tr><th>Code</th><th>Name</th><th>Continent</th><th>Region</th><th>Surface Area</th><th>Indep Year</th><th>Population</th><th>Life Expectancy</th><th>GNP</th><th>GNP Old</th><th>Local Name</th><th>Government Form</th><th>Head of State</th><th>Capital</th><th>Code2</th></tr>";
  
        // Populate table rows with data
        data.forEach(function(country) {
          table += "<tr>";
          table += "<td>" + country.Code + "</td>";
          table += "<td>" + country.Name + "</td>";
          table += "<td>" + country.Continent + "</td>";
          table += "<td>" + country.Region + "</td>";
          table += "<td>" + country.SurfaceArea + "</td>";
          table += "<td>" + country.IndepYear + "</td>";
          table += "<td>" + country.Population + "</td>";
          table += "<td>" + country.LifeExpectancy + "</td>";
          table += "<td>" + country.GNP + "</td>";
          table += "<td>" + country.GNPOld + "</td>";
          table += "<td>" + country.LocalName + "</td>";
          table += "<td>" + country.GovernmentForm + "</td>";
          table += "<td>" + country.HeadOfState + "</td>";
          table += "<td>" + country.Capital + "</td>";
          table += "<td>" + country.Code2 + "</td>";
          table += "</tr>";
        });
  
        table += "</table>";
  
        // Insert table into div with id "tableContainer"
        document.getElementById("tableContainer").innerHTML = table;
      })
      .catch(error => console.error('Error:', error));
  }
  