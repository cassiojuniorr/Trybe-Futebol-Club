import TeamsModel from "../../../../database/models/TeamsModel";

const allTeamsMock = [
    {
        team_name: 'Avaí/Kindermann',
    },
    {
        team_name: 'Bahia',
    },
    {
        team_name: 'Botafogo',
    },
    {
        team_name: 'Corinthians',
    }
] as unknown as TeamsModel[];

const oneTeam = {   
    id: '1',
    team_name: 'Avaí/Kindermann',
} as unknown as TeamsModel;

const awayTeam = {   
    id: '2',
    team_name: 'blabal',
} as unknown as TeamsModel;


export { allTeamsMock, oneTeam, awayTeam };