import React, { useState } from 'react';
import styles from './ProposalCard.module.css';

interface Proposal {
  id: string;
  title: string;
  description: string;
  creator: string;
  createdAt: number;
  votingEndsAt: number;
  status: 'active' | 'passed' | 'failed' | 'executed';
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  userVote?: 'yes' | 'no' | 'abstain';
}

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (proposalId: string, vote: 'yes' | 'no' | 'abstain') => void;
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | 'abstain' | null>(null);
  const [showVoteForm, setShowVoteForm] = useState(false);

  const totalVotes = proposal.votes.yes + proposal.votes.no + proposal.votes.abstain;
  const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (proposal.votes.no / totalVotes) * 100 : 0;
  const abstainPercentage = totalVotes > 0 ? (proposal.votes.abstain / totalVotes) * 100 : 0;

  const timeLeft = proposal.votingEndsAt - Date.now();
  const isActive = proposal.status === 'active' && timeLeft > 0;

  const formatTimeLeft = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
  };

  const handleVoteSubmit = () => {
    if (selectedVote) {
      onVote(proposal.id, selectedVote);
      setShowVoteForm(false);
      setSelectedVote(null);
    }
  };

  const getStatusColor = () => {
    switch (proposal.status) {
      case 'active': return '#3b82f6';
      case 'passed': return '#10b981';
      case 'failed': return '#ef4444';
      case 'executed': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{proposal.title}</h3>
          <span
            className={styles.status}
            style={{ backgroundColor: getStatusColor() }}
          >
            {proposal.status.toUpperCase()}
          </span>
        </div>
        <div className={styles.meta}>
          <span className={styles.creator}>by {proposal.creator}</span>
          <span className={styles.time}>
            {isActive ? formatTimeLeft(timeLeft) : 'Voting ended'}
          </span>
        </div>
      </div>

      <p className={styles.description}>{proposal.description}</p>

      <div className={styles.results}>
        <div className={styles.voteBar}>
          <div
            className={`${styles.voteSegment} ${styles.yes}`}
            style={{ width: `${yesPercentage}%` }}
          >
            <span className={styles.voteLabel}>Yes ({proposal.votes.yes})</span>
          </div>
          <div
            className={`${styles.voteSegment} ${styles.no}`}
            style={{ width: `${noPercentage}%` }}
          >
            <span className={styles.voteLabel}>No ({proposal.votes.no})</span>
          </div>
          <div
            className={`${styles.voteSegment} ${styles.abstain}`}
            style={{ width: `${abstainPercentage}%` }}
          >
            <span className={styles.voteLabel}>Abstain ({proposal.votes.abstain})</span>
          </div>
        </div>

        <div className={styles.voteCounts}>
          <span>Yes: {proposal.votes.yes}</span>
          <span>No: {proposal.votes.no}</span>
          <span>Abstain: {proposal.votes.abstain}</span>
          <span>Total: {totalVotes}</span>
        </div>
      </div>

      {proposal.userVote && (
        <div className={styles.userVote}>
          Your vote: <strong>{proposal.userVote.toUpperCase()}</strong>
        </div>
      )}

      {isActive && (
        <div className={styles.actions}>
          {!showVoteForm ? (
            <button
              className={styles.voteButton}
              onClick={() => setShowVoteForm(true)}
            >
              🗳️ {proposal.userVote ? 'Change Vote' : 'Vote'}
            </button>
          ) : (
            <div className={styles.voteForm}>
              <div className={styles.voteOptions}>
                <button
                  className={`${styles.voteOption} ${selectedVote === 'yes' ? styles.selected : ''}`}
                  onClick={() => setSelectedVote('yes')}
                >
                  ✅ Yes
                </button>
                <button
                  className={`${styles.voteOption} ${selectedVote === 'no' ? styles.selected : ''}`}
                  onClick={() => setSelectedVote('no')}
                >
                  ❌ No
                </button>
                <button
                  className={`${styles.voteOption} ${selectedVote === 'abstain' ? styles.selected : ''}`}
                  onClick={() => setSelectedVote('abstain')}
                >
                  🤔 Abstain
                </button>
              </div>
              <div className={styles.formActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowVoteForm(false);
                    setSelectedVote(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`${styles.submitButton} ${!selectedVote ? styles.disabled : ''}`}
                  onClick={handleVoteSubmit}
                  disabled={!selectedVote}
                >
                  Submit Vote
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
