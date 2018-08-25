const axios = require('axios');

function getPersonData(personId) {
  return axios.get(`https://swapi.co/api/people/${personId}`)
    .then((response) => {
      const person = response.data;

      const personBasic = {
        name: person.name,
        height: person.height,
        gender: person.gender,
        skinColor: person.skin_color,
        eyeColor: person.eye_color,
        hairColor: person.hair_color,
      };

      return personBasic;
    })
    .catch((error) => {
      console.error(error.response.status, error.response.statusText);
    });
}


const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
Promise.all(ids.map(id => getPersonData(id)))
  .then((dataArr) => {
    console.log(dataArr);
    // log new array of just the names
    const allNames = dataArr.map(e => e.name);
    console.log(allNames);
    // log a new array, that has all names that include 'b' or 'B' filtered out
    const noBsAllowed = dataArr.filter((person) => {
      if (person.name.toLowerCase().includes('b')) {
        return false;
      }
      return true;
    });
    const noBNames = noBsAllowed.map(e => e.name);
    console.log(noBNames);
    // log new arr with all the heights less than 180 filtered
    const tallPeople = dataArr.filter((person) => {
      if (person.height > 180) return true;
      return false;
    });
    console.log(tallPeople);
    // log a new arr, with all items (sorted by name), in alphabetical order
    const alphabetizedNames = dataArr.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    console.log(alphabetizedNames);


    // log a new arr, with all items (sorted by height) from Least to greatest
    const shortToTall = dataArr.sort((a, b) => a.height - b.height);
    console.log(shortToTall);

    // log a statistical object wit the following keys and values. DO not include duplicates
    /**
         * {
         * count: total count of the data arr
         * names: [all names from the data arr]
         * eyeColors [],
         * hairColors: []
         }
     */

    const allEyes = dataArr.map(e => e.eyeColor);
    const eyePossible = allEyes.reduce((a, b) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);
    const allHair = dataArr.map(e => e.hairColor);
    const hairPossible = allHair.reduce((a, b) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);

    const statObj = {
      count: dataArr.length,
      names: dataArr.map(e => e.name),
      eyeColors: eyePossible,
      hairColors: hairPossible,
    };
    console.log(statObj);
  });

// getPersonData(74)
//   .then((data) => {
//     console.log(data)
//   })
