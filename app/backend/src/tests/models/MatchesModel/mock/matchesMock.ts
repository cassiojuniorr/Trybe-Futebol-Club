import MatchesModel from "../../../../database/models/MatchesModel";

const allMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeam": 4,
    "homeTeamGoals": 3,
    "awayTeam": 11,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Corinthians"
    },
    "teamAway": {
      "teamName": "Napoli-SC"
    }
  }
] as unknown as MatchesModel[];

const newMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
} as unknown as MatchesModel;

const updateMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 9,
  awayTeam: 8,
  awayTeamGoals: 9,
  inProgress: true,
}

export { allMatches, newMatch, updateMatch };