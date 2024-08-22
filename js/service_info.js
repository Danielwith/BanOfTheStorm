const API_URL = "https://www.heroesprofile.com/api/v1";
const API_URL_2 = "https://api.heroesprofile.com/openApi";
const BLOB_URL = "https://www.heroesprofile.com/images/talents";

const data = {
  userinput: "LLENN#11396",
};
var seasonNumber = 27;

// getPlayerInfo("LLENN#11396");

function getPlayerInfo(battletag) {
  let playerButton = document.getElementById(`button_${battletag}`);
  if (battletag.split("#").length === 1) {
    alert("No tiene battletag completo.");
  } else {
    playerButton.innerHTML = "Cargando...";
    playerButton.setAttribute("disabled", "disabled");
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/battletag/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userinput: battletag }),
      })
        .then((response) => response.json())
        .then((data) => {
          let playerNA = data.filter((r) => {
            return r.regionName === "NA";
          })[0];

          fetch(`${API_URL}/player`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blizz_id: playerNA.blizz_id,
              region: playerNA.region,
              battletag: playerNA.battletagShort,
              game_type: "sl",
              season: seasonNumber,
            }),
          })
            .then((response) => response.json())
            .then((playerData) => {
              let response = {
                player_stats: {
                  victory: playerData.wins,
                  defeat: playerData.losses,
                  acc_level: playerData.account_level,
                  win_rate: playerData.win_rate,
                  time_played: playerData.total_time_played,
                  time_on_fire: playerData.average_time_on_fire,
                },
                team_stats: {
                  solo_win: playerData.stack_one_wins,
                  solo_defeat: playerData.stack_one_losses,
                  solo_wr: playerData.stack_one_win_rate,
                  two_win: playerData.stack_two_wins,
                  two_defeat: playerData.stack_two_losses,
                  two_wr: playerData.stack_two_win_rate,
                  three_win: playerData.stack_three_wins,
                  three_defeat: playerData.stack_three_losses,
                  three_wr: playerData.stack_three_win_rate,
                  four_win: playerData.stack_four_wins,
                  four_defeat: playerData.stack_four_losses,
                  four_wr: playerData.stack_four_win_rate,
                  five_win: playerData.stack_five_wins,
                  five_defeat: playerData.stack_five_losses,
                  five_wr: playerData.stack_five_win_rate,
                },
                heroes_stats: {
                  highest_wr: [
                    {
                      hero_name:
                        playerData.heroes_three_highest_win_rate[0].hero.name,
                      hero_win:
                        playerData.heroes_three_highest_win_rate[0].wins,
                      hero_defeat:
                        playerData.heroes_three_highest_win_rate[0].losses,
                      hero_wr:
                        playerData.heroes_three_highest_win_rate[0].win_rate,
                      hero_played:
                        playerData.heroes_three_highest_win_rate[0]
                          .games_played,
                    },
                    {
                      hero_name:
                        playerData.heroes_three_highest_win_rate[1].hero.name,
                      hero_win:
                        playerData.heroes_three_highest_win_rate[1].wins,
                      hero_defeat:
                        playerData.heroes_three_highest_win_rate[1].losses,
                      hero_wr:
                        playerData.heroes_three_highest_win_rate[1].win_rate,
                      hero_played:
                        playerData.heroes_three_highest_win_rate[1]
                          .games_played,
                    },
                    {
                      hero_name:
                        playerData.heroes_three_highest_win_rate[2].hero.name,
                      hero_win:
                        playerData.heroes_three_highest_win_rate[2].wins,
                      hero_defeat:
                        playerData.heroes_three_highest_win_rate[2].losses,
                      hero_wr:
                        playerData.heroes_three_highest_win_rate[2].win_rate,
                      hero_played:
                        playerData.heroes_three_highest_win_rate[2]
                          .games_played,
                    },
                  ],
                  most_played: [
                    {
                      hero_name:
                        playerData.heroes_three_most_played[0].hero.name,
                      hero_win: playerData.heroes_three_most_played[0].wins,
                      hero_defeat:
                        playerData.heroes_three_most_played[0].losses,
                      hero_wr: playerData.heroes_three_most_played[0].win_rate,
                      hero_played:
                        playerData.heroes_three_most_played[0].games_played,
                    },
                    {
                      hero_name:
                        playerData.heroes_three_most_played[1].hero.name,
                      hero_win: playerData.heroes_three_most_played[1].wins,
                      hero_defeat:
                        playerData.heroes_three_most_played[1].losses,
                      hero_wr: playerData.heroes_three_most_played[1].win_rate,
                      hero_played:
                        playerData.heroes_three_most_played[1].games_played,
                    },
                    {
                      hero_name:
                        playerData.heroes_three_most_played[2].hero.name,
                      hero_win: playerData.heroes_three_most_played[2].wins,
                      hero_defeat:
                        playerData.heroes_three_most_played[2].losses,
                      hero_wr: playerData.heroes_three_most_played[2].win_rate,
                      hero_played:
                        playerData.heroes_three_most_played[2].games_played,
                    },
                  ],
                  latest_played: [
                    {
                      hero_name:
                        playerData.heroes_three_latest_played[0].hero.name,
                      hero_win: playerData.heroes_three_latest_played[0].wins,
                      hero_defeat:
                        playerData.heroes_three_latest_played[0].losses,
                      hero_wr:
                        playerData.heroes_three_latest_played[0].win_rate,
                      hero_played:
                        playerData.heroes_three_latest_played[0].games_played,
                    },
                    {
                      hero_name:
                        playerData.heroes_three_latest_played[1].hero.name,
                      hero_win: playerData.heroes_three_latest_played[1].wins,
                      hero_defeat:
                        playerData.heroes_three_latest_played[1].losses,
                      hero_wr:
                        playerData.heroes_three_latest_played[1].win_rate,
                      hero_played:
                        playerData.heroes_three_latest_played[1].games_played,
                    },
                    {
                      hero_name:
                        playerData.heroes_three_latest_played[2].hero.name,
                      hero_win: playerData.heroes_three_latest_played[2].wins,
                      hero_defeat:
                        playerData.heroes_three_latest_played[2].losses,
                      hero_wr:
                        playerData.heroes_three_latest_played[2].win_rate,
                      hero_played:
                        playerData.heroes_three_latest_played[2].games_played,
                    },
                  ],
                },
                maps_stats: {
                  highest_wr: [
                    {
                      map_name:
                        playerData.maps_three_highest_win_rate[0].game_map.name,
                      map_win: playerData.maps_three_highest_win_rate[0].wins,
                      map_defeat:
                        playerData.maps_three_highest_win_rate[0].losses,
                      map_wr:
                        playerData.maps_three_highest_win_rate[0].win_rate,
                      map_played:
                        playerData.maps_three_highest_win_rate[0].games_played,
                    },
                    {
                      map_name:
                        playerData.maps_three_highest_win_rate[1].game_map.name,
                      map_win: playerData.maps_three_highest_win_rate[1].wins,
                      map_defeat:
                        playerData.maps_three_highest_win_rate[1].losses,
                      map_wr:
                        playerData.maps_three_highest_win_rate[1].win_rate,
                      map_played:
                        playerData.maps_three_highest_win_rate[1].games_played,
                    },
                    {
                      map_name:
                        playerData.maps_three_highest_win_rate[2].game_map.name,
                      map_win: playerData.maps_three_highest_win_rate[2].wins,
                      map_defeat:
                        playerData.maps_three_highest_win_rate[2].losses,
                      map_wr:
                        playerData.maps_three_highest_win_rate[2].win_rate,
                      map_played:
                        playerData.maps_three_highest_win_rate[2].games_played,
                    },
                  ],
                  most_played: [
                    {
                      map_name:
                        playerData.maps_three_most_played[0].game_map.name,
                      map_win: playerData.maps_three_most_played[0].wins,
                      map_defeat: playerData.maps_three_most_played[0].losses,
                      map_wr: playerData.maps_three_most_played[0].win_rate,
                      map_played:
                        playerData.maps_three_most_played[0].games_played,
                    },
                    {
                      map_name:
                        playerData.maps_three_most_played[1].game_map.name,
                      map_win: playerData.maps_three_most_played[1].wins,
                      map_defeat: playerData.maps_three_most_played[1].losses,
                      map_wr: playerData.maps_three_most_played[1].win_rate,
                      map_played:
                        playerData.maps_three_most_played[1].games_played,
                    },
                    {
                      map_name:
                        playerData.maps_three_most_played[2].game_map.name,
                      map_win: playerData.maps_three_most_played[2].wins,
                      map_defeat: playerData.maps_three_most_played[2].losses,
                      map_wr: playerData.maps_three_most_played[2].win_rate,
                      map_played:
                        playerData.maps_three_most_played[2].games_played,
                    },
                  ],
                  latest_played: [
                    {
                      map_name:
                        playerData.maps_three_latest_played[0].game_map.name,
                      map_win: playerData.maps_three_latest_played[0].wins,
                      map_defeat: playerData.maps_three_latest_played[0].losses,
                      map_wr: playerData.maps_three_latest_played[0].win_rate,
                      map_played:
                        playerData.maps_three_latest_played[0].games_played,
                    },
                    {
                      map_name:
                        playerData.maps_three_latest_played[1].game_map.name,
                      map_win: playerData.maps_three_latest_played[1].wins,
                      map_defeat: playerData.maps_three_latest_played[1].losses,
                      map_wr: playerData.maps_three_latest_played[1].win_rate,
                      map_played:
                        playerData.maps_three_latest_played[1].games_played,
                    },
                    {
                      map_name:
                        playerData.maps_three_latest_played[2].game_map.name,
                      map_win: playerData.maps_three_latest_played[2].wins,
                      map_defeat: playerData.maps_three_latest_played[2].losses,
                      map_wr: playerData.maps_three_latest_played[2].win_rate,
                      map_played:
                        playerData.maps_three_latest_played[2].games_played,
                    },
                  ],
                },
                history: {
                  first_match: {
                    replay_id: playerData.matchData[0]?.replayID,
                    game_type: playerData.matchData[0]?.game_type?.name || null,
                    game_date: playerData.matchData[0]?.game_date || null,
                    game_map_name:
                      playerData.matchData[0]?.game_map?.name || null,
                    game_victory: playerData.matchData[0]?.winner || null,
                    game_hero: playerData.matchData[0]?.hero?.name || null,
                    game_hero_build: {
                      level_one: {
                        talent_name:
                          playerData.matchData[0]?.level_one?.title || null,
                        talent_description:
                          playerData.matchData[0]?.level_one?.description ||
                          null,
                        talent_icon: playerData.matchData[0]?.level_one?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_one.icon}`
                          : null,
                      },
                      level_four: {
                        talent_name:
                          playerData.matchData[0]?.level_four?.title || null,
                        talent_description:
                          playerData.matchData[0]?.level_four?.description ||
                          null,
                        talent_icon: playerData.matchData[0]?.level_four?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_four.icon}`
                          : null,
                      },
                      level_seven: {
                        talent_name:
                          playerData.matchData[0]?.level_seven?.title || null,
                        talent_description:
                          playerData.matchData[0]?.level_seven?.description ||
                          null,
                        talent_icon: playerData.matchData[0]?.level_seven?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_seven.icon}`
                          : null,
                      },
                      level_ten: {
                        talent_name:
                          playerData.matchData[0]?.level_ten?.title || null,
                        talent_description:
                          playerData.matchData[0]?.level_ten?.description ||
                          null,
                        talent_icon: playerData.matchData[0]?.level_ten?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_ten.icon}`
                          : null,
                      },
                      level_thirteen: {
                        talent_name:
                          playerData.matchData[0]?.level_thirteen?.title ||
                          null,
                        talent_description:
                          playerData.matchData[0]?.level_thirteen
                            ?.description || null,
                        talent_icon: playerData.matchData[0]?.level_thirteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_thirteen.icon}`
                          : null,
                      },
                      level_sixteen: {
                        talent_name:
                          playerData.matchData[0]?.level_sixteen?.title || null,
                        talent_description:
                          playerData.matchData[0]?.level_sixteen?.description ||
                          null,
                        talent_icon: playerData.matchData[0]?.level_sixteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_sixteen.icon}`
                          : null,
                      },
                      level_twenty: {
                        talent_name:
                          playerData.matchData[0]?.level_twenty?.title || null,
                        talent_description:
                          playerData.matchData[0]?.level_twenty?.description ||
                          null,
                        talent_icon: playerData.matchData[0]?.level_twenty?.icon
                          ? `${BLOB_URL}/${playerData.matchData[0].level_twenty.icon}`
                          : null,
                      },
                    },
                    game_player_mmr:
                      playerData.matchData[0]?.player_mmr || null,
                    game_hero_mmr: playerData.matchData[0]?.hero_mmr || null,
                  },

                  second_match: {
                    replay_id: playerData.matchData[1]?.replayID,
                    game_type: playerData.matchData[1]?.game_type?.name || null,
                    game_date: playerData.matchData[1]?.game_date || null,
                    game_map_name:
                      playerData.matchData[1]?.game_map?.name || null,
                    game_victory: playerData.matchData[1]?.winner || null,
                    game_hero: playerData.matchData[1]?.hero?.name || null,
                    game_hero_build: {
                      level_one: {
                        talent_name:
                          playerData.matchData[1]?.level_one?.title || null,
                        talent_description:
                          playerData.matchData[1]?.level_one?.description ||
                          null,
                        talent_icon: playerData.matchData[1]?.level_one?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_one.icon}`
                          : null,
                      },
                      level_four: {
                        talent_name:
                          playerData.matchData[1]?.level_four?.title || null,
                        talent_description:
                          playerData.matchData[1]?.level_four?.description ||
                          null,
                        talent_icon: playerData.matchData[1]?.level_four?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_four.icon}`
                          : null,
                      },
                      level_seven: {
                        talent_name:
                          playerData.matchData[1]?.level_seven?.title || null,
                        talent_description:
                          playerData.matchData[1]?.level_seven?.description ||
                          null,
                        talent_icon: playerData.matchData[1]?.level_seven?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_seven.icon}`
                          : null,
                      },
                      level_ten: {
                        talent_name:
                          playerData.matchData[1]?.level_ten?.title || null,
                        talent_description:
                          playerData.matchData[1]?.level_ten?.description ||
                          null,
                        talent_icon: playerData.matchData[1]?.level_ten?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_ten.icon}`
                          : null,
                      },
                      level_thirteen: {
                        talent_name:
                          playerData.matchData[1]?.level_thirteen?.title ||
                          null,
                        talent_description:
                          playerData.matchData[1]?.level_thirteen
                            ?.description || null,
                        talent_icon: playerData.matchData[1]?.level_thirteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_thirteen.icon}`
                          : null,
                      },
                      level_sixteen: {
                        talent_name:
                          playerData.matchData[1]?.level_sixteen?.title || null,
                        talent_description:
                          playerData.matchData[1]?.level_sixteen?.description ||
                          null,
                        talent_icon: playerData.matchData[1]?.level_sixteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_sixteen.icon}`
                          : null,
                      },
                      level_twenty: {
                        talent_name:
                          playerData.matchData[1]?.level_twenty?.title || null,
                        talent_description:
                          playerData.matchData[1]?.level_twenty?.description ||
                          null,
                        talent_icon: playerData.matchData[1]?.level_twenty?.icon
                          ? `${BLOB_URL}/${playerData.matchData[1].level_twenty.icon}`
                          : null,
                      },
                    },
                    game_player_mmr:
                      playerData.matchData[1]?.player_mmr || null,
                    game_hero_mmr: playerData.matchData[1]?.hero_mmr || null,
                  },

                  third_match: {
                    replay_id: playerData.matchData[2]?.replayID,
                    game_type: playerData.matchData[2]?.game_type?.name || null,
                    game_date: playerData.matchData[2]?.game_date || null,
                    game_map_name:
                      playerData.matchData[2]?.game_map?.name || null,
                    game_victory: playerData.matchData[2]?.winner || null,
                    game_hero: playerData.matchData[2]?.hero?.name || null,
                    game_hero_build: {
                      level_one: {
                        talent_name:
                          playerData.matchData[2]?.level_one?.title || null,
                        talent_description:
                          playerData.matchData[2]?.level_one?.description ||
                          null,
                        talent_icon: playerData.matchData[2]?.level_one?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_one.icon}`
                          : null,
                      },
                      level_four: {
                        talent_name:
                          playerData.matchData[2]?.level_four?.title || null,
                        talent_description:
                          playerData.matchData[2]?.level_four?.description ||
                          null,
                        talent_icon: playerData.matchData[2]?.level_four?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_four.icon}`
                          : null,
                      },
                      level_seven: {
                        talent_name:
                          playerData.matchData[2]?.level_seven?.title || null,
                        talent_description:
                          playerData.matchData[2]?.level_seven?.description ||
                          null,
                        talent_icon: playerData.matchData[2]?.level_seven?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_seven.icon}`
                          : null,
                      },
                      level_ten: {
                        talent_name:
                          playerData.matchData[2]?.level_ten?.title || null,
                        talent_description:
                          playerData.matchData[2]?.level_ten?.description ||
                          null,
                        talent_icon: playerData.matchData[2]?.level_ten?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_ten.icon}`
                          : null,
                      },
                      level_thirteen: {
                        talent_name:
                          playerData.matchData[2]?.level_thirteen?.title ||
                          null,
                        talent_description:
                          playerData.matchData[2]?.level_thirteen
                            ?.description || null,
                        talent_icon: playerData.matchData[2]?.level_thirteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_thirteen.icon}`
                          : null,
                      },
                      level_sixteen: {
                        talent_name:
                          playerData.matchData[2]?.level_sixteen?.title || null,
                        talent_description:
                          playerData.matchData[2]?.level_sixteen?.description ||
                          null,
                        talent_icon: playerData.matchData[2]?.level_sixteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_sixteen.icon}`
                          : null,
                      },
                      level_twenty: {
                        talent_name:
                          playerData.matchData[2]?.level_twenty?.title || null,
                        talent_description:
                          playerData.matchData[2]?.level_twenty?.description ||
                          null,
                        talent_icon: playerData.matchData[2]?.level_twenty?.icon
                          ? `${BLOB_URL}/${playerData.matchData[2].level_twenty.icon}`
                          : null,
                      },
                    },
                    game_player_mmr:
                      playerData.matchData[2]?.player_mmr || null,
                    game_hero_mmr: playerData.matchData[2]?.hero_mmr || null,
                  },

                  fourth_match: {
                    replay_id: playerData.matchData[3]?.replayID,
                    game_type: playerData.matchData[3]?.game_type?.name || null,
                    game_date: playerData.matchData[3]?.game_date || null,
                    game_map_name:
                      playerData.matchData[3]?.game_map?.name || null,
                    game_victory: playerData.matchData[3]?.winner || null,
                    game_hero: playerData.matchData[3]?.hero?.name || null,
                    game_hero_build: {
                      level_one: {
                        talent_name:
                          playerData.matchData[3]?.level_one?.title || null,
                        talent_description:
                          playerData.matchData[3]?.level_one?.description ||
                          null,
                        talent_icon: playerData.matchData[3]?.level_one?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_one.icon}`
                          : null,
                      },
                      level_four: {
                        talent_name:
                          playerData.matchData[3]?.level_four?.title || null,
                        talent_description:
                          playerData.matchData[3]?.level_four?.description ||
                          null,
                        talent_icon: playerData.matchData[3]?.level_four?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_four.icon}`
                          : null,
                      },
                      level_seven: {
                        talent_name:
                          playerData.matchData[3]?.level_seven?.title || null,
                        talent_description:
                          playerData.matchData[3]?.level_seven?.description ||
                          null,
                        talent_icon: playerData.matchData[3]?.level_seven?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_seven.icon}`
                          : null,
                      },
                      level_ten: {
                        talent_name:
                          playerData.matchData[3]?.level_ten?.title || null,
                        talent_description:
                          playerData.matchData[3]?.level_ten?.description ||
                          null,
                        talent_icon: playerData.matchData[3]?.level_ten?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_ten.icon}`
                          : null,
                      },
                      level_thirteen: {
                        talent_name:
                          playerData.matchData[3]?.level_thirteen?.title ||
                          null,
                        talent_description:
                          playerData.matchData[3]?.level_thirteen
                            ?.description || null,
                        talent_icon: playerData.matchData[3]?.level_thirteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_thirteen.icon}`
                          : null,
                      },
                      level_sixteen: {
                        talent_name:
                          playerData.matchData[3]?.level_sixteen?.title || null,
                        talent_description:
                          playerData.matchData[3]?.level_sixteen?.description ||
                          null,
                        talent_icon: playerData.matchData[3]?.level_sixteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_sixteen.icon}`
                          : null,
                      },
                      level_twenty: {
                        talent_name:
                          playerData.matchData[3]?.level_twenty?.title || null,
                        talent_description:
                          playerData.matchData[3]?.level_twenty?.description ||
                          null,
                        talent_icon: playerData.matchData[3]?.level_twenty?.icon
                          ? `${BLOB_URL}/${playerData.matchData[3].level_twenty.icon}`
                          : null,
                      },
                    },
                    game_player_mmr:
                      playerData.matchData[3]?.player_mmr || null,
                    game_hero_mmr: playerData.matchData[3]?.hero_mmr || null,
                  },

                  fifth_match: {
                    replay_id: playerData.matchData[4]?.replayID,
                    game_type: playerData.matchData[4]?.game_type?.name || null,
                    game_date: playerData.matchData[4]?.game_date || null,
                    game_map_name:
                      playerData.matchData[4]?.game_map?.name || null,
                    game_victory: playerData.matchData[4]?.winner || null,
                    game_hero: playerData.matchData[4]?.hero?.name || null,
                    game_hero_build: {
                      level_one: {
                        talent_name:
                          playerData.matchData[4]?.level_one?.title || null,
                        talent_description:
                          playerData.matchData[4]?.level_one?.description ||
                          null,
                        talent_icon: playerData.matchData[4]?.level_one?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_one.icon}`
                          : null,
                      },
                      level_four: {
                        talent_name:
                          playerData.matchData[4]?.level_four?.title || null,
                        talent_description:
                          playerData.matchData[4]?.level_four?.description ||
                          null,
                        talent_icon: playerData.matchData[4]?.level_four?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_four.icon}`
                          : null,
                      },
                      level_seven: {
                        talent_name:
                          playerData.matchData[4]?.level_seven?.title || null,
                        talent_description:
                          playerData.matchData[4]?.level_seven?.description ||
                          null,
                        talent_icon: playerData.matchData[4]?.level_seven?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_seven.icon}`
                          : null,
                      },
                      level_ten: {
                        talent_name:
                          playerData.matchData[4]?.level_ten?.title || null,
                        talent_description:
                          playerData.matchData[4]?.level_ten?.description ||
                          null,
                        talent_icon: playerData.matchData[4]?.level_ten?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_ten.icon}`
                          : null,
                      },
                      level_thirteen: {
                        talent_name:
                          playerData.matchData[4]?.level_thirteen?.title ||
                          null,
                        talent_description:
                          playerData.matchData[4]?.level_thirteen
                            ?.description || null,
                        talent_icon: playerData.matchData[4]?.level_thirteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_thirteen.icon}`
                          : null,
                      },
                      level_sixteen: {
                        talent_name:
                          playerData.matchData[4]?.level_sixteen?.title || null,
                        talent_description:
                          playerData.matchData[4]?.level_sixteen?.description ||
                          null,
                        talent_icon: playerData.matchData[4]?.level_sixteen
                          ?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_sixteen.icon}`
                          : null,
                      },
                      level_twenty: {
                        talent_name:
                          playerData.matchData[4]?.level_twenty?.title || null,
                        talent_description:
                          playerData.matchData[4]?.level_twenty?.description ||
                          null,
                        talent_icon: playerData.matchData[4]?.level_twenty?.icon
                          ? `${BLOB_URL}/${playerData.matchData[4].level_twenty.icon}`
                          : null,
                      },
                    },
                    game_player_mmr:
                      playerData.matchData[4]?.player_mmr || null,
                    game_hero_mmr: playerData.matchData[4]?.hero_mmr || null,
                  },
                },
              };

              generateCardHtml(response, battletag);

              playerButton.innerHTML = "Ocultar datos";
              playerButton.removeAttribute("disabled");
              playerButton.onclick = (e) => {
                let content = document.getElementById(
                  `${battletag}_player_details`
                );
                let text = playerButton.innerHTML;

                if (text === "Ocultar datos") {
                  content.style.display = "none";
                  playerButton.innerHTML = "Mostrar datos";
                } else {
                  content.style.display = "block";
                  playerButton.innerHTML = "Ocultar datos";
                }
              };

              console.log(response);
              resolve(response);
            });
        })
        .catch((error) => {
          reject(error);
          console.error("Error:", error);
        });
    });
  }
}

function generateCardHtml(data, username) {
  let cardHTML = `<div class="player-card">
                  <div class="player-container">
                    <div class="player-content d-flex flex-column justify-content-between">
                      <div class="player-stats">
                        <h2>${username}</h2>
                        <h4>Lv. ${data.player_stats.acc_level}</h4>
                        <h4>
                          <span class="badge bg-black bg-opacity-50">V: ${data.player_stats.victory}</span>
                          <span class="badge bg-black bg-opacity-50">D: ${data.player_stats.defeat}</span>
                          <span class="badge bg-black bg-opacity-50">WR: ${data.player_stats.win_rate}%</span>
                        </h4>
                      </div>
                      <div class="team-container">
                        <div class="team-header">
                          <span>Equipos</span>
                        </div>
                        <div class="team-body d-flex mb-3 gap-2">
                          <div class="team-title">
                            <p>1 - </p>
                            <p>2 - </p>
                            <p>3 - </p>
                            <p>4 - </p>
                            <p>5 - </p>
                          </div>
                          <div class="team-data">
                            <div class="progress w-100">
                              <div class="progress-bar bg-success" role="progressbar" aria-label="Example with label"
                                style="width: ${data.team_stats.solo_wr}%;" aria-valuenow="${data.team_stats.solo_wr}" aria-valuemin="0" aria-valuemax="100">${data.team_stats.solo_wr}%</div>
                            </div>
                            <div class="progress w-100">
                              <div class="progress-bar bg-success" role="progressbar" aria-label="Example with label"
                                style="width: ${data.team_stats.two_wr}%;" aria-valuenow="${data.team_stats.two_wr}" aria-valuemin="0" aria-valuemax="100">${data.team_stats.two_wr}%</div>
                            </div>
                            <div class="progress w-100">
                              <div class="progress-bar bg-success" role="progressbar" aria-label="Example with label"
                                style="width: ${data.team_stats.three_wr}%;" aria-valuenow="${data.team_stats.three_wr}" aria-valuemin="0" aria-valuemax="100">${data.team_stats.three_wr}%</div>
                            </div>
                            <div class="progress w-100">
                              <div class="progress-bar bg-success" role="progressbar" aria-label="Example with label"
                                style="width: ${data.team_stats.four_wr}%;" aria-valuenow="${data.team_stats.four_wr}" aria-valuemin="0" aria-valuemax="100">${data.team_stats.four_wr}%</div>
                            </div>
                            <div class="progress w-100">
                              <div class="progress-bar bg-success" role="progressbar" aria-label="Example with label"
                                style="width: ${data.team_stats.five_wr}%;" aria-valuenow="${data.team_stats.five_wr}" aria-valuemin="0" aria-valuemax="100">${data.team_stats.five_wr}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="player-content">
                      <div class="indicator-container">
                        <div class="indicator-content">
                          <div class="indicator-header">
                            <span>Heroes</span>
                          </div>
                          <div class="indicator-body mb-3">
                            <div class="indicator-title">
                              <p>Winrate</p>
                            </div>
                            <div class="indicator-data">`;

  data.heroes_stats.highest_wr.forEach((e) => {
    cardHTML += `
                              <button type="button"
                                class="btn w-auto rounded-circle btn-dark m-1 position-relative d-flex justify-content-center"
                                style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${
                                  e.hero_name
                                }"
                                data-bs-content="V: ${e.hero_win} | D: ${
      e.hero_defeat
    } | Total: ${e.hero_played}">
                                <img class="rounded-circle" width="38px"
                                  src="${window["objURLHero"][e.hero_name]}"
                                  alt="">
                                <span class="badge bg-transparent position-absolute">${
                                  e.hero_wr
                                }%</span>
                              </button>`;
  });

  cardHTML += `</div>
                </div>
                <div class="indicator-body mb-3">
                  <div class="indicator-title">
                    <p>Mayormente jugado</p>
                  </div>
                  <div class="indicator-data">`;

  data.heroes_stats.most_played.forEach((e) => {
    cardHTML += `
                              <button type="button"
                                class="btn w-auto rounded-circle btn-dark m-1 position-relative d-flex justify-content-center"
                                style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${
                                  e.hero_name
                                }"
                                data-bs-content="V: ${e.hero_win} | D: ${
      e.hero_defeat
    } | Total: ${e.hero_played}">
                                <img class="rounded-circle" width="38px"
                                  src="${window["objURLHero"][e.hero_name]}"
                                  alt="">
                                <span class="badge bg-transparent position-absolute">${
                                  e.hero_wr
                                }%</span>
                              </button>`;
  });

  cardHTML += `</div>
                          </div>
                          <div class="indicator-body mb-3">
                            <div class="indicator-title">
                              <p>Ultimamente jugado</p>
                            </div>
                            <div class="indicator-data">`;

  data.heroes_stats.latest_played.forEach((e) => {
    cardHTML += `
                              <button type="button"
                                class="btn w-auto rounded-circle btn-dark m-1 position-relative d-flex justify-content-center"
                                style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${
                                  e.hero_name
                                }"
                                data-bs-content="V: ${e.hero_win} | D: ${
      e.hero_defeat
    } | Total: ${e.hero_played}">
                                <img class="rounded-circle" width="38px"
                                  src="${window["objURLHero"][e.hero_name]}"
                                  alt="">
                                <span class="badge bg-transparent position-absolute">${
                                  e.hero_wr
                                }%</span>
                              </button>`;
  });

  cardHTML += `</div>
                          </div>
                        </div>
                        <div class="indicator-content">
                          <div class="indicator-header">
                            <span>Mapas</span>
                          </div>
                          <div class="indicator-body mb-3">
                            <div class="indicator-title">
                              <p>Winrate</p>
                            </div>
                            <div class="indicator-data">`;

  data.maps_stats.highest_wr.forEach((e) => {
    cardHTML += `
                              <button type="button"
                                class="btn w-auto rounded-circle btn-dark m-1 position-relative d-flex justify-content-center"
                                style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${
                                  e.map_name
                                }"
                                data-bs-content="V: ${e.map_win} | D: ${
      e.map_defeat
    } | Total: ${e.map_played}">
                                <img class="rounded-circle" width="38px"
                                  src="${
                                    window["objURLHero"][
                                      e.map_name.split(" ").join("_")
                                    ]
                                  }"
                                  alt="">
                                <span class="badge bg-transparent position-absolute">${
                                  e.map_wr
                                }%</span>
                              </button>`;
  });

  cardHTML += `</div>
                          </div>
                          <div class="indicator-body mb-3">
                            <div class="indicator-title">
                              <p>Mayormente jugado</p>
                            </div>
                            <div class="indicator-data">`;

  data.maps_stats.most_played.forEach((e) => {
    cardHTML += `
                              <button type="button"
                                class="btn w-auto rounded-circle btn-dark m-1 position-relative d-flex justify-content-center"
                                style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${
                                  e.map_name
                                }"
                                data-bs-content="V: ${e.map_win} | D: ${
      e.map_defeat
    } | Total: ${e.map_played}">
                                <img class="rounded-circle" width="38px"
                                  src="${
                                    window["objURLHero"][
                                      e.map_name.split(" ").join("_")
                                    ]
                                  }"
                                  alt="">
                                <span class="badge bg-transparent position-absolute">${
                                  e.map_wr
                                }%</span>
                              </button>`;
  });

  cardHTML += `</div>
                          </div>
                          <div class="indicator-body mb-3">
                            <div class="indicator-title">
                              <p>Ultimamente jugado</p>
                            </div>
                            <div class="indicator-data">`;

  data.maps_stats.latest_played.forEach((e) => {
    cardHTML += `
                              <button type="button"
                                class="btn w-auto rounded-circle btn-dark m-1 position-relative d-flex justify-content-center"
                                style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${
                                  e.map_name
                                }"
                                data-bs-content="V: ${e.map_win} | D: ${
      e.map_defeat
    } | Total: ${e.map_played}">
                                <img class="rounded-circle" width="38px"
                                  src="${
                                    window["objURLHero"][
                                      e.map_name.split(" ").join("_")
                                    ]
                                  }"
                                  alt="">
                                <span class="badge bg-transparent position-absolute">${
                                  e.map_wr
                                }%</span>
                              </button>`;
  });

  cardHTML += `</div>
                          </div>
                        </div>
                      </div>
                      <div class="time-container">
                        <div class="time-content">
                          <p>Tiempo jugado: ${data.player_stats.time_played}</p>
                          <p>Tiempo en pleno combate (Promedio): ${data.player_stats.time_on_fire}</p>
                        </div>
                      </div>
                    </div>
                    <div class="player-content">
                      <div class="history-container">`;

  for (const prop_level_1 in data.history) {
    let property_1 = data.history[prop_level_1];
    cardHTML += `
                        <div class="history-content">
                          <div class="map-name" style="background-image: url('${
                            window["objURLHero"][
                              property_1.game_map_name.split(" ").join("_")
                            ]
                          }')">
                            <div class="map-data text-end h-100 d-flex flex-column flex-wrap justify-content-end">
                              <p>${property_1.game_date}</p>
                              <p>${property_1.game_map_name} (${
      property_1.game_type
    })</p>
                              <div class="map-status" style="background-color: ${
                                property_1.game_victory == 1 ? "green" : "red"
                              }">
                              <div class="ms-3 mt-2 text-end">
                    <span class="badge border btn btn-outline-dark" onclick="getReplay('${
                      property_1.replay_id
                    }')"><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-download" viewBox="0 0 16 16">
                        <path
                          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path
                          d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                      </svg></span>
                  </div>
                              </div>
                            </div>
                          </div>
                          <div class="map-data">
                            <p>${
                              property_1.game_victory == 1
                                ? "VICTORIA"
                                : "DERROTA"
                            }</p>
                            <p>Heroe: ${property_1.game_hero}</p>
                            <div class="data-talent">
                              <p>Build:</p>
                              <div class="talent">
                        `;

    for (const prop_level_2 in property_1.game_hero_build) {
      let property_2 = property_1.game_hero_build[prop_level_2];
      if (property_2.talent_name == null) {
        break;
      }
      cardHTML += `
                                <button type="button" class="btn w-auto rounded-circle btn-dark m-1"
                                  style="padding: 2px;" data-bs-toggle="popover" data-bs-title="${property_2.talent_name}"
                                  data-bs-content="${property_2.talent_description}">
                                  <img class="rounded-circle" width="38px"
                                    src="${property_2.talent_icon}"
                                    alt="">
                                </button>`;
    }

    cardHTML += `
                        
                              </div>
                            </div>
                          </div>
                        </div>`;
  }

  cardHTML += `
                        
                              </div>
                            </div>
                          </div>
                        </div>`;

  document.getElementById(`${username}_player_details`).innerHTML = cardHTML;
  console.log(document.getElementById(`#${username}_player_details`));

  const parentElement = document.getElementById(`${username}_player_details`);
  const playerCard = parentElement.querySelector(".player-card");
  const playerContainer = playerCard.querySelector(".player-container");
  const playerContent = playerContainer.querySelector(".player-content");
  playerContent.style.backgroundImage = `url("${
    window["objURLHero"]["card-" + data.heroes_stats.most_played[0].hero_name]
  }")`;

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
}

function getReplay(replayId) {
  fetch(`${API_URL_2}/Replay/Download?replayID=${replayId}`)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${replayId}.StormReplay`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Error al descargar el archivo:", error));
}
