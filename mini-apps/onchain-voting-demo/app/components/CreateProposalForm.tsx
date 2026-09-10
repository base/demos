import React, { useState } from 'react';
import styles from './CreateProposalForm.module.css';

interface CreateProposalFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
}

export function CreateProposalForm({ onSubmit, onCancel }: CreateProposalFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(title.trim(), description.trim());
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>📝 Create New Proposal</h2>
          <p className={styles.subtitle}>
            Submit a governance proposal for community voting
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Proposal Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.input} ${errors.title ? styles.error : ''}`}
              placeholder="Enter a clear, concise title for your proposal"
              maxLength={100}
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
            <div className={styles.charCount}>
              {title.length}/100 characters
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Proposal Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
              placeholder="Describe your proposal in detail. Explain the problem, your solution, and expected impact."
              maxLength={500}
              rows={6}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
            <div className={styles.charCount}>
              {description.length}/500 characters
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.submitButton} ${(!title.trim() || !description.trim()) ? styles.disabled : ''}`}
              disabled={!title.trim() || !description.trim()}
            >
              📝 Create Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
