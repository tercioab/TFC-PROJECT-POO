import ITable from '../interface/ITable';

export default class MatchesUtils {
  public sumMatches = (a: ITable, b: ITable | undefined) => {
    if (!b) {
      return a;
    }

    return {

      name: a.name,
      totalPoints: a.totalPoints + b.totalPoints,
      totalGames: a.totalGames + b.totalGames,
      totalVictories: a.totalVictories + b.totalVictories,
      totalDraws: a.totalDraws + b.totalDraws,
      totalLosses: a.totalLosses + b.totalLosses,
      goalsFavor: a.goalsFavor + b.goalsFavor,
      goalsOwn: a.goalsOwn + b.goalsOwn,
      goalsBalance: a.goalsBalance + b.goalsBalance,
      efficiency: (Number([(a.totalPoints + b.totalPoints)
            / ((a.totalGames + b.totalGames) * 3)]) * 100).toFixed(2),

    };
  };

  public orderMatches = (matches: ITable[]) => matches.sort((a, b) =>
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);
}
