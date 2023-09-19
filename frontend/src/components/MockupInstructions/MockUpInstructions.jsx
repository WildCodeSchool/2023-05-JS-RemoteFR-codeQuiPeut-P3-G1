import React from "react"

const MockUpInstructions = () => {
  return (
    <>
      <div className="globalInstructions">
        <div className="Instructions-Title">
          Embark on Epic Adventures with GUILD
        </div>
        <div className="Instruction-Scene-Text">
          <img
            src="src/assets/landing-assets/computerPhone.png"
            className="instruction3D"
          />

          <div className="InstructionText">
            <div className="Companions-Title">Find Your Companions</div>
            <div className="Companions-Text">
              Explore profiles of other users on GUILD. Use smart filters to
              discover players or GMs that match your specific criteria, be it
              location, preferred RPG systems, experience level, and more.
              <br />
              Whether you're a curious newcomer or a seasoned RPG veteran, GUILD
              is tailored to provide you with an unparalleled role-playing
              adventure, uniting players and GMs who revel in the wonders of
              boundless imagination and storytelling prowess.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MockUpInstructions
