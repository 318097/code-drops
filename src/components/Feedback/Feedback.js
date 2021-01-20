import React, { useState, Fragment } from "react";
import { Input, Button, message as antMessage } from "antd";
import axios from "axios";
import { connect } from "react-redux";

const { TextArea } = Input;

const initialState = {
  name: "",
  email: "",
  message: "",
};

const Feedback = ({ session, history }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  const handleInput = (key) => ({ target: { value } }) =>
    setForm((data) => ({ ...data, [key]: value }));

  const submitResponse = async () => {
    try {
      setLoading(true);
      const { name, email, message } = form;
      if (!name || !email || !message)
        return antMessage.error("All fields are required");

      await axios.post("/feedback", form);
      antMessage.success("Submitted");
      setForm(initialState);
      history.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loggedInUser = session && session.loggedIn;
  return (
    <section id="feedback">
      <h3>Feedback</h3>
      {!loggedInUser && (
        <Fragment>
          <Input
            className="mb"
            value={form.name}
            onChange={handleInput("name")}
            placeholder="Name"
          />
          <Input
            className="mb"
            value={form.email}
            onChange={handleInput("email")}
            placeholder="Email"
          />
        </Fragment>
      )}
      <TextArea
        placeholder="Feedback..."
        onChange={handleInput("message")}
        rows={4}
      />
      <br />
      <Button onClick={submitResponse} loading={loading}>
        Submit
      </Button>
    </section>
  );
};

const mapStateToProps = ({ app: { session } }) => ({
  session,
});

export default connect(mapStateToProps)(Feedback);