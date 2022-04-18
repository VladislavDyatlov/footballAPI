import { Link } from "react-router-dom";
import React, {useState,useEffect} from "react";
import axios from "axios";
import Pagination from "./pagination"

function Center(){

  const [data,setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [LeaguePage] = useState(8)
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('')


  const GetApi = () =>{

    const options = {
      method: 'GET',
      url: 'https://api.football-data.org/v2/competitions',
      headers: {
        'X-Auth-Token': '0e49f88eef8c48b4b76e5fb6dc475de8',
      },
    };
    
  axios.request(options).then((response) => {
     console.log(response.data.competitions);
      setData(response.data.competitions);
      setLoading(false)
    }).catch((error) => {
      console.error(error);
    });
  
  
    }
  
  
    useEffect(() =>{
      GetApi()
    },[])

  const lastFootballPageIndex = currentPage * LeaguePage
  const firstPage = lastFootballPageIndex - LeaguePage
  const currentLaegue = data.slice(firstPage, lastFootballPageIndex)

  const pagination = number => setCurrentPage(number)

  const filterLeague = currentLaegue.filter(league =>{
    return league.name.toLowerCase().includes(value.toLowerCase())
  })

  if (loading){
    return <p><img src="https://bluebisonweb.com/images/loading.gif" width="100" height="80" alt="Loading"/>Подождите пока идет загрузка ...</p>
  }

    return(
        <>
        <div className="font-link">
        <div><p></p></div>
        <h1 class="text-center">Все лиги мира</h1>
        <div><p></p></div>
        <div class="input-group input-group-sm mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-sm">Поиск лиги</span>
  </div>
  <input type="text" class="form-control" onChange={(e) => setValue(e.target.value)} aria-label="Sizing example input" placeholder="Поиск..."aria-describedby="inputGroup-sizing-sm" />
</div>
        <div><p></p></div>
      <div class="row align-items-md-stretch text-center">  
      {filterLeague?.map((league, i) => (
    <div key={league.id} class="col-md-3 g-2 g-lg-3 d-grid gap-3">
      <div class=" h-100 p-4 bg-light border rounded-4">
        <div>
        <h4>{league.name}</h4>
        <h5>
          {league.area.name}
          </h5>          
        </div>
        <Link to={`/match/${league.id}`}><img src={league.emblemUrl || 'https://yt3.ggpht.com/ytc/AKedOLRVTvaGQJ7V0HsdOqTBrmWP9zun6Ez2011PN_ur=s900-c-k-c0x00ffffff-no-rj' } width="150" height="150"/></Link>
      </div>
    </div>
        ))} 
     </div>
     <Pagination PerPage={LeaguePage} totalPage={data.length} pagination={pagination} />
     </div>
        </>
    )
}

export default Center;