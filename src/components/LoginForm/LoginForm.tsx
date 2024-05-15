import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useContext } from "react";
import CurrUserContext from "../CurrUserContext/CurrUserContext";

function LoginForm() {

  const navigate = useNavigate();
  // get login, ignore user, logout, signup
  const {login} = useContext(CurrUserContext);

  // get login fields and submit them, using function from CurrUserContext
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;
    const password = (event.target as HTMLFormElement).password.value;

    try {
      if (!username || !password) {
        alert('Please fill in all fields');
        throw new Error("Please fill in all fields");
      }
      // do login with function passed from CurrUserContext
      await login({ username, password });
      navigate("/");
    } catch (error) {
      console.error(`error on login: ${error}`);
      navigate("/login");
    }
  }

  return (
    <div className="container">
      < Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" autoComplete="username" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" autoComplete="current-password" />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default LoginForm