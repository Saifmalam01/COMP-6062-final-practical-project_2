const app = Vue.createApp({
    data() {
      return {
        // Profile Data
        firstname: '',
        lastname: '',
        age: 0,
        picture: '',
        priceperitem: 10,
  
        // Weather Data
        city: 'London',
        province: 'Ontario',
        country: 'Canada',
        weather: {
          temperature: '',
          wind_speed: '',
          weather_description: '',
          location: {
            city: '',
            region: '',
            country: '',
          }
        },
  
        // Dictionary Data
        word: '',
        dictionary: {
          word: '',
          phonetic: '',
          definition: '',
        }
      };
    },
  
    methods: {
      // Profile Fetch
      fetchprofile() {
        fetch('http://comp6062.liamstewart.ca/random-user-profile')
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              console.log('An error occurred. Please try again.');
            }
          })
          .then(data => {
            if (data) {
              this.firstname = data.first_name;
              this.lastname = data.last_name;
              this.age = data.age;
              this.picture = data.profile_picture;
            }
          })
          .catch(error => {
            console.log('Total Failure');
          });
      },
  
      // Weather Fetch
      fetchWeather() {
        if (!this.city || !this.province || !this.country) return;
  
        const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.weather = data;
          })
          .catch(error => {
            console.error("Weather fetch failed:", error);
          });
      },
  
      // Dictionary Fetch
      fetchword() {
        if (!this.word) return;
  
        const url = `https://comp6062.liamstewart.ca/define?word=${this.word}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              this.dictionary = data[0];
            }
          })
          .catch(error => {
            console.error("Definition fetch failed:", error);
          });
      }
    },
  
    created() {
      this.fetchprofile();
      this.fetchWeather();
      this.fetchword(); 
    }
  }).mount("#app");
  