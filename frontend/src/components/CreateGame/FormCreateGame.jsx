import hour from "../../assets/icon-create-game/horaire.png"
import { TimePicker } from "react-ios-time-picker"
import Calendar from "moedim"

function FormCreateGame({
  isTimeRequired,
  setIsTimeRequired,
  handleDecrement,
  handleIncrement,
  gameRPGList,
  //   setGameRPGList,
  departmentList,
  //   setDepartementList,
  departmentId,
  setDepartementId,
  cityList,
  //   setCityList,
  //   gameRPGID,
  setGameRPGID,
  //   gamemasterUsername,
  //   setGamemasterUsername,
  gameDateToFormat,
  setGameDateToFormat,
  gameHourToFormat,
  setGameHourToFormat,
  //   gameDate,
  //   setGameDate,
  //   gamePlace,
  setGamePlace,
  gamePlayersCapacity,
  setGamePlayersCapacity,
  //   gameDesc,
  setGameDesc,
  gameType,
  setGameType,
  gameName,
  setGameName,
  //   gameIsCampaign,
  //   setGameIsCampaign,
  gameIsRemote,
  setGameIsRemote,
  handleChange,
  handleCreateGame,
  // headers,
}) {
  return (
    <>
      <div id="contentCreateGame">
        <form
          id="createGameForm"
          onSubmit={(e) => {
            handleCreateGame(e)
          }}
        >
          <div id="createGameColumns">
            <div id="createGameFirstGroup">
              <label htmlFor="guildName">
                <p>Guild's Name</p>
                <input
                  type="text"
                  onChange={(e) => setGameName(e.target.value)}
                  name="guildName"
                  id="createGameGuildName"
                  value={gameName}
                />
              </label>
              <label htmlFor="gameTypeSelecter">
                <p>Game Type</p>
                <div className="createGameSelect">
                  <select
                    onChange={(event) => setGameType(event.target.value)}
                    name="format"
                    id="gameTypeSelecter"
                    defaultValue={gameType !== "" ? gameType : ""}
                  >
                    <option value="" disabled>
                      Select your categorie
                    </option>
                    <option value="Horror">Horror</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                  </select>
                </div>
              </label>
              <label htmlFor="rpgNameSelecter">
                <p>Based on RPG</p>
                <div className="createGameSelect">
                  <select
                    onChange={(event) => setGameRPGID(event.target.value)}
                    id="rpgNameSelecter"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your game
                    </option>
                    {gameRPGList.map((rpg) => (
                      <option key={rpg.id} value={rpg.id}>
                        {rpg.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <div id="createGameSwitchGlobal">
                <p>One Shot</p>
                <label id="createGameSwitch">
                  <input type="checkbox" onClick={handleChange} />
                  <span className="slider round"></span>
                </label>
                <p>Campaign</p>
              </div>
              <label htmlFor="maxCapacity">
                <p>Number of Players</p>
                <div className="formTypeNumber">
                  <button
                    type="button"
                    className="btn-minus"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <input
                    id="createGameQuantity"
                    max="99"
                    min="1"
                    name="maxCapacity"
                    value={gamePlayersCapacity}
                    readOnly
                    onChange={(e) => setGamePlayersCapacity(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="btn-plus"
                  >
                    +
                  </button>
                </div>
              </label>
            </div>
            <div id="createGameSecondGroup">
              <label htmlFor="description">
                <p>Quick description of the game</p>
                <textarea
                  type="textarea"
                  name="description"
                  onChange={(e) => setGameDesc(e.target.value)}
                />
              </label>
              <div className="checkbox-CreateGame-Remote">
                <input
                  type="radio"
                  name="gameLocation"
                  className="demo1"
                  id="radio-Remote"
                  checked={gameIsRemote === 1}
                  onChange={() => setGameIsRemote(1)}
                />
                <label htmlFor="radio-Remote">Remote</label>

                <input
                  type="radio"
                  name="gameLocation"
                  className="demo1"
                  id="radio-OnPlace"
                  checked={gameIsRemote === 0}
                  onChange={() => setGameIsRemote(0)}
                />
                <label htmlFor="radio-OnPlace">On Place</label>
              </div>
            </div>
            <div id="createGameThirdGroup">
              {gameIsRemote === 1 ? (
                ""
              ) : (
                <label htmlFor="Department">
                  <p>Department</p>
                  <div className="createGameSelect">
                    <select
                      id="departmentNameSelecter"
                      defaultValue=""
                      onChange={(event) => setDepartementId(event.target.value)}
                    >
                      <option value="" disabled>
                        Select your department
                      </option>
                      {departmentList.map((department) => (
                        <option key={department.code} value={department.code}>
                          {department.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              )}
              {departmentId !== "" && gameIsRemote !== 1 ? (
                <label htmlFor="city">
                  <p>City</p>
                  <div className="createGameSelect">
                    <select
                      onChange={(event) => setGamePlace(event.target.value)}
                      id="cityNameSelecter"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your city
                      </option>
                      {cityList.map((city) => (
                        <option key={city.code} value={city.nom}>
                          {city.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              ) : (
                ""
              )}
              <label htmlFor="date">
                <p>Date</p>
                <Calendar
                  value={gameDateToFormat}
                  onChange={(e) => setGameDateToFormat(e)}
                  id="createGameCalendar"
                  required
                />
              </label>
              <label htmlFor="hour">
                <p>Hour</p>
                <div className="timePicker-CreateGame">
                  <TimePicker
                    onChange={(timeValue) => {
                      setGameHourToFormat(timeValue)
                    }}
                    value={gameHourToFormat}
                    className="timepicker"
                    required={isTimeRequired}
                    onFocus={() => setIsTimeRequired(false)} // Désactive le required lorsque l'input est en focus
                    onBlur={() => setIsTimeRequired(true)} // Réactive le required lorsque l'input perd le focus
                  />
                  <img src={hour} />
                </div>
              </label>
              <div />
            </div>
          </div>
          <div id="createGameButton">
            <button type="submit">
              <span>VALIDATE</span>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormCreateGame
