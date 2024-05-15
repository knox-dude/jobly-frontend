import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import CurrUserContext from "../CurrUserContext/CurrUserContext";

function ProfileForm() {
  const navigate = useNavigate();
  // get signup, ignore user, logout, login
  const {user, editProfile} = useContext(CurrUserContext);

  // get all fields and submit them to modify current user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = (event.target as HTMLFormElement).firstName.value || undefined;
    const lastName = (event.target as HTMLFormElement).lastName.value || undefined;
    const email = (event.target as HTMLFormElement).email.value || undefined;
    

    try {
      if (!firstName && !lastName && !email) {
        alert('Please fill in at least one field to change');
        throw new Error("not all fields filled in");
      }
      await editProfile({firstName, lastName, email});
    } catch (error) {
      console.error(`error in editProfile: ${error}`);
      navigate("/profile");
      return;
    }
    alert('Profile updated successfully');
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            defaultValue={user?.firstName}
            autoComplete="given-name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue={user?.lastName}
            autoComplete="family-name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" defaultValue={user?.email} autoComplete="email" />
        </FormGroup>
        <Button type="submit">Edit Profile</Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
