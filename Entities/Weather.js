const axios = require('axios');
const config = require('../config.json');
const DateTools = require('./DateTools');
const { key, cities } = config.weather;

class Weather {
    constructor(body) {
        this.body = body;
        this.day = '';
        this.city = '';
    }

    parseBody() {
        let body = this.body.split(' ');
        this.day = body[body.length - 3];
        this.city = body[body.length - 1];
        for (let i = 0; i < cities.length; i++) {
            if (this.city.includes(cities[i])) this.city = cities[i];
        }
    }    

    async fetchRequest() {
        try {
            const response = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?city=${this.city}&key=${key}`);
            return response;
        } catch(err) {
            console.error(err);            
            return 'Error: problems with service weather connect';
        }
    }

    async getResult() {
        try {
            this.parseBody();
            const userDate = DateTools.validDate(DateTools.getDate()[this.day]);
            const response = await this.fetchRequest();
            const data = response.data.data;
            const day = data.find(day => { return day.valid_date === userDate });
            if (day) return `The weather in ${this.city} at ${this.day}: ${day.temp} C, ${day.weather.description}`;
            else return 'No info';
        } catch(err) {
            console.error(err);            
            return 'Error: problems with service data response';
        }
    }
}

module.exports = Weather;