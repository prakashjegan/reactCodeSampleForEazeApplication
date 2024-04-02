
import React from 'react';
import {Dataimport} from './dataimports';

class SQLiteDataImport extends React.Component {
  componentDidMount() {
    //this.importData();
    this.fetchDataAndImport();
  }

  fetchDataAndImport = async () => {
    await this.fetchLocationsAndStore();
    await this.fetchLanguagesAndStore();
    await this.fetchCurrenciesAndStore();
    console.log('Data fetching and import completed.');
  };

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



  fetchLocationsAndStore = async () => {
    console.log('Into Locations')
    const locations =Dataimport.readCSVFileAndStoreInLocalStorage('/Location.csv', 'location', 'false')
    this.storeLocations(locations);
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

  fetchCurrenciesAndStore = async () => {
    const locations = Dataimport.readCSVFileAndStoreInLocalStorage('/Currency.csv', 'currency', false)
    this.storeCurrencies(locations);
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

  fetchLanguagesAndStore = async () => {
    const languages = Dataimport.readCSVFileAndStoreInLocalStorage('/Languages.csv', 'languages', false)
    this.storeCurrencies(languages);

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

  storeLocations = (locations) => {
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
  
  storeCurrencies = (currencies) => {
    console.log(currencies)
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
  
  storeLanguages = (languages) => {
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

  render() {
    return <div></div>;
  }
}

export default SQLiteDataImport;


//export default readCSVFileAndStoreInLocalStorage;



// class SQLiteDataImport extends React.Component {
//   componentDidMount() {
//     this.importData();
//     this.fetchDataAndImport();
//   }

//   fetchDataAndImport = async () => {
//     await this.fetchLocationsAndStore();
//     await this.fetchLanguagesAndStore();
//     await this.fetchCurrenciesAndStore();
//     console.log('Data fetching and import completed.');
//   };

//   importData = async () => {
//     const response = await fetch('./database.sqlite'); // Path to your SQLite database file
//     const buffer = await response.arrayBuffer();
//     const db = new SQL.Database(new Uint8Array(buffer));
  
//     // Check if the locations table exists
//     const locationsTableExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='locations'").length > 0;
  
//     // Create locations table if it doesn't exist
//     if (!locationsTableExists) {
//       db.run(`CREATE TABLE locations (
//         id INTEGER PRIMARY KEY,
//         name TEXT,
//         country_id INTEGER,
//         country_code TEXT,
//         country_name TEXT,
//         state_code TEXT,
//         type TEXT,
//         latitude REAL,
//         longitude REAL
//       )`);
  
//       // Store locations data in the table
//       this.storeLocations(db);
//     }
  
//     // Check if the currencies table exists
//     const currenciesTableExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='currencies'").length > 0;
  
//     // Create currencies table if it doesn't exist
//     if (!currenciesTableExists) {
//       db.run(`CREATE TABLE currencies (
//         id INTEGER PRIMARY KEY,
//         flag TEXT,
//         country TEXT,
//         currency TEXT,
//         code TEXT,
//         symbol TEXT,
//         hex_symbol TEXT
//       )`);
  
//       // Store currencies data in the table
//       this.storeCurrencies(db);
//     }
  
//     // Check if the languages table exists
//     const languagesTableExists = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='languages'").length > 0;
  
//     // Create languages table if it doesn't exist
//     if (!languagesTableExists) {
//       db.run(`CREATE TABLE languages (
//         id INTEGER PRIMARY KEY,
//         iso_639_1 TEXT,
//         iso_639_2t TEXT,
//         iso_639_2b TEXT,
//         name TEXT,
//         native_name TEXT
//       )`);
  
//       // Store languages data in the table
//       this.storeLanguages(db);
//     }
  
//     // Close the database connection
//     db.close();
  
//     console.log('Data import completed.');
//   };
//   fetchLocationsAndStore = async (db) => {
//     const response = await fetch('/Location.csv'); // Path to the locations CSV file
//     const text = await response.text();

//     const locations = [];
//     csvParser({ headers: true })
//       .fromString(text)
//       .on('data', (row) => {
//         const location = {
//           id: row.id,
//           name: row.name,
//           country_id: row.country_id,
//           country_code: row.country_code,
//           country_name: row.country_name,
//           state_code: row.state_code,
//           type: row.type,
//           latitude: row.latitude,
//           longitude: row.longitude,
//         };
//         locations.push(location);
//       })
//       .on('end', () => {
//         this.storeLocations(db, locations);
//       });
//   };

//   fetchCurrenciesAndStore = async (db) => {
//     const response = await fetch('/Currency.csv'); // Path to the currencies CSV file
//     const text = await response.text();

//     const currencies = [];
//     csvParser({ headers: true })
//       .fromString(text)
//       .on('data', (row) => {
//         const currency = {
//           id: row.id,
//           flag: row.flag,
//           country: row.country,
//           currency: row.currency,
//           code: row.code,
//           symbol: row.symbol,
//           hex_symbol: row.hex_symbol,
//         };
//         currencies.push(currency);
//       })
//       .on('end', () => {
//         this.storeCurrencies(db, currencies);
//       });
//   };

//   fetchLanguagesAndStore = async (db) => {
//     const response = await fetch('/Languages.csv'); // Path to the languages CSV file
//     const text = await response.text();

//     const languages = [];
//     csvParser({ headers: true })
//       .fromString(text)
//       .on('data', (row) => {
//         const language = {
//           id: row.id,
//           iso_639_1: row.iso_639_1,
//           iso_639_2t: row.iso_639_2t,
//           iso_639_2b: row.iso_639_2b,
//           name: row.name,
//           native_name: row.native_name,
//         };
//         languages.push(language);
//       })
//       .on('end', () => {
//         this.storeLanguages(db, languages);
//       });
//   };

//   storeLocations = (db , locations) => {
//     console.log(locations)
//     db.exec('BEGIN');
//     locations.forEach((location) => {
//       // Check if the location already exists in the table
//       const existingLocation = db.exec(`SELECT * FROM locations WHERE id=${location.id}`);
  
//       if (existingLocation.length === 0) {
//         db.run(
//           'INSERT INTO locations (id, name, country_id, country_code, country_name, state_code, type, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//           [
//             location.id,
//             location.name,
//             location.country_id,
//             location.country_code,
//             location.country_name,
//             location.state_code,
//             location.type,
//             location.latitude,
//             location.longitude,
//           ]
//         );
//       }
//     });
//     db.exec('COMMIT');
//   };
  
//   storeCurrencies = (db, currencies) => {
  
//     db.exec('BEGIN');
//     currencies.forEach((currency) => {
//       // Check if the currency already exists in the table
//       const existingCurrency = db.exec(`SELECT * FROM currencies WHERE id=${currency.id}`);
  
//       if (existingCurrency.length === 0) {
//         db.run(
//           'INSERT INTO currencies (id, flag, country, currency, code, symbol, hex_symbol) VALUES (?, ?, ?, ?, ?, ?, ?)',
//           [
//             currency.id,
//             currency.flag,
//             currency.country,
//             currency.currency,
//             currency.code,
//             currency.symbol,
//             currency.hex_symbol,
//           ]
//         );
//       }
//     });
//     db.exec('COMMIT');
//   };
  
//   storeLanguages = (db , languages) => {
  
//     db.exec('BEGIN');
//     languages.forEach((language) => {
//       // Check if the language already exists in the table
//       const existingLanguage = db.exec(`SELECT * FROM languages WHERE id=${language.id}`);
  
//       if (existingLanguage.length === 0) {
//         db.run(
//           'INSERT INTO languages (id, iso_639_1, iso_639_2t, iso_639_2b, name, native_name) VALUES (?, ?, ?, ?, ?, ?)',
//           [
//             language.id,
//             language.iso_639_1,
//             language.iso_639_2t,
//             language.iso_639_2b,
//             language.name,
//             language.native_name,
//           ]
//         );
//       }
//     });
//     db.exec('COMMIT');
//   };

//   render() {
//     return <div></div>;
//   }
// }

// export default SQLiteDataImport;