import Pagination from "react-bootstrap/Pagination";

function Paginator({
  wines,
  pages,
  currentPage,
  firstPageOnClick,
  lastPageOnClick,
  pagesOnClick,
  previousPageOnClick,
  nextPageOnClick,
}) {
  let allWines = [];
  for (let i = 0; i < pages; i++) {
    allWines.push(i);
  }

  return (
    <Pagination size="lg">
      <Pagination.First onClick={firstPageOnClick} />
      <Pagination.Prev onClick={previousPageOnClick} />

      {allWines.map((x, i) => (
        <Pagination.Item key={i} onClick={() => pagesOnClick(i + 1)}>
          {i + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={nextPageOnClick} />
      <Pagination.Last onClick={lastPageOnClick} />
    </Pagination>
  );
}

export default Paginator;
