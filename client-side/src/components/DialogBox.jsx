import { createPortal } from "react-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function DialogBox({ message, error, success, onClose }) {
  return createPortal(
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="bg-white shadow-lg rounded-4 p-4 text-center position-relative animate__animated animate__fadeIn animate__faster">
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={onClose}
        ></button>

        {error && (
          <div className="text-danger mb-3 d-flex align-items-center justify-content-center">
            <i className="bi bi-exclamation-triangle-fill fs-3 me-2"></i>
            <span className="fw-semibold">{error}</span>
          </div>
        )}

        {success && (
          <div className="text-success mb-3 d-flex align-items-center justify-content-center">
            <i className="bi bi-check-circle-fill fs-3 me-2"></i>
            <span className="fw-semibold">{success}</span>
          </div>
        )}

        {message && <div className="text-secondary mt-2">{message}</div>}
      </div>
    </div>,
    document.body
  );
}

export default DialogBox;
