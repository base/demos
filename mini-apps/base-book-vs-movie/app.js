import { BrowserProvider, Contract, formatUnits } from 'https://esm.sh/ethers@6.13.4';

const CONFIG = {
  chainId: 8453,
  rpcUrl: 'https://mainnet.base.org',
  contractAddress: '0x407EacD1aAF2F46cC4079BFC4bef0c197A1FD6A8',
};

const CONTRACT_ABI = [
  'function vote(uint256 titleId, bool isBook) external',
  'function getVotes(uint256 titleId) external view returns (uint256 books, uint256 films)',
  'function canVote(uint256 titleId, address voter) external view returns (bool)',
  'function getAllVotes() external view returns (uint256[20] memory books, uint256[20] memory films)',
  'function balanceOf(address account) external view returns (uint256)',
];

const TITLES = [
  "Harry Potter Series", "The Lord of the Rings", "Dune", "Fight Club",
  "The Shining", "Schindler's List", "No Country for Old Men", "The Godfather",
  "A Clockwork Orange", "The Count of Monte Cristo", "Brave New World",
  "Perfume: The Story of a Murderer", "The Picture of Dorian Gray",
  "Anna Karenina", "The Great Gatsby", "The Reader", "Gone with the Wind",
  "All Quiet on the Western Front", "Forrest Gump", "The Handmaid's Tale"
];

const $ = (id) => document.getElementById(id);
const connectBtn = $('connect-btn');
const walletEl = $('wallet-address');
const balanceInfo = $('balance-info');
const csmBalance = $('csm-balance');
const statusEl = $('status');
const titlesContainer = $('titles-container');

let provider, signer, account, contract, ethProvider;

function setStatus(msg, type = '') {
  statusEl.textContent = msg;
  statusEl.className = `status${type ? ' ' + type : ''}`;
  setTimeout(() => {
    if (statusEl.textContent === msg) {
      statusEl.textContent = '';
      statusEl.className = 'status';
    }
  }, 5000);
}

function shortAddress(addr) {
  return addr.slice(0, 6) + '…' + addr.slice(-4);
}

async function getProvider() {
  // Try Farcaster SDK first
  try {
    const { sdk } = await import('https://esm.sh/@farcaster/miniapp-sdk@0.2.3');
    sdk.actions.ready().catch(() => {});
    const fp = await Promise.race([
      sdk.wallet.getEthereumProvider(),
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 3000))
    ]);
    if (fp && typeof fp.request === 'function') return fp;
  } catch {}

  // Fallback to MetaMask
  if (window.ethereum) return window.ethereum;
  throw new Error('No wallet found. Install MetaMask or open in Base App.');
}

async function connectWallet() {
  connectBtn.textContent = 'Connecting…';
  connectBtn.disabled = true;
  setStatus('Connecting…');

  try {
    ethProvider = await getProvider();

    let accounts = [];
    try { accounts = await ethProvider.request({ method: 'eth_accounts' }); } catch {}
    if (!accounts || accounts.length === 0) {
      accounts = await ethProvider.request({ method: 'eth_requestAccounts' });
    }
    if (!accounts || accounts.length === 0) throw new Error('No accounts found.');

    // Switch to Base
    try {
      const chainHex = await ethProvider.request({ method: 'eth_chainId' });
      if (parseInt(chainHex, 16) !== CONFIG.chainId) {
        try {
          await ethProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + CONFIG.chainId.toString(16) }]
          });
        } catch (e) {
          if (e.code === 4902) {
            await ethProvider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x' + CONFIG.chainId.toString(16),
                chainName: 'Base',
                nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
                rpcUrls: [CONFIG.rpcUrl],
                blockExplorerUrls: ['https://basescan.org']
              }]
            });
          }
        }
      }
    } catch {}

    provider = new BrowserProvider(ethProvider);
    signer = await provider.getSigner(accounts[0]);
    account = accounts[0];
    contract = new Contract(CONFIG.contractAddress, CONTRACT_ABI, signer);

    walletEl.hidden = false;
    walletEl.textContent = shortAddress(account);
    connectBtn.textContent = 'Connected';
    connectBtn.disabled = true;
    balanceInfo.hidden = false;

    await refreshBalance();
    await renderTitles();
    setStatus('Wallet connected on Base.', 'success');

  } catch (err) {
    setStatus(err?.code === 4001 ? 'Connection rejected.' : (err.message || 'Connection failed.'), 'error');
    connectBtn.textContent = 'Connect Wallet';
    connectBtn.disabled = false;
  }
}

async function refreshBalance() {
  if (!contract || !account) return;
  try {
    const raw = await contract.balanceOf(account);
    csmBalance.textContent = Number(formatUnits(raw, 18)).toLocaleString('en-US', { maximumFractionDigits: 0 });
  } catch {}
}

async function loadVoteData() {
  let allVotes = { books: Array(20).fill(0n), films: Array(20).fill(0n) };
  let canVoteList = Array(20).fill(true);

  try {
    const result = await contract.getAllVotes();
    allVotes = { books: result[0], films: result[1] };
  } catch {}

  try {
    canVoteList = await Promise.all(
      TITLES.map((_, i) => contract.canVote(i, account).catch(() => true))
    );
  } catch {}

  return { allVotes, canVoteList };
}

async function renderTitles() {
  if (!contract || !account) return;
  
  setStatus('Loading votes…');
  
  const { allVotes, canVoteList } = await loadVoteData();
  
  titlesContainer.innerHTML = '';

  TITLES.forEach((title, i) => {
    const books = Number(allVotes.books[i]);
    const films = Number(allVotes.films[i]);
    const total = books + films;
    const bookPct = total > 0 ? Math.round((books / total) * 100) : 50;
    const filmPct = 100 - bookPct;
    const canVoteNow = canVoteList[i];

    const card = document.createElement('div');
    card.className = 'title-card';
    card.innerHTML = `
      <div class="title-name">${title}</div>
      <div class="vote-buttons">
        <button class="vote-btn book" data-id="${i}" data-isbook="true" ${!canVoteNow ? 'disabled' : ''}>
          📚 Book ${canVoteNow ? '(+100 CSM)' : ''}
        </button>
        <button class="vote-btn film" data-id="${i}" data-isbook="false" ${!canVoteNow ? 'disabled' : ''}>
          🎬 Film ${canVoteNow ? '(+100 CSM)' : ''}
        </button>
      </div>
      <div class="vote-stats">
        <div class="stat">📚 <span>${bookPct}%</span>${books} votes</div>
        <div class="stat">🎬 <span>${filmPct}%</span>${films} votes</div>
      </div>
      ${!canVoteNow ? '<div class="voted-badge">✓ Voted today — come back tomorrow</div>' : ''}
    `;

    card.querySelectorAll('.vote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const titleId = parseInt(btn.dataset.id);
        const isBook = btn.dataset.isbook === 'true';
        void submitVote(titleId, isBook, card);
      });
    });

    titlesContainer.appendChild(card);
  });

  setStatus('');
}

async function submitVote(titleId, isBook, card) {
  if (!contract || !account) return;

  const btns = card.querySelectorAll('.vote-btn');
  btns.forEach(b => b.disabled = true);
  setStatus('Confirm the transaction in your wallet…');

  try {
    const tx = await contract.vote(titleId, isBook);
    setStatus('Waiting for confirmation…');
    await tx.wait();
    setStatus('Successfully voted! +100 CSM earned 🎉', 'success');
    
    // Update only this card
    try {
      const [books, films] = await contract.getVotes(titleId);
      const booksNum = Number(books);
      const filmsNum = Number(films);
      const total = booksNum + filmsNum;
      const bookPct = total > 0 ? Math.round((booksNum / total) * 100) : 50;
      const filmPct = 100 - bookPct;

      card.querySelector('.stat:first-child').innerHTML = `📚 <span>${bookPct}%</span>${booksNum} votes`;
      card.querySelector('.stat:last-child').innerHTML = `🎬 <span>${filmPct}%</span>${filmsNum} votes`;
      btns.forEach(b => b.disabled = true);
      
      const votedBadge = document.createElement('div');
      votedBadge.className = 'voted-badge';
      votedBadge.textContent = '✓ Voted today — come back tomorrow';
      card.appendChild(votedBadge);
    } catch {}

    await refreshBalance();

  } catch (err) {
    const msg = err.reason || err.message || 'Vote failed.';
    setStatus(msg, 'error');
    btns.forEach(b => b.disabled = false);
  }
}

connectBtn.addEventListener('click', connectWallet);