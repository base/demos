# Hangman Onchain Game - Project Scratchpad

## Background and Motivation

This project is building an onchain Hangman word-guessing game where players can:
- Play the classic Hangman game across different word categories
- Earn onchain rewards when they successfully guess words
- Compete on leaderboards
- Experience gasless transactions through Coinbase CDP (Coinbase Developer Platform) integration

The game is built using:
- **Next.js 14+ (App Router)** with TypeScript
- **TailwindCSS** for styling
- **Wagmi** for wallet management
- **Viem** for blockchain interactions
- **OnchainKit** for onchain-ready UI components
- **Coinbase CDP** for gasless transactions and account abstraction

The project was bootstrapped using `npm create onchain` which provides a developer-ready scaffold with all the necessary dependencies.

## Key Challenges and Analysis

### Technical Challenges Identified:

1. **Game State Management**: Currently, game state is managed locally within components. A centralized `GameStateProvider` would improve state management across the application.

2. **Onchain Integration**: The game needs to interact with smart contracts for:
   - Starting games (`startGame` function)
   - Recording wins (`recordReward` function via CDP account)
   - Claiming rewards (if applicable)

3. **Leaderboard System**: Need to implement Redis (Upstash) integration for persistent score tracking and leaderboard display.

4. **User Experience Flow**: Need dedicated `/fail` and `/win` pages for better UX when games end, rather than handling everything in the game screen.

5. **Score Calculation**: Currently using a hardcoded score (100). Need a proper scoring system based on:
   - Number of wrong guesses
   - Time taken
   - Hints used

### Current Implementation Status:

✅ **Completed:**
- Welcome screen (`/`) with wallet connection and game introduction
- Category selection page (`/category-select`) that loads categories from `wordCategories.json`
- Game screen (`/game/[category]`) with full game logic:
  - Word display with masked letters
  - Letter guessing system (A-Z keyboard)
  - Wrong guess tracking (max 3 attempts)
  - Win/loss detection
  - Hints system (progressive reveal)
  - Onchain win recording via `/api/win` endpoint
- `PlayButton` component for starting games with onchain transaction
- `/api/win` endpoint that records wins onchain using Coinbase CDP
- CDP integration for gasless transactions

❌ **Missing/Incomplete:**
- `/fail` page for game over screen
- `/win` page for dedicated win screen with claim options
- `GameStateProvider` for centralized state management
- Leaderboard system (Redis/Upstash integration)
- `/api/leaderboard` endpoint for score tracking
- Score calculation system
- `ScoreBoard` component for displaying leaderboards
- Proper score tracking (currently hardcoded to 100)
- Word progression system (next word after win)

## High-level Task Breakdown

### Phase 1: Complete Core Game Flow Pages
**Goal**: Add missing result pages to complete the basic game flow

#### Task 1.1: Create `/fail` Page
- **Description**: Create a dedicated page for when players lose the game
- **Success Criteria**:
  - Page displays at `/fail` route
  - Shows "You lost! Try again?" message
  - Has "Play Again" button that navigates to `/category-select`
  - Has "Back to Home" button that navigates to `/`
  - Matches the design style of other pages
- **Estimated Complexity**: Low
- **Dependencies**: None

#### Task 1.2: Create `/win` Page
- **Description**: Create a dedicated page for when players win, with claim reward functionality
- **Success Criteria**:
  - Page displays at `/win` route
  - Shows win message and score
  - Displays transaction hash if win was recorded onchain
  - Has "Next Word" button to continue playing
  - Has "Back to Home" button
  - Optionally shows claim reward button (if rewards are claimable)
- **Estimated Complexity**: Medium
- **Dependencies**: Task 1.1 (for consistency)

#### Task 1.3: Update Game Screen Navigation
- **Description**: Update the game screen to navigate to `/fail` or `/win` pages instead of showing results inline
- **Success Criteria**:
  - On loss, redirects to `/fail` page
  - On win, redirects to `/win` page with relevant game data
  - Passes necessary state (score, txHash, etc.) via URL params or state
- **Estimated Complexity**: Low
- **Dependencies**: Tasks 1.1 and 1.2

### Phase 2: Game State Management
**Goal**: Implement centralized state management for better code organization

#### Task 2.1: Create `GameStateProvider`
- **Description**: Create a React context provider for managing game state globally
- **Success Criteria**:
  - Context provides: selected category, current word, attempt count, score, game history
  - Provider wraps the application in `layout.tsx` or `providers.tsx`
  - State persists across navigation (or can be reset as needed)
  - TypeScript types are properly defined
- **Estimated Complexity**: Medium
- **Dependencies**: None

#### Task 2.2: Refactor Components to Use GameStateProvider
- **Description**: Update existing components to use the centralized state
- **Success Criteria**:
  - Game screen uses context instead of local state where appropriate
  - Category selection updates context
  - State is properly shared between components
  - No breaking changes to existing functionality
- **Estimated Complexity**: Medium
- **Dependencies**: Task 2.1

### Phase 3: Score System and Leaderboard
**Goal**: Implement proper scoring and leaderboard functionality

#### Task 3.1: Implement Score Calculation System
- **Description**: Create a scoring algorithm based on game performance
- **Success Criteria**:
  - Score calculation considers: wrong guesses (fewer = higher score), hints used (fewer = higher score), time taken (optional)
  - Score is calculated and stored when game is won
  - Score is displayed in game UI and win screen
- **Estimated Complexity**: Medium
- **Dependencies**: Task 2.1

#### Task 3.2: Set Up Redis/Upstash Integration
- **Description**: Configure Upstash Redis for leaderboard storage
- **Success Criteria**:
  - Redis client is configured in `lib/redis.ts`
  - Environment variables are documented
  - Connection is tested and working
- **Estimated Complexity**: Low
- **Dependencies**: None

#### Task 3.3: Create `/api/leaderboard` Endpoint
- **Description**: Create API route for leaderboard operations
- **Success Criteria**:
  - POST endpoint accepts `{ address, score }` and stores in Redis
  - GET endpoint returns top N players sorted by score
  - Proper error handling and validation
  - Returns data in format: `{ leaderboard: [{ address, score, rank }] }`
- **Estimated Complexity**: Medium
- **Dependencies**: Task 3.2

#### Task 3.4: Create `ScoreBoard` Component
- **Description**: Create a component to display the leaderboard
- **Success Criteria**:
  - Component fetches leaderboard data from API
  - Displays top players with ranks, addresses, and scores
  - Updates when new scores are submitted
  - Shows current player's rank if applicable
  - Responsive design matching app style
- **Estimated Complexity**: Medium
- **Dependencies**: Task 3.3

#### Task 3.5: Integrate Leaderboard into Home Page
- **Description**: Add leaderboard display to the welcome screen
- **Success Criteria**:
  - Leaderboard is displayed on home page
  - Updates automatically or has refresh button
  - Doesn't interfere with existing home page layout
- **Estimated Complexity**: Low
- **Dependencies**: Task 3.4

#### Task 3.6: Update Win API to Submit Scores
- **Description**: Modify `/api/win` to also submit score to leaderboard
- **Success Criteria**:
  - After recording win onchain, score is submitted to leaderboard
  - Error handling if leaderboard submission fails (shouldn't block onchain recording)
  - Score is properly calculated before submission
- **Estimated Complexity**: Low
- **Dependencies**: Task 3.1, Task 3.3

### Phase 4: UI/UX Enhancements
**Goal**: Polish the user experience and add missing features

#### Task 4.1: Improve Game Screen Visual Feedback
- **Description**: Enhance visual feedback for game state
- **Success Criteria**:
  - Better hangman visualization (SVG or ASCII art)
  - Animations for correct/wrong guesses
  - Better visual distinction between guessed and unguessed letters
  - Progress indicators
- **Estimated Complexity**: Medium
- **Dependencies**: None

#### Task 4.2: Add Word Progression System
- **Description**: Allow players to continue to next word in category after winning
- **Success Criteria**:
  - After winning, player can choose "Next Word" to continue in same category
  - Tracks which words have been played to avoid repeats (or allows repeats)
  - Maintains score across multiple words
- **Estimated Complexity**: Medium
- **Dependencies**: Task 2.1

#### Task 4.3: Add Loading States and Error Handling
- **Description**: Improve loading states and error messages throughout the app
- **Success Criteria**:
  - All async operations show loading states
  - Error messages are user-friendly
  - Network errors are handled gracefully
  - Transaction errors provide helpful feedback
- **Estimated Complexity**: Low
- **Dependencies**: None

### Phase 5: Testing and Polish
**Goal**: Ensure everything works correctly and is production-ready

#### Task 5.1: End-to-End Testing
- **Description**: Test the complete game flow from start to finish
- **Success Criteria**:
  - Complete game flow works: Home → Category → Game → Win/Fail → Navigation
  - Onchain transactions complete successfully
  - Leaderboard updates correctly
  - No console errors or warnings
- **Estimated Complexity**: Low
- **Dependencies**: All previous phases

#### Task 5.2: Code Review and Refactoring
- **Description**: Review code for best practices and refactor as needed
- **Success Criteria**:
  - Code follows TypeScript best practices
  - Components are properly organized
  - No duplicate code
  - Proper error boundaries
- **Estimated Complexity**: Medium
- **Dependencies**: All previous phases

## Project Status Board

### Current Sprint / Active Tasks

- [ ] **Task 1.1**: Create `/fail` Page
- [ ] **Task 1.2**: Create `/win` Page  
- [ ] **Task 1.3**: Update Game Screen Navigation

### Backlog / Pending Tasks

- [ ] **Task 2.1**: Create `GameStateProvider`
- [ ] **Task 2.2**: Refactor Components to Use GameStateProvider
- [ ] **Task 3.1**: Implement Score Calculation System
- [ ] **Task 3.2**: Set Up Redis/Upstash Integration
- [ ] **Task 3.3**: Create `/api/leaderboard` Endpoint
- [ ] **Task 3.4**: Create `ScoreBoard` Component
- [ ] **Task 3.5**: Integrate Leaderboard into Home Page
- [ ] **Task 3.6**: Update Win API to Submit Scores
- [ ] **Task 4.1**: Improve Game Screen Visual Feedback
- [ ] **Task 4.2**: Add Word Progression System
- [ ] **Task 4.3**: Add Loading States and Error Handling
- [ ] **Task 5.1**: End-to-End Testing
- [ ] **Task 5.2**: Code Review and Refactoring

### Completed Tasks

- [x] Welcome screen with wallet connection
- [x] Category selection page
- [x] Game screen with full game logic
- [x] Onchain win recording via `/api/win` endpoint
- [x] `PlayButton` component for starting games
- [x] CDP integration for gasless transactions

## Current Status / Progress Tracking

### Last Updated: [Current Date]

**Current Phase**: Phase 1 - Complete Core Game Flow Pages

**Recent Progress**:
- Core game functionality is implemented and working
- Players can select categories, play games, and have wins recorded onchain
- Basic game flow is functional but missing dedicated result pages

**Current Blocker**: None

**Next Steps**:
1. Create `/fail` page for game over scenarios
2. Create `/win` page for win scenarios with better UX
3. Update game screen to navigate to these pages instead of showing results inline

## Executor's Feedback or Assistance Requests

*This section will be updated by the Executor as tasks are completed or blockers are encountered.*

**Current Requests**: None

**Completed Milestones**: 
- Basic game flow is working
- Onchain integration is functional

## Lessons

### User Specified Lessons
- Include info useful for debugging in the program output
- Read the file before you try to edit it
- If there are vulnerabilities that appear in the terminal, run npm audit before proceeding
- Always ask before using the -force git command

### Project-Specific Lessons
- The game uses Coinbase CDP for gasless transactions via the `/api/win` endpoint
- Game contract address: `0x9a68a6af680e33c59b7e1c34ecc8bbedf6b5b75b` (hardcoded in win route)
- Word categories are loaded from `/public/wordCategories.json`
- The game currently uses a hardcoded score of 100 - this needs to be replaced with a proper scoring system
- CDP environment variables required: `CDP_API_KEY_ID`, `CDP_API_KEY_SECRET`, `CDP_WALLET_SECRET`, `CDP_SIGNER_ADDRESS`, `GAME_CONTRACT_ADDRESS_SEPOLIA`

## Notes and Observations

- The game screen currently handles win/loss states inline, but the plan calls for dedicated `/fail` and `/win` pages for better UX
- Score calculation is not yet implemented - currently hardcoded to 100
- Leaderboard system is planned but not yet implemented
- The `PlayButton` component successfully integrates with smart contracts using wagmi's `useSendCalls` hook
- CDP integration is working for recording wins onchain without requiring user gas

---

**Document Status**: Active Planning Phase
**Last Reviewed By**: Planner
**Next Review**: After Phase 1 completion

