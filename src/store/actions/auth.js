import { url } from "../../constants/url";
export const LOG_IN_AS_ADMIN = "LOG_IN_AS_ADMIN";

export const validatePasswordAndGetToken = (password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/admin/validate-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      const responseJson = await response.json();

      console.log(responseJson);

      if (response.status != 200) {
        throw new Error();
      }
      dispatch({ type: LOG_IN_AS_ADMIN, token: responseJson.token });
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  };
};
