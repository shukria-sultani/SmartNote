import Header from "./Header";
import { FaLightbulb } from "react-icons/fa6";
import { FaBrain } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { GoalIcon } from "lucide-react";
import { QuoteIcon } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { StarIcon } from "lucide-react";
import { Code } from "lucide-react";
import { FcCollaboration } from "react-icons/fc";
import { Paintbrush2 } from "lucide-react";
export default function About() {
  return (
    <>
      <Header></Header>
      <div className="about-container">
        <div className="vision">
          <h2>                      <FaLightbulb style={{fontSize: "2.3rem"}}></FaLightbulb>
 About SmartNote: My Vision for Smarter Thinking</h2>

          <p>

            At SmartNote, we believe your ideas are your most valuable asset.
            Our vision is to move note-taking beyond simple recording and toward
            intelligent knowledge activation. We aim to eliminate the chaos of
            passive information consumption and provide a single, private space
            where your notes don't just sit—they work for you. SmartNote is
            built to transform every thought, lecture, and meeting into an
            active opportunity for learning, recall, and mastery.
          </p>
        </div>

        <div className="philosophy">
          <h2><StarIcon className="star" style={{color:"rgb(255, 158, 1)", width:"40px", height:"auto"}}></StarIcon>My Philosopy: Clarity, Control, and Continous Learning</h2>
          <div>
            <div>
              <GoalIcon className="goalIcon"></GoalIcon>
              <h3>Calrity Through Simplicity</h3>
            </div>
            <div>
              <FaShield></FaShield>
              <h3>Control Over Your Data</h3>
            </div>
            <div>
              <FaBrain></FaBrain>
              <h3>Continous Learning</h3>
            </div>
          </div>
        </div>

        <div className="creater">
          <h2><Code style={{color:"rgb(255, 158, 1)", width:"40px", height:"auto"}}></Code> Meet the Developer</h2>
          <div>
            <QuoteIcon></QuoteIcon>
            <p>
              Hi, I'm <strong>Shukria Sultani</strong>, a Frontend Developer based in
              Afghanistan. Throughout my journey as a student and developer, I
              constantly dealt with complex lecture notes and documentations,
              and realized that existing note apps only tracked ideas—they
              didn't manage them. Driven by the need for a smarter system, I
              built SmartNote. It combines my background in UX design and
              frontend development with powerful AI to transform how you
              interact with your own thoughts.
            </p>
            <QuoteIcon></QuoteIcon>
          </div>
        </div>

        <div className="contribution">
          <h2><FcCollaboration style={{color:"rgb(255, 158, 1)", width:"40px", height:"auto"}} ></FcCollaboration> Contribute to SmartNote: Join the Mission</h2>
       <div className="contribution-options">
            <h4>How You Can Help</h4>
            <p>
              I believe in open development. Every contribution, big or small,
              helps turn SmartNote into the best tool it can be.
            </p>
           <div>
              <div>
                <Code style={{color:"rgb(166, 207, 1)", width:"70px", height:"auto"}}></Code> <strong>Code Contributions:</strong>{" "}
                Help me refine features, improve performance, and build out the
                next generation of smart tools
              </div>
              <div>
                <Paintbrush2 style={{color:"rgb(166, 207, 1)", width:"60px", height:"auto"}}></Paintbrush2>
                <strong> Design & UX:</strong> Help me
                perfect the user experience and visual design, ensuring
                SmartNote remains clean and intuitive.
              </div>
            </div>
              <a href="https://github.com/shukria-sultani/SmartNote" target="_blank">GitHub Repository</a> 
          </div>
        </div>
      </div>
    </>
  );
}
