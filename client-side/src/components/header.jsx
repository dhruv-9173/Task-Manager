import useAuthContext from "./../hooks/useAuthContext";
function Header() {
  const { Signout, getUser, isAuthenticated } = useAuthContext();
  const user = getUser();
  return (
    <header className="bg-primary text-white shadow-sm py-3 ">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className="bi bi-calendar-week fs-3 me-2"></i>
          <span className="fs-4 fw-bold">TODO LIST</span>
        </div>

        {isAuthenticated && (
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle fs-4 me-2"></i>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => Signout()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
