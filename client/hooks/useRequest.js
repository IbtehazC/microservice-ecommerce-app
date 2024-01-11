import { useState } from "react";
import axios from "axios";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(nulls);
      const response = await axios[method](url, body);

      if (onSuccess) onSuccess(response.data);

      return response.data;
    } catch (err) {
      setErrors(
        <div>
          <h4>OOOPS!</h4>
          <ul>
            {err.response.data.errors.map((err) => (
              <li>err.message</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
