import { currencyList } from '../../config/variables';
import listService from '../../services/listService';
import { message } from 'antd';


export class Dataimport {
    static  readCSVFileAndStoreInLocalStorage(filePath, localStorageName , isForceUpdate) {
        const jsonData = [];
        if (!isForceUpdate && localStorage.getItem(localStorageName)) {
          console.log('CSV data already exists in local storage. Ignoring storage operation.');
          return localStorage.getItem(localStorageName);
        }
      
        fetch(filePath)
          .then((response) => response.text())
          .then((csvData) => {
            const rows = csvData.split('\n');
                  // Parse the header row
            let headers1 = rows[0].split(',');
            if ( headers1.length <= 2 ) {
                headers1 = rows[0].split('\t');
            }
            const headers = headers1.map((element) => element.trim());

            //console.log('Into Header : ' , headers)

            // Ignore the header row (first row) when looping through rows
            let jsonRow = {"value": "ALL", "label" : "ALL"};
            jsonData.push(jsonRow);
            for (let i = 1; i < rows.length; i++) {
              const row = rows[i].trim();
              if (row === '') {
                continue;
              }
              
              let columns = row.split(',');
              if ( columns.length <= 2 ) {
                columns = row.split('\t');
            }
              // Convert the CSV row to JSON structure based on headers
              const jsonRow = Dataimport.copyCSVRowToJSON(columns, headers);
      
              jsonData.push(jsonRow);
            }
            // Process and store the CSV data as needed
            // For example, store it in local storage
            localStorage.setItem(localStorageName, JSON.stringify(jsonData));
            if (localStorageName === 'currency') {
              console.log('Localstorage stored item Currency List' ,currencyList() )
            }
            console.log('Localstorage stored item ' , JSON.parse(localStorage.getItem(localStorageName)))
            //console.log('CSV data stored in local storage:', jsonData);
            //console.log('CSV As Json String', JSON.stringify(jsonData))
          })
          .catch((error) => {
            console.error('Error reading CSV file:', error);
          });
          return jsonData
      }
      
      static copyCSVRowToJSON(csvRow, headers) {
        const jsonData = {};
      
        for (let i = 0; i < headers.length; i++) {
          const header1 = headers[i];
          if (csvRow[i] === undefined ) {
            continue
          }
          const header = header1.replace(/ /g, '_').toLowerCase();
          let value = csvRow[i].trim();
          
          switch (header) {
            case 'id':
              jsonData.id = value;
              break;
            case 'name':
                value = value.replace(/[^\w\s]/gi, '');

              jsonData.name = value;
              jsonData.value = value + ' '+ jsonData.country_name + "";
              jsonData.label = value + ' '+ jsonData.country_name +"";
              break;
            case 'country_id':
              jsonData.country_id = value;
              break;
            case 'country_code':
              jsonData.country_code = value;
              break;
            case 'country_name':
                value = value.replace(/[^\w\s]/gi, '');
              jsonData.country_name = value;
              jsonData.value = jsonData.name + ' '+ jsonData.country_name + "";
              jsonData.label = jsonData.name  + ' '+ jsonData.country_name +"";
              break;
            case 'state_code':
              jsonData.state_code = value;
              break;
            case 'type':
              jsonData.type = value;
              break;
            case 'latitude':
              jsonData.latitude = parseFloat(value);
              break;
            case 'longitude':
              jsonData.longitude = parseFloat(value);
              break;
            case 'language_name':
                value = value.replace(/[^\w\s]/gi, '');
              jsonData.language_name = value;
              jsonData.value = value;
              break;
            case 'native_name':
              jsonData.language_native_name = value;
              jsonData.label = value;
              break;
            case 'flag':
              jsonData.currency_flag = value;
              break;
            case 'country':
              jsonData.currency_country = value;
              break;
            case 'currency':
              jsonData.currency_name = value;
              break;
            case 'code_iso_4217':
              jsonData.currency_code = value;
              jsonData.value = value;
              jsonData.label = value + '('+((jsonData.currency_symbol === undefined ||jsonData.currency_symbol === null)  ? 'INR' : jsonData.currency_symbol) + ')' ;
              break;
            case 'symbol':
              jsonData.currency_symbol = value;
              jsonData.label = jsonData.value + '('+value + ')' ;
      
              break;
            case 'hex_symbol':
              jsonData.currency_hex_symbol = value;
              break;
            default:
              break;
          }
        }
      
        return jsonData;
      }

    //   static fetchDataAndImport = async () => {
    //     await Dataimport.fetchLocationsAndStore();
    //     await Dataimport.fetchLanguagesAndStore();
    //     await Dataimport.fetchCurrenciesAndStore();
    //     console.log('Data fetching and import completed.');
    //   };

    // static fetchDataAndImport = async () => {
    //     console.log('Into Fetch Data And Import')
    //     Dataimport.fetchLocationsAndStore();
    //     Dataimport.fetchLanguagesAndStore();
    //     Dataimport.fetchCurrenciesAndStore();
    //     Dataimport.fetchConfigs();

    //     console.log('fetchLocationsAndStore stored item ' , JSON.parse(localStorage.getItem('location')))
    //     console.log('fetchLanguagesAndStore stored item ' , JSON.parse(localStorage.getItem('language')))
    //     console.log('fetchCurrenciesAndStore stored item ' , JSON.parse(localStorage.getItem('currency')))


    // }

    static fetchDataAndImport =  () => {
      console.log('Into Fetch Data And Import')
      Dataimport.fetchCurrenciesAndStore();
      Dataimport.fetchLocationsAndStore();
      Dataimport.fetchLanguagesAndStore();
      Dataimport.fetchConfigs();

      console.log('fetchLocationsAndStore stored item ' , JSON.parse(localStorage.getItem('location')))
      console.log('fetchLanguagesAndStore stored item ' , JSON.parse(localStorage.getItem('language')))
      console.log('fetchCurrenciesAndStore stored item ' , JSON.parse(localStorage.getItem('currency')))


  }

    

    static fetchConfigs =  () =>  {
      console.log("Into Config Fetch to local storage")
        listService.fetchEventsList().then(res => {
            console.log("Config Fetch to local storage")
        console.log('Fetch Config 1233 ' , res)
        const platformTypes = res?.data?.message?.platformTypes
        const tags = res?.data?.message?.platformTags
        const paymentstages = res?.data?.message?.paymentStages
        let platformTypesList = []
        platformTypes.forEach( item => {
            platformTypesList.push({"value":item , "label":item})
        })
        let categories = []
        tags.forEach(item => {
            categories.push({"value":item , "label":item})
        })

        localStorage.setItem("platforms", JSON.stringify(platformTypesList));
        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("paymentstages", JSON.stringify(paymentstages));
        localStorage.setItem("dontConsiderTheseStages", JSON.stringify(res?.data?.message?.dontConsiderTheseStages));
        localStorage.setItem("stageDisplayMap", JSON.stringify(res?.data?.message?.stageDisplayMap))
        
        Object.entries(res?.data?.message).forEach(([key, value]) => {
            localStorage.setItem("LocalStorage_"+key, JSON.stringify(value));
          });

        })
        .catch((error) => {
          message.error(error.response)
          throw error.response
       })
        
    }
    
      // importData = async () => {
      //   const response = await fetch('./database.sqlite'); // Path to your SQLite database file
      //   const buffer = await response.arrayBuffer();
      //   const db = new SQL.Database(new Uint8Array(buffer));
      
      //   // Check if the locations table exists
      //   const locationsTableExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='locations'").length > 0;
      
      //   // Create locations table if it doesn't exist
      //   if (!locationsTableExists) {
      //     db.run(`CREATE TABLE locations (
      //       id INTEGER PRIMARY KEY,
      //       name TEXT,
      //       country_id INTEGER,
      //       country_code TEXT,
      //       country_name TEXT,
      //       state_code TEXT,
      //       type TEXT,
      //       latitude REAL,
      //       longitude REAL
      //     )`);
      
      //     // Store locations data in the table
      //     this.storeLocations(db);
      //   }
      
      //   // Check if the currencies table exists
      //   const currenciesTableExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='currencies'").length > 0;
      
      //   // Create currencies table if it doesn't exist
      //   if (!currenciesTableExists) {
      //     db.run(`CREATE TABLE currencies (
      //       id INTEGER PRIMARY KEY,
      //       flag TEXT,
      //       country TEXT,
      //       currency TEXT,
      //       code TEXT,
      //       symbol TEXT,
      //       hex_symbol TEXT
      //     )`);
      
      //     // Store currencies data in the table
      //     this.storeCurrencies(db);
      //   }
      
      //   // Check if the languages table exists
      //   const languagesTableExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='languages'").length > 0;
      
      //   // Create languages table if it doesn't exist
      //   if (!languagesTableExists) {
      //     db.run(`CREATE TABLE languages (
      //       id INTEGER PRIMARY KEY,
      //       iso_639_1 TEXT,
      //       iso_639_2t TEXT,
      //       iso_639_2b TEXT,
      //       name TEXT,
      //       native_name TEXT
      //     )`);
      
      //     // Store languages data in the table
      //     this.storeLanguages(db);
      //   }
      
      //   // Close the database connection
      //   db.close();
      
      //   console.log('Data import completed.');
      // };
    
    
    
      static fetchLocationsAndStore =  () =>  {
        console.log('Into Locations')
        const locations =Dataimport.readCSVFileAndStoreInLocalStorage('/Location.csv', 'location', 'false')
        Dataimport.storeLocations(locations);
        // const response = await fetch('/Location.csv'); // Path to the locations CSV file
        // const text = await response.text();
    
        // const locations = [];
        // csvParser({ headers: true })
        //   .fromString(text)
        //   .on('data', (row) => {
        //     const location = {
        //       id: row.id,
        //       name: row.name,
        //       country_id: row.country_id,
        //       country_code: row.country_code,
        //       country_name: row.country_name,
        //       state_code: row.state_code,
        //       type: row.type,
        //       latitude: row.latitude,
        //       longitude: row.longitude,
        //     };
        //     locations.push(location);
        //   })
        //   .on('end', () => {
        //     this.storeLocations(locations);
        //   });
      };
    
      static fetchCurrenciesAndStore =  () => {
        const locations = Dataimport.readCSVFileAndStoreInLocalStorage('/Currency.csv', 'currency', false)
        Dataimport.storeCurrencies(locations);
        // const response = await fetch('/Currency.csv'); // Path to the currencies CSV file
        // const text = await response.text();
    
        // const currencies = [];
        // csvParser({ headers: true })
        //   .fromString(text)
        //   .on('data', (row) => {
        //     const currency = {
        //       id: row.id,
        //       flag: row.flag,
        //       country: row.country,
        //       currency: row.currency,
        //       code: row.code,
        //       symbol: row.symbol,
        //       hex_symbol: row.hex_symbol,
        //     };
        //     currencies.push(currency);
        //   })
        //   .on('end', () => {
        //     this.storeCurrencies(currencies);
        //   });
      };
    
      static fetchLanguagesAndStore =  () => {
        const languages = Dataimport.readCSVFileAndStoreInLocalStorage('/Languages.csv', 'languages', false)
        Dataimport.storeCurrencies(languages);
    
        // const response = await fetch('/Languages.csv'); // Path to the languages CSV file
        // const text = await response.text();
    
        // const languages = [];
        // csvParser({ headers: true })
        //   .fromString(text)
        //   .on('data', (row) => {
        //     const language = {
        //       id: row.id,
        //       iso_639_1: row.iso_639_1,
        //       iso_639_2t: row.iso_639_2t,
        //       iso_639_2b: row.iso_639_2b,
        //       name: row.name,
        //       native_name: row.native_name,
        //     };
        //     languages.push(language);
        //   })
        //   .on('end', () => {
        //     this.storeLanguages(languages);
        //   });
      };
    
      static storeLocations = (locations) => {
        console.log(locations)
        // db.exec('BEGIN');
        // locations.forEach((location) => {
        //   // Check if the location already exists in the table
        //   const existingLocation = db.exec(`SELECT * FROM locations WHERE id=${location.id}`);
      
        //   if (existingLocation.length === 0) {
        //     db.run(
        //       'INSERT INTO locations (id, name, country_id, country_code, country_name, state_code, type, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        //       [
        //         location.id,
        //         location.name,
        //         location.country_id,
        //         location.country_code,
        //         location.country_name,
        //         location.state_code,
        //         location.type,
        //         location.latitude,
        //         location.longitude,
        //       ]
        //     );
        //   }
        // });
        // db.exec('COMMIT');
      };
      
      static storeCurrencies = (currencies) => {
        console.log(currencies)
        console.log(currencyList())
        // db.exec('BEGIN');
        // currencies.forEach((currency) => {
        //   // Check if the currency already exists in the table
        //   const existingCurrency = db.exec(`SELECT * FROM currencies WHERE id=${currency.id}`);
      
        //   if (existingCurrency.length === 0) {
        //     db.run(
        //       'INSERT INTO currencies (id, flag, country, currency, code, symbol, hex_symbol) VALUES (?, ?, ?, ?, ?, ?, ?)',
        //       [
        //         currency.id,
        //         currency.flag,
        //         currency.country,
        //         currency.currency,
        //         currency.code,
        //         currency.symbol,
        //         currency.hex_symbol,
        //       ]
        //     );
        //   }
        // });
        // db.exec('COMMIT');
      };
      
      static storeLanguages = (languages) => {
        console.log(languages)
        // db.exec('BEGIN');
        // languages.forEach((language) => {
        //   // Check if the language already exists in the table
        //   const existingLanguage = db.exec(`SELECT * FROM languages WHERE id=${language.id}`);
      
        //   if (existingLanguage.length === 0) {
        //     db.run(
        //       'INSERT INTO languages (id, iso_639_1, iso_639_2t, iso_639_2b, name, native_name) VALUES (?, ?, ?, ?, ?, ?)',
        //       [
        //         language.id,
        //         language.iso_639_1,
        //         language.iso_639_2t,
        //         language.iso_639_2b,
        //         language.name,
        //         language.native_name,
        //       ]
        //     );
        //   }
        // });
        // db.exec('COMMIT');
      };
      
}