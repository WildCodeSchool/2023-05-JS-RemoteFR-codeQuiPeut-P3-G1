export default function InvitationValidationCard({ setInvitationValidation }) {
  return (
    <div id="invitationValidationCardGlobal">
      <p>
        Your invitation to join this guild has been sent, please wait for player
        validation.
      </p>
      <div id="loaderInvitation"></div>
      <button onClick={() => setInvitationValidation(false)}>Close</button>
    </div>
  )
}
