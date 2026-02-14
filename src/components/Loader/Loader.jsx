import ClipLoader from "react-spinners/ClipLoader";

function Loader({ loading }) {
  return (
    <div className="loader">
      <ClipLoader color="blue" loading={loading} size={50} />
    </div>
  );
}

export default Loader;
