import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <>
      <Spinner animation="border" role="status" variant="danger">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="loader">Loding...</div>
    </>
  );
}

export default LoadingSpinner;
