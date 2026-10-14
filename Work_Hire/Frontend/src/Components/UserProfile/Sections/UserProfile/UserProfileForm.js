import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import styles from "../../../../CSS/Form.module.css";
import { withTranslation } from "react-i18next";

class UserProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "", // <-- Added email field
      phoneNumber: "",
      aadharNumber: "",
      category: "",
      YOE: "",
      otherSkills: "",
      currentLocation: "",
      availability: "",
      messageForRecruiter: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === "phoneNumber") {
      document.getElementById("phoneNumber").style.display =
        value.length < 10 ? "block" : "none";
    }

    if (name === "aadharNumber") {
      document.getElementById("aadharNumber").style.display =
        value.length < 12 ? "block" : "none";
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let englishCategory = "OTHERS";
    if (this.state.category === "बिजली कारीगर") englishCategory = "ELECTRICIAN";
    else if (this.state.category === "नलकार") englishCategory = "PLUMBER";
    else if (this.state.category === "क्रियाविधि") englishCategory = "MECHANIC";
    else if (this.state.category === "बावरची") englishCategory = "COOK";
    else if (this.state.category === "चपरासी") englishCategory = "PEON";
    else if (this.state.category === "चालक") englishCategory = "DRIVER";
    else if (this.state.category === "नौकरानी") englishCategory = "MAID";
    else if (this.state.category === "श्रम") englishCategory = "LABOUR";
    else if (this.state.category === "सुरक्षा गार्ड") englishCategory = "SECURITY GUARD";
    else englishCategory = this.state.category;

    const newUser = {
      username: this.state.username,
      email: this.state.email, // <-- send email
      phoneNumber: this.state.phoneNumber,
      aadharNumber: this.state.aadharNumber,
      category: englishCategory,
      YOE: this.state.YOE,
      otherSkills: this.state.otherSkills,
      currentLocation: this.state.currentLocation,
      availability: this.state.availability,
      messageForRecruiter: this.state.messageForRecruiter,
    };

    axios
      .post("http://localhost:3050/user/register", newUser)
      .then((response) => {
        console.log("SUBMITTING USER PROFILE", response);
        alert("Your profile is now visible to Recruiters");

        // Reset form
        this.setState({
          username: "",
          email: "",
          phoneNumber: "",
          aadharNumber: "",
          category: "",
          YOE: "",
          otherSkills: "",
          currentLocation: "",
          availability: "",
          messageForRecruiter: "",
        });
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error submitting your profile");
      });
  };

  render() {
    const { t } = this.props;
    const {
      username,
      email,
      phoneNumber,
      aadharNumber,
      category,
      YOE,
      otherSkills,
      currentLocation,
      availability,
      messageForRecruiter,
    } = this.state;

    return (
      <div style={{ marginBottom: "80px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label className={styles.CardTitle}>
            {t("Add your profile to get hired")}
          </Form.Label>

          {/* Username */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="username"
              value={username}
              placeholder={t("Username")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="email"
              name="email"
              value={email}
              placeholder={t("Email")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              placeholder={t("Phone Number")}
              maxLength="10"
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <p id="phoneNumber" className={styles.ErrorMessage}>
            * Enter a 10 digit number
          </p>

          {/* Aadhar Number */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="aadharNumber"
              value={aadharNumber}
              placeholder={t("Aadhar Number")}
              maxLength="12"
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <p id="aadharNumber" className={styles.ErrorMessage}>
            * Enter a 12 digit number
          </p>

          {/* Category */}
          <Form.Group>
            <Form.Control
              as="select"
              className={styles.Input}
              name="category"
              value={category}
              defaultValue="Choose Category"
              style={{ marginTop: "30px", marginLeft: "40px" }}
              onChange={this.handleChange}
              required
            >
              <option> {t("Choose Category")} </option>
              <option> {t("ELECTRICIAN")} </option>
              <option> {t("PLUMBER")} </option>
              <option> {t("MECHANIC")} </option>
              <option> {t("COOK")} </option>
              <option> {t("PEON")} </option>
              <option> {t("DRIVER")} </option>
              <option> {t("MAID")} </option>
              <option> {t("LABOUR")} </option>
              <option> {t("SECURITY GUARD")} </option>
              <option> {t("OTHERS")} </option>
            </Form.Control>
          </Form.Group>

          {/* YOE */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="YOE"
              value={YOE}
              placeholder={t("Years of Experience")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {/* Other Skills */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="otherSkills"
              value={otherSkills}
              placeholder={t("Any Other Skill?")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
            />
          </Form.Group>

          {/* Current Location */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="currentLocation"
              value={currentLocation}
              placeholder={t("Current Location")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {/* Availability */}
          <Form.Group>
            <Form.Control
              className={styles.Input}
              type="text"
              name="availability"
              value={availability}
              placeholder={t("Date of Availability (YYYY/MM/DD)")}
              style={{ marginLeft: "40px", marginTop: "30px" }}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          {/* Message for Recruiter */}
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={4}
              name="messageForRecruiter"
              value={messageForRecruiter}
              placeholder={t(
                "Anything you want to share with the recruiter..."
              )}
              style={{ marginTop: "35px", marginLeft: "40px" }}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Button className={styles.Button} type="submit">
              {t("Submit")}
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withTranslation()(UserProfileForm);
