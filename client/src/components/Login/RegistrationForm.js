import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Calendar from "react-calendar";
import { GoogleLogin } from "react-google-login";
import "react-calendar/dist/Calendar.css";

const Registration = () => {
  const [value, onChange] = useState(new Date());
  const [firstName, setFirstNname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState("");
  const [btnText, setBtnText] = useState("Sign up");
  const history = useHistory();
  console.log(value);

  const signUp = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      password,
      day: value.getDate(),
      month: value.getMonth() + 1,
      year: value.getFullYear(),
      gender,
    };
    console.log(formData);
    try {
      const response = await fetch("/api/sign-up", {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.message);
      if (data.message) {
        setErrors(data.message);
      }
      setBtnText("Account created. Logging in...");
      logIn();
    } catch (error) {
      console.error(error);
    }
  };

  const logIn = async () => {
    const formData = {
      email,
      password,
    };
    try {
      const response = await fetch("/api/login", {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const user = await response.json();
      console.log(user);
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user));
        history.push(`/users/${user.user._id}/timeline`);
        window.location.reload();
      } else if (user.message) {
        setErrors(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const responseGoogle = (response)=>{
        console.log(response)
  }

  return (
    <>
      <div className="container  ">
        <div className="row  justify-content-center mt-3 ">
          <div className="col-md-5 mt-3 ">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  onChange={(e) => setFirstNname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Passwod"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group text-start">
                <label htmlFor="exampleInputEmail1">Date Of Birth</label>
                <Calendar onChange={onChange} value={value} />
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label>Gender</label>
                </div>
                <div className="col-md-7 ">
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="Male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Male
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="Female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-success "
                  onClick={signUp}
                >
                  Register
                </button>
              </div>
              <hr className="mt-4" />
              <div>
                Alread have an account ? <Link to="/">Login</Link>
              </div>
            </form>
            {/* <div className="row">
              <GoogleLogin
                clientId="1044531787216-cgn8ccddsbqh9t18ismhnhjqtft3d3p1.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                // buttonText="Login"
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
