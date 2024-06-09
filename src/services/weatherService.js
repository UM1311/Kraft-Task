import { DateTime } from "luxon"

const API_KEY = "152bd3eb17d7c911b81c2eba8b2db3ad"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
 
const getWeatherData = (infoType , searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams,appid: API_KEY})
    return fetch(url).then((res)=>res.json())
}
const iconURLFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
const formatToLocalTime = (secs,offset,format = "cccc,dd LLL yyyy' | Local time:'hh:mm a")=> DateTime.fromSeconds(secs + offset, {zone:'UTC'}).toFormat(format)

const formatCurrent = (data)=>{
    const {
        coord: {lat,lon},
        main: {temp,feels_like,humidity},
        name, dt , sys :{country},weather, wind:{speed},timezone,
    } = data
    const {main: details,icon}=weather[0]
    const formattedLocalTime= formatToLocalTime(dt,timezone)
    return{temp,feels_like,humidity,name,country,dt,timezone,lat,lon,details,speed,icon:iconURLFromCode(icon),formattedLocalTime,}

}
const getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = await getWeatherData("weather",searchParams).then(formatCurrent) 
    return {...formattedCurrentWeather}
}
export default getFormattedWeatherData