import React from "react"

export default function CardGame({ onClose }) {
  return (
    <div>
      <button className="buttonClose" onClick={onClose}>
        X
      </button>
    </div>
  )
}

// SELECT
//     u.username AS username,
//     u.profil_picture AS profil_picture,
//     g.schedule AS schedule,
//     g.description AS description,
//     g.type AS type,
//     g.guild_name AS guild_name,
//     g.city AS city,
//     g.is_remote AS is_remote,
//     g.is_campaign AS is_campaign,
//     g.gm_username AS gm_username
// FROM
//     games AS g
// INNER JOIN
//     games_has_users AS gu
// ON
//     g.id = gu.games_id
// INNER JOIN
//     users AS u
// ON
//     gu.users_id = u.id
// WHERE
//     g.id = VOTRE_ID_DE_PARTIE;
