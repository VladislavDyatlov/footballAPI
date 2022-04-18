import { Link } from "react-router-dom";


function Navbar(){
    return(
        <>
<div className="font-link">
<nav class="navbar navbar-expand navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand">
    <img src="https://media.istockphoto.com/vectors/football-flat-icon-vector-id502491808?s=170x170" alt="" width="30" height="30" class="d-inline-block align-text-top" />
      NowFootball
      </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExample02">
      <ul class="navbar-nav mr-auto text-center">
        <li class="nav-item active">
        <Link class="nav-link active" aria-current="page" to="/">Лиги</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link" to="/team">Команды</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
        </>
    )
}

export default Navbar;