function Pagination({PerPage, totalPage, pagination}){

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(totalPage / PerPage); i++) {
        pageNumber.push(i)
    }

    return(
        <>
<nav  aria-label="Page navigation example">
  <ul class="pagination">
        {pageNumber?.map((num) =>(
    <li key={num} class="page-item">
      <a class="page-link" href="#" aria-label="Next" onClick={() => pagination(num)}>
        {num}
      </a>
    </li>

        ))}
  </ul>
</nav>
        </>
    )
      
}

export default Pagination;