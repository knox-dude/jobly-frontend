import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import CurrUserContext from "../CurrUserContext/CurrUserContext";
import LoadingComponent from "../AnimatedLoadingText/AnimatedLoadingText";

function SignupForm() {
  const navigate = useNavigate();
  // get signup, ignore user, logout, login
  const {signup} = useContext(CurrUserContext);
  // state for loading once signup is submitted
  const [loading, setLoading] = useState<boolean>(false);

  // get all fields and submit them to function received from CurrUserContext in App
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.target as HTMLFormElement).username.value;
    const firstName = (event.target as HTMLFormElement).firstName.value;
    const lastName = (event.target as HTMLFormElement).lastName.value;
    const password = (event.target as HTMLFormElement).password.value;
    const email = (event.target as HTMLFormElement).email.value;

    try {
      if (!username || !firstName || !lastName || !password || !email) {
        alert('Please fill in all fields');
        throw new Error("not all fields filled in");
      }
      setLoading(true);
      await signup({username, firstName, lastName, password, email});
    } catch (error) {
      console.error(`error in signup: ${error}`);
      navigate("/signup");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent loading={loading} />
  }

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            autoComplete="given-name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="family-name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" autoComplete="email" />
        </FormGroup>
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
}

export default SignupForm;
