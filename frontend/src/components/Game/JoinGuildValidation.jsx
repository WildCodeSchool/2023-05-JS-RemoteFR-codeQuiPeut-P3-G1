export default function JoinGuildValidation({ setJoinGuildValidation }) {
  return (
    <div id="joinGuildGlobalValidation">
      <p>
        Your request to join this guild has been sent, please wait for
        GameMaster validation
      </p>
      <div id="loaderJoin"></div>
      <button onClick={() => setJoinGuildValidation(false)}>Close</button>
    </div>
  )
}
