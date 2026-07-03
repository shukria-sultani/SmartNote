import Header from "./Header";
import Footer from "./Footer"
import { FaLightbulb, FaMessage } from "react-icons/fa6";
import { FaBrain } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { GoalIcon } from "lucide-react";
import { QuoteIcon } from "lucide-react";
import { StarIcon } from "lucide-react";
import { Code } from "lucide-react";
import { FcCollaboration } from "react-icons/fc";
import { Paintbrush2 } from "lucide-react";
import { FaUser } from "react-icons/fa";

import contactImg from "../assets/images/contact.jpg";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

import emailjs from "@emailjs/browser"
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "../hooks/useTranslationContext";
export default function About() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const handleSubmit = async(e)=>{
   e.preventDefault();
    const serviceId = "service_g6hge3g"
  const templateId = "template_lgyafb3"
  const publicKey = "T8RQaGSnAUyZ0psqU"

  const templateParams = {
      formName: name,
      formEmail: email,
      recipient: "Shukria",
      message: message
  }
  try{
    const response = emailjs.send(serviceId, templateId, templateParams, publicKey);
  if(response){
    toast.success("Thanks for contacting me! Email has sent successfully")
  }
  setName("")
  setEmail("")
  setMessage("")
  }catch(error){
     toast.error("Falid to send the email, try again.")
     console.log(error)
  }


}
 const {t} = useTranslation()

  return (
    <>
      <Header></Header>
      <Toaster></Toaster>
      <div className="about-container">
        <div className="vision">
          <h2>
            {" "}
            <FaLightbulb style={{ fontSize: "2.3rem" }}></FaLightbulb>
            {t("about_smart")}
          </h2>

          <p>
            {t("about_description")}
          </p>
        </div>

        <div className="philosophy">
          <h2>
            <StarIcon
              className="star"
              style={{
                color: "rgb(255, 158, 1)",
                width: "40px",
                height: "auto",
              }}
            ></StarIcon>
            {t("philosophy")}
          </h2>
          <div>
            <div>
              <GoalIcon className="goalIcon"></GoalIcon>
              <h3>{t("philosophy_1")}</h3>
            </div>
            <div>
              <FaShield></FaShield>
              <h3>{t("philosophy_2")}</h3>
            </div>
            <div>
              <FaBrain></FaBrain>
              <h3>{t("philosophy_3")}</h3>
            </div>
          </div>
        </div>

        <div className="creater">
          <h2>
            <Code
              style={{
                color: "rgb(255, 158, 1)",
                width: "40px",
                height: "auto",
              }}
            ></Code>{" "}
           {t("developer")}
          </h2>
          <div>
            <QuoteIcon></QuoteIcon>
            <p>
              {t("developer_info")}
            </p>
            <QuoteIcon></QuoteIcon>
          </div>
        </div>

        <div className="contribution">
          <h2>
            <FcCollaboration
              style={{
                color: "rgb(255, 158, 1)",
                width: "40px",
                height: "auto",
              }}
            ></FcCollaboration>{" "}
            {t("contribute")}
          </h2>
          <div className="contribution-options">
            <h4>{t("how")}</h4>
            <p>
             {t("contrib_description")}
            </p>
            <div>
              <div>
                <Code
                  style={{
                    color: "rgb(166, 207, 1)",
                    width: "70px",
                    height: "auto",
                  }}
                ></Code>{" "}
               {t("code")}
              </div>
              <div>
                <Paintbrush2
                  style={{
                    color: "rgb(166, 207, 1)",
                    width: "60px",
                    height: "auto",
                  }}
                ></Paintbrush2>
               {t("design")}
              </div>
            </div>
            <a
              href="https://github.com/shukria-sultani/SmartNote"
              target="_blank"
            >
              {t("github_repo")}
            </a>
          </div>
        </div>

        <div className="contact-form">
          <img src={contactImg} alt="" />
          <form action="" onSubmit={handleSubmit}>
            <h2>{t("contact_me")}</h2>
            <div>
              <label htmlFor="name">
                <FaUser></FaUser>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                name="name"
                placeholder={t("contact_name")}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="email">
                <MdEmail></MdEmail>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder={t("email")}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="message" id="message" style={{ top: "20%" }}>
                <FaMessage></FaMessage>
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                placeholder={t("message")}
                onChange={(e) => {
                  setMessage(e.target.value)
                }}
                required
              ></textarea>
            </div>
            <button>{t("send_message")}</button>
          </form>
        </div>


        <Footer></Footer>
      </div>
    </>
  );
}
