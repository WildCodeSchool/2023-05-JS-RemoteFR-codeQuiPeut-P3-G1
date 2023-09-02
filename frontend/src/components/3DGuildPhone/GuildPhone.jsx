import Spline from "@splinetool/react-spline"

const GuildPhone = () => {
  return (
    <div>
      <div className="Global-GuildPhone">
        <div className="CreateGuildText">
          <div className="letscreate">
            <h2>LET’S CREATE A GUILD</h2>
            <hr />
          </div>
          <p className="createParagraph">
            Your premier online platform designed for Game Masters and
            passionate players seeking like-minded partners for thrilling
            role-playing sessions. Whether you're an experienced GM in search of
            enthusiastic adventurers or a player on the hunt for an epic RPG
            table.
          </p>
        </div>
        <div className="GuildPhone">
          <Spline scene="https://prod.spline.design/KGm3zLCbHu38cGRd/scene.splinecode" />
        </div>
      </div>
    </div>
  )
}

export default GuildPhone
