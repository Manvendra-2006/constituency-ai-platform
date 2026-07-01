const ErrorMessage = ({ message }) => (
  <div className="error-state">
    <h3>We could not load this view</h3>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
