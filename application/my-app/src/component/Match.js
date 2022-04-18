import React, {useState,useEffect} from "react";
import axios from "axios";
import Pagination from "./pagination"
import { useParams } from "react-router-dom";


function Match(){

  const [data,setData] = useState([])
  const [date,setDate] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [LeaguePage] = useState(7)
  const [loading, setLoading] = useState(true)
  const [LastData, setLastData] = useState("");
  const [FirstData, setFirstData] = useState("");



  const lastFootballPageIndex = currentPage * LeaguePage
  const firstPage = lastFootballPageIndex - LeaguePage
  const currentMatch = data.slice(firstPage, lastFootballPageIndex)

  const pagination = number => setCurrentPage(number)
  const params = useParams()
  const prodId = params.id


  const GetApi = () =>{

    const options = {
      method: 'GET',
      url: `http://api.football-data.org/v2/competitions/${prodId}/matches?dateFrom=${LastData}&dateTo=${FirstData}`,
      headers: {
        'X-Auth-Token': '	0e49f88eef8c48b4b76e5fb6dc475de8',
      },
    };
    
  axios.request(options).then((response) => {
     console.log(response.data.matches);
      setDate(response.data.competition);
      console.log(response.data.competition);
      setData(response.data.matches);
      setLoading(false)
    }).catch((error) => {
      console.error(error);
    });
  
  
    }
    
  
    useEffect(() =>{
      GetApi()
    },[[LastData, FirstData]])

    const onChangeHandler = event => {
      setLastData(event.target.value);
      console.log(LastData)
    }

    const onChangeHandlers = event => {
      setFirstData(event.target.value);
      console.log(FirstData);
    }


    if (loading){
      return <p><img src="https://bluebisonweb.com/images/loading.gif" width="100" height="80" alt="Loading"/>Подождите пока идет загрузка ... ...</p>
    }

    return(
        <>
        <div className="font-link">
        <div className="text-center">
         <h4>Лига &rarr; {date.name}</h4> 
        </div>
        <div className="text-center"><p></p></div>
        <div className="text-center"><h2>Матчи</h2></div>
        <div className=""><p></p></div>
        <div className="text-center"><p>С <input type="date" value={LastData} placeholder="ДД.ММ.ГГ" defaultValue={LastData} onChange={onChangeHandler}  /> по <input value={FirstData} type="date" placeholder="ДД.ММ.ГГ" defaultValue={FirstData} onChange={ onChangeHandlers} /></p></div>
        <table class="table table-hover text-center">
   <thead>
    <tr>
      <th scope="col">Дата</th>
      <th scope="col">Статус</th>
      <th scope="col">Команда 1</th>
      <th scope="col">Счет</th>
      <th scope="col">Команда 2</th>
      <th scope="col">Коэффицыенты</th>
    </tr>
  </thead>
    <tbody>
        {currentMatch.length <= 0 ? (
           <strong class="text-center">Матчей нет <img src="https://www.mallikamanivannan.com/community/data/attachments/0/852-ec915002a2f43324ea18f52623dd97c5.jpg" width="50" height="50" /></strong>
        ) : (
          currentMatch?.map((data, index) => (
    <tr key={index} >
      <td>{data.lastUpdated}</td>
      <td>{data.status}</td>
      <td>{data.awayTeam.name}</td>
      <td>{data.score.fullTime.awayTeam}-{data.score.fullTime.homeTeam}</td>
      <td>{data.homeTeam.name}</td>
      <td>{data.odds.awayWin}-{data.odds.homeWin}</td>
    </tr>
          ))
        )}  
    </tbody>
</table>
<Pagination PerPage={LeaguePage} totalPage={data.length} pagination={pagination} />
<Teams />
</div>
        </>
    )
}

function Teams(){

  const [currentPage, setCurrentPage] = useState(1)
  const [LeaguePage] = useState(7)

  const params = useParams()
  const prodId = params.id
  const [dat,setDat] = useState([])

  const lastFootballPageIndex = currentPage * LeaguePage
  const firstPage = lastFootballPageIndex - LeaguePage
  const currentTeam = dat.slice(firstPage, lastFootballPageIndex)

  const pagination = number => setCurrentPage(number)


  const GetApiTeam = () =>{

    const options = {
      method: 'GET',
      url: `http://api.football-data.org/v2/competitions/${prodId}/teams`,
      headers: {
        'X-Auth-Token': '0e49f88eef8c48b4b76e5fb6dc475de8',
      },
    };
    
  axios.request(options).then((response) => {
     console.log(response.data.teams);
      setDat(response.data.teams);
    }).catch((error) => {
      console.error(error);
    });
  
    }
    
  
    useEffect(() =>{
      GetApiTeam()
    },[])

  return(
    <>
    <div className="text-center"><h2>Команды участвующие в соревновании</h2></div>
    <div className="text-center"><p></p></div>
    <table class="table table-hover text-center">
  <thead>
    <tr>
      <th scope="col">Команда</th>
      <th scope="col">Телефон</th>
      <th scope="col">Сайт</th>
      <th scope="col">Почта</th>
      <th scope="col">Год образования</th>
    </tr>
  </thead>
  <tbody>
  {currentTeam?.map((team) =>(
        <tr key={team.id}>
      <td>{team.name}</td>
      <td>{team.phone}</td>
      <td>{team.website}</td>
      <td>{team.email}</td>
      <td>{team.founded}</td>
    </tr>
  ))}
  </tbody>
</table>
<Pagination PerPage={LeaguePage} totalPage={dat.length} pagination={pagination} />
</>
  );
}

export default Match;