import React from 'react';
import styles from './VotingStats.module.css';

interface VotingStatsProps {
  stats: {
    totalProposals: number;
    activeProposals: number;
    totalVotes: number;
    passedProposals: number;
  };
}

export function VotingStats({ stats }: VotingStatsProps) {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <div className={styles.value}>{stats.totalProposals}</div>
        <div className={styles.label}>Total Proposals</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.value}>{stats.activeProposals}</div>
        <div className={styles.label}>Active</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.value}>{stats.totalVotes}</div>
        <div className={styles.label}>Total Votes</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.value}>{stats.passedProposals}</div>
        <div className={styles.label}>Passed</div>
      </div>
    </div>
  );
}
