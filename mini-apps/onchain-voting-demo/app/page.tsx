"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { ProposalCard } from "@/components/ProposalCard";
import { CreateProposalForm } from "@/components/CreateProposalForm";
import { VotingStats } from "@/components/VotingStats";
import styles from "./page.module.css";

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

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'all'>('active');

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }

    // Load proposals from localStorage or initialize with sample data
    const savedProposals = localStorage.getItem('voting-proposals');
    if (savedProposals) {
      setProposals(JSON.parse(savedProposals));
    } else {
      // Initialize with sample proposals
      const sampleProposals: Proposal[] = [
        {
          id: '1',
          title: 'Implement Quadratic Voting',
          description: 'Replace simple majority voting with quadratic voting to reduce the influence of large token holders and encourage broader participation.',
          creator: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          createdAt: Date.now() - 86400000, // 1 day ago
          votingEndsAt: Date.now() + 604800000, // 7 days from now
          status: 'active',
          votes: { yes: 12, no: 3, abstain: 2 }
        },
        {
          id: '2',
          title: 'Increase Protocol Fee to 3%',
          description: 'Raise the protocol fee from 2% to 3% to fund additional development and community initiatives.',
          creator: '0x8ba1f109551bD4328030126452c1b5fE8f4e3c0e',
          createdAt: Date.now() - 172800000, // 2 days ago
          votingEndsAt: Date.now() - 86400000, // Ended 1 day ago
          status: 'passed',
          votes: { yes: 18, no: 7, abstain: 1 }
        }
      ];
      setProposals(sampleProposals);
      localStorage.setItem('voting-proposals', JSON.stringify(sampleProposals));
    }
  }, [setFrameReady, isFrameReady]);

  // Save proposals to localStorage whenever they change
  useEffect(() => {
    if (proposals.length > 0) {
      localStorage.setItem('voting-proposals', JSON.stringify(proposals));
    }
  }, [proposals]);

  const handleVote = (proposalId: string, vote: 'yes' | 'no' | 'abstain') => {
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId) {
        // Remove previous vote if exists
        const prevVote = proposal.userVote;
        let newVotes = { ...proposal.votes };

        if (prevVote) {
          newVotes[prevVote]--;
        }

        // Add new vote
        newVotes[vote]++;

        return {
          ...proposal,
          votes: newVotes,
          userVote: vote
        };
      }
      return proposal;
    }));
  };

  const handleCreateProposal = (title: string, description: string) => {
    const newProposal: Proposal = {
      id: Date.now().toString(),
      title,
      description,
      creator: context?.user?.username || 'Anonymous',
      createdAt: Date.now(),
      votingEndsAt: Date.now() + 604800000, // 7 days
      status: 'active',
      votes: { yes: 0, no: 0, abstain: 0 }
    };

    setProposals(prev => [newProposal, ...prev]);
    setShowCreateForm(false);
  };

  // Filter proposals based on active tab
  const filteredProposals = proposals.filter(proposal =>
    activeTab === 'active' ? proposal.status === 'active' : true
  );

  // Calculate voting statistics
  const stats = {
    totalProposals: proposals.length,
    activeProposals: proposals.filter(p => p.status === 'active').length,
    totalVotes: proposals.reduce((sum, p) => sum + p.votes.yes + p.votes.no + p.votes.abstain, 0),
    passedProposals: proposals.filter(p => p.status === 'passed').length
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🗳️ Onchain Voting</h1>
        <p className={styles.subtitle}>
          Participate in decentralized governance on Base
        </p>
      </div>

      <VotingStats stats={stats} />

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'active' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Proposals ({stats.activeProposals})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Proposals ({stats.totalProposals})
        </button>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.createButton}
          onClick={() => setShowCreateForm(true)}
        >
          📝 Create Proposal
        </button>
      </div>

      {showCreateForm && (
        <CreateProposalForm
          onSubmit={handleCreateProposal}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <div className={styles.proposals}>
        {filteredProposals.length === 0 ? (
          <div className={styles.empty}>
            <p>No {activeTab === 'active' ? 'active' : ''} proposals found.</p>
            {activeTab === 'active' && (
              <button
                className={styles.createButton}
                onClick={() => setShowCreateForm(true)}
              >
                Create the first proposal
              </button>
            )}
          </div>
        ) : (
          filteredProposals.map(proposal => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={handleVote}
            />
          ))
        )}
      </div>
    </div>
  );
}
