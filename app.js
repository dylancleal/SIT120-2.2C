const app = Vue.createApp({
    data() {
        return {
            apiKey: '23b210d0dadc6494c7f332ea5d0aecc2',
            city: '',
            weather: null,
        };
    },
    methods: {
        async fetchWeather() {
            if (this.city) {
                try {
                    const response = await fetch(`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${this.city}`);
                    const data = await response.json();

                    if (data.current) {
                        this.weather = {
                            city: data.location.name,
                            temperature: data.current.temperature,
                            description: data.current.weather_descriptions[0],
                            humidity: data.current.humidity,
                            wind: data.current.wind_speed,
                        };
                    } else {
                        console.error("Invalid response from the API.");
                        this.weather = null;
                    }
                } catch (error) {
                    console.error(error);
                    this.weather = null;
                }
            } else {
                this.weather = null;
            }
        },
    },
});
app.mount('#app');
