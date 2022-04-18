import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Pagination from "./pagination";

function Team(){

  const [selectedLeague, setSelectedLeague] = useState("eng.1");
  const [selectedYear, setSelectedYear] = useState("2021");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [LeaguePage] = useState(8)

  useEffect(() => {
    setLoading(true);
    setData([]);
    axios
      .get(
        `https://api-football-standings.azharimm.site/leagues/${selectedLeague}/standings?season=${selectedYear}`
      )
      .then((res) => {
        console.log(res.data.data.standings);
        setData(res.data.data.standings);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [selectedYear, selectedLeague]);

  const lastFootballPageIndex = currentPage * LeaguePage
  const firstPage = lastFootballPageIndex - LeaguePage
  const currentLaegue = data.slice(firstPage, lastFootballPageIndex)

  const [pageNumberLimit, setpageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pagination = number => setCurrentPage(number)

  return(
    <>
    <div><p></p></div>
    <div className="standings-container">
      <div className="select-fields">
        <select
          name="select-league"
          id="select-league"
          class="form-select"
          defaultValue={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="arg.1">Argentine Liga Profesional de Fútbol</option>
          <option value="aus.1">Australian A-League</option>
          <option value="bra.1">Brazilian Serie A</option>
          <option value="chn.1">Chinese Super League</option>
          <option value="ned.1">Dutch Eredivisie</option>
          <option value="eng.1">English Premier League</option>
          <option value="fra.1">French Ligue 1</option>
          <option value="ger.1">German Bundesliga</option>
          <option value="idn.1">Indonesian Liga 1</option>
          <option value="ita.1">Italian Serie A</option>
          <option value="jpn.1">Japanese J League</option>
          <option value="mys1">Malaysian Super League</option>
          <option value="mex.1">Mexican Liga BBVA MX</option>
          <option value="por.1">Portuguese Liga</option>
          <option value="rus.1">Russian Premier League</option>
          <option value="sgp.1">Singaporean Premier League</option>
          <option value="esp.1">Spanish Primera División</option>
          <option value="tha.1">Thai Premier League</option>
          <option value="tur.1">Turkish Super Lig</option>
          <option value="uga.1">Ugandan Super League</option>
        </select>
        <select
          name="select-year"
          id="select-year"
          class="form-select"
          onChange={(e) => setSelectedYear(e.target.value)}
          defaultValue={selectedYear}
        >
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
      </div>

      <div><p></p></div>

     <table class="table table-hover">
   <thead>
    <tr>
      <th scope="col">Место</th>
      <th scope="col">Логотип</th>
      <th scope="col">Название Клуба</th>
      <th scope="col">Расположение</th>
    </tr>
  </thead>
    <tbody>
        {loading ? (
           <p><img src="https://bluebisonweb.com/images/loading.gif" width="100" height="80" alt="Loading"/>Подождите пока идет загрузка ... ...</p>
        ) : (
          currentLaegue?.map((data, index) => (
    <tr key={index} >
      <td>{`${index + 1}.`}</td>
      <td><img src={data.team.logos[0]?.href} width="40" height="40"alt="#"/></td>
      <td>{data.team.shortDisplayName}</td>
      <td>{data.team.location}</td>
    </tr>
          ))
        )}  
    </tbody>
</table>
<Pagination  PerPage={LeaguePage} totalPage={data.length} pagination={pagination} maxPageNumberLimit={maxPageNumberLimit} minPageNumberLimit={minPageNumberLimit} />
    </div> 
    </>
  );
}

export default Team;