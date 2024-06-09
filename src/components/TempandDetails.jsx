import { BiSolidDropletHalf } from "react-icons/bi"
import {FiWind} from "react-icons/fi"
import { FaThermometerEmpty } from "react-icons/fa"

const TempandDetails = ({weather: {
    details,icon,temp,speed,humidity,feels_like},units
}) => {
    const verticalDetails = [
        {
            id:1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${feels_like.toFixed()}°`            
        },
        {
            id:2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value:`${humidity.toFixed()}%`           
        },
        {
            id:3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()}${units === 'metric' ? 'km/h' : 'm/s'}`,       
        },
    ]
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-blue-200">
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img src={icon} alt="Weather Icon" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed(0)}°`}</p>
        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex font-light text-sm items-center justify-center">
              <Icon size={18} className="mr-1" />
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TempandDetails
