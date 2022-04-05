import { VFC } from 'react';
import { useTeamStats } from '../../hooks/useTeamStatsHook';
import { TeamResult } from '../../utils/resultData';
import TeamStatsOptionForm from './TeamStatsOptionForm';
import TeamStatsTable from './TeamStatsTable';

interface Props {
  result: TeamResult[];
  defaultNumberOfMatches: number;
}

const TeamStatsView: VFC<Props> = (props) => {
  const { stats, numberOfMatches, forForm } = useTeamStats(props);
  return (
    <>
      <h3 className="text-xl">チーム成績</h3>
      <TeamStatsOptionForm {...forForm}></TeamStatsOptionForm>
      <TeamStatsTable teams={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default TeamStatsView;
