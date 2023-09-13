import ImageExemple from "../../../../backend/public/assets/images/profilPictures/ADider_Bourdon.jpeg"
import ParametersLogo from "../../assets/privateMessages/boutonsParametres.svg"

export default function Conversation() {
  return (
    <div className="divConversation">
      <div className="conversationHeader">
        <div className="convReceiverInfos">
          <div className="convReceiverPicture">
            <img src={ImageExemple} alt="receiver_profil_picture" />
          </div>
          <p>Name receiver</p>
        </div>
        <div className="convParameters">
          <img src={ParametersLogo} alt="Parameters" />
        </div>
      </div>
      <div className="convContents"></div>
    </div>
  )
}
