interface IMatches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string,
  },
  teamAway: {
    teamName: string,
  }
}

interface INewMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

interface IUpdate {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export { IMatches, INewMatch, IUpdate };
