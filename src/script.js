const express = require("express");
const mysql = require("mysql");
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'src/pages')));

// Set the view engine to Pug
app.set('view engine', 'pug');

// Set the directory for the views
app.set('views', path.join(__dirname, 'src/pages'));

// Define routes
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' }); // Renders views/index.pug
});

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home' }); // Renders views/index.pug
});

app.get('/about_us', (req, res) => {
    res.render('about_us', { title: 'About Us' }); // Renders views/index.pug
});

app.get('/facts_city', (req, res) => {
    res.render('facts_city', { title: 'City Facts' }); // Renders views/index.pug
});

app.get('/facts_continent', (req, res) => {
    res.render('facts_continent', { title: 'Continent Facts' }); // Renders views/index.pug
});

app.get('/facts_country', (req, res) => {
    res.render('facts_country', { title: 'Country Facts' }); // Renders views/index.pug
});

app.get('/facts_world', (req, res) => {
    res.render('facts_world', { title: 'World Facts' }); // Renders views/index.pug
});

app.get('/sign_up', (req, res) => {
    res.render('sign_up', { title: 'Sign Up' }); // Renders views/index.pug
});

app.get('/report_generation1', (req, res) => {
    res.render('report_generation1', { title: 'Reports' }); // Renders views/index.pug
});



var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database:'world'
    }
);
connection.connect(function(error)
{
    if(!!error){
        console.log('Error');
    }
    else{
        console.log('Connected')
    }

});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.get('/',function(req,resp){
    connection.query("SELECT * FROM city WHERE CountryCode like 'AFG' " , function (error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        }else{
            console.log('successful \n '+ rows[0].Name)
            
        }
    });

})
app.get('/CountriesByPopulationDescending', function(req, resp) {
    connection.query("SELECT * FROM country ORDER BY Population DESC", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            // You can send the data back as a response or process it further here
            resp.json(rows); // Send the result back as JSON response
        }
    });
});

  
  // Route handler to handle GET requests to /continent/:continent
  app.get('/continent/:continent', function(req, resp) {
      var continent = req.params.continent;
      connection.query("SELECT * FROM country WHERE Continent = ? ORDER BY Population DESC", continent, function(error, rows, fields) {
          if (error) {
              console.log('Error in the query:', error);
              resp.status(500).send('Error retrieving data from the database');
          } else {
              console.log('Successful');
              console.log(rows); // Output the result to console for testing purposes
              resp.json(rows); // Send the result back as JSON response
          }
      });
  });
app.get('/region/:region', function(req, resp) {
    var region = req.params.region;
    connection.query("SELECT * FROM country WHERE Region = ? ORDER BY Population DESC", region, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcountries/:limit', function(req, resp) {
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM country ORDER BY Population DESC LIMIT ?", limit, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcountries/:continent/:limit', function(req, resp) {
    var continent = req.params.continent;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM country WHERE Continent = ? ORDER BY Population DESC LIMIT ?", [continent, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcountriesinregion/:region/:limit', function(req, resp) {
    var region = req.params.region;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM country WHERE Region = ? ORDER BY Population DESC LIMIT ?", [region, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/allcities', function(req, resp) {
    connection.query("SELECT * FROM city ORDER BY Population DESC", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/cities/continent/:continent', function(req, resp) {
    var continent = req.params.continent;
    connection.query("SELECT * FROM city INNER JOIN country ON city.CountryCode = country.Code WHERE country.Continent = ? ORDER BY city.Population DESC", continent, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/cities/region/:region', function(req, resp) {
    var region = req.params.region;
    connection.query("SELECT * FROM city INNER JOIN country ON city.CountryCode = country.Code WHERE country.Region = ? ORDER BY city.Population DESC", region, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/cities/country/:countryCode', function(req, resp) {
    var countryCode = req.params.countryCode;
    connection.query("SELECT * FROM city WHERE CountryCode = ? ORDER BY Population DESC", countryCode, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/cities/district/:district', function(req, resp) {
    var district = req.params.district;
    connection.query("SELECT * FROM city WHERE District = ? ORDER BY Population DESC", district, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcities/world/:limit', function(req, resp) {
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city ORDER BY Population DESC LIMIT ?", limit, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcities/continent/:continent/:limit', function(req, resp) {
    var continent = req.params.continent;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city INNER JOIN country ON city.CountryCode = country.Code WHERE country.Continent = ? ORDER BY city.Population DESC LIMIT ?", [continent, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcities/region/:region/:limit', function(req, resp) {
    var region = req.params.region;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city INNER JOIN country ON city.CountryCode = country.Code WHERE country.Region = ? ORDER BY city.Population DESC LIMIT ?", [region, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcities/country/:countryCode/:limit', function(req, resp) {
    var countryCode = req.params.countryCode;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city WHERE CountryCode = ? ORDER BY Population DESC LIMIT ?", [countryCode, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcities/district/:district/:limit', function(req, resp) {
    var district = req.params.district;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city WHERE District = ? ORDER BY Population DESC LIMIT ?", [district, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/capitalcities/world', function(req, resp) {
    connection.query("SELECT * FROM city WHERE ID IN (SELECT Capital FROM country) ORDER BY Population DESC", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/capitalcities/continent/:continent', function(req, resp) {
    var continent = req.params.continent;
    connection.query("SELECT * FROM city WHERE ID IN (SELECT Capital FROM country WHERE Continent = ?) ORDER BY Population DESC", continent, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/capitalcities/region/:region', function(req, resp) {
    var region = req.params.region;
    connection.query("SELECT * FROM city WHERE ID IN (SELECT Capital FROM country WHERE Region = ?) ORDER BY Population DESC", region, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcapitalcities/world/:limit', function(req, resp) {
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city WHERE ID IN (SELECT Capital FROM country) ORDER BY Population DESC LIMIT ?", limit, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcapitalcities/continent/:continent/:limit', function(req, resp) {
    var continent = req.params.continent;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city WHERE ID IN (SELECT Capital FROM country WHERE Continent = ?) ORDER BY Population DESC LIMIT ?", [continent, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/topcapitalcities/region/:region/:limit', function(req, resp) {
    var region = req.params.region;
    var limit = parseInt(req.params.limit);
    connection.query("SELECT * FROM city WHERE ID IN (SELECT Capital FROM country WHERE Region = ?) ORDER BY Population DESC LIMIT ?", [region, limit], function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/population/continent', function(req, resp) {
    connection.query("SELECT Continent, SUM(Population) AS TotalPopulation, SUM(IF(CityCode IS NOT NULL, Population, 0)) AS PopulationInCities, SUM(IF(CityCode IS NULL, Population, 0)) AS PopulationNotInCities FROM country LEFT JOIN city ON country.Capital = city.ID GROUP BY Continent", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/population/region', function(req, resp) {
    connection.query("SELECT Region, SUM(Population) AS TotalPopulation, SUM(IF(CityCode IS NOT NULL, Population, 0)) AS PopulationInCities, SUM(IF(CityCode IS NULL, Population, 0)) AS PopulationNotInCities FROM country LEFT JOIN city ON country.Capital = city.ID GROUP BY Region", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/population/country', function(req, resp) {
    connection.query("SELECT Name AS Country, Population AS TotalPopulation, (SELECT SUM(Population) FROM city WHERE CountryCode = country.Code) AS PopulationInCities, (Population - (SELECT SUM(Population) FROM city WHERE CountryCode = country.Code)) AS PopulationNotInCities FROM country", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            console.log(rows); // Output the result to console for testing purposes
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/population/world', function(req, resp) {
    connection.query("SELECT SUM(Population) AS WorldPopulation FROM country", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows[0]); // Send the result back as JSON response
        }
    });
});
app.get('/population/continent/:continent', function(req, resp) {
    var continent = req.params.continent;
    connection.query("SELECT SUM(Population) AS ContinentPopulation FROM country WHERE Continent = ?", continent, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows[0]); // Send the result back as JSON response
        }
    });
});
app.get('/population/region/:region', function(req, resp) {
    var region = req.params.region;
    connection.query("SELECT SUM(Population) AS RegionPopulation FROM country WHERE Region = ?", region, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows[0]); // Send the result back as JSON response
        }
    });
});
app.get('/population/country/:countryCode', function(req, resp) {
    var countryCode = req.params.countryCode;
    connection.query("SELECT Population FROM country WHERE Code = ?", countryCode, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows[0]); // Send the result back as JSON response
        }
    });
});
app.get('/population/district/:district', function(req, resp) {
    var district = req.params.district;
    connection.query("SELECT SUM(Population) AS DistrictPopulation FROM city WHERE District = ?", district, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows[0]); // Send the result back as JSON response
        }
    });
});
app.get('/population/city/:city', function(req, resp) {
    var city = req.params.city;
    connection.query("SELECT Population FROM city WHERE Name = ?", city, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows[0]); // Send the result back as JSON response
        }
    });
});
app.get('/language/speakers', function(req, resp) {
    connection.query("SELECT Language, SUM(Population) AS TotalSpeakers, (SUM(Population) / (SELECT SUM(Population) FROM country)) * 100 AS PercentageOfWorldPopulation FROM language_speakers GROUP BY Language ORDER BY TotalSpeakers DESC", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows); // Send the result back as JSON response
        }
    });
});
app.get('/country/report', function(req, resp) {
    connection.query("SELECT Code, Name, Continent, Region, Population, Capital FROM country", function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
        } else {
            console.log('Successful');
            resp.json(rows); // Send the result back as JSON response
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});