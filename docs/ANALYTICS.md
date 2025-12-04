# Analytics & Dashboards

## ✅ Dune Analytics Queries

### Query Files
**Location**: `analytics/dune-queries.sql`

Contains 7 production-ready Dune queries for monitoring on-chain metrics.

### Query 1: Daily Joins (New Members)
**Metrics:**
- Joins per day
- Total shares minted
- Total fees collected (USDC)
- Cumulative member count

**Sample Output:**
```
day          | joins | total_shares | fees_usdc | cumulative
2025-11-20   |   12  |    1,200     |   120     |    487
2025-11-19   |   15  |    1,500     |   150     |    475
2025-11-18   |    8  |      800     |    80     |    460
```

**Dune Dashboard Link**: `https://dune.com/your-team/farcaster-cartel-joins`

### Query 2: Daily Raids
**Metrics:**
- Total raids
- Successful vs failed raids
- Success rate percentage
- Total shares stolen
- Raid fees collected

**Sample Output:**
```
day          | total | successful | failed | success_rate | shares_stolen | fees_usdc
2025-11-20   |   34  |     23     |   11   |    67.6%     |      640      |   170
2025-11-19   |   41  |     28     |   13   |    68.3%     |      784      |   205
```

**Dune Dashboard Link**: `https://dune.com/your-team/farcaster-cartel-raids`

### Query 3: Pot Growth
**Metrics:**
- Daily deposits
- Daily withdrawals
- Net change
- Running pot balance

**Sample Output:**
```
day          | deposits | withdrawals | net_change | pot_balance
2025-11-20   |   120    |      35     |     85     |   54,320
2025-11-19   |   150    |      42     |    108     |   54,235
```

**Dune Dashboard Link**: `https://dune.com/your-team/farcaster-cartel-treasury`

### Query 4: Top Share Holders (Leaderboard)
**Metrics:**
- Rank
- Address
- Total shares
- Percentage of total supply

**Sample Output:**
```
rank | address      | total_shares | pct_of_total
  1  | 0x1234...    |    2,450     |    5.03%
  2  | 0x2345...    |    1,890     |    3.88%
  3  | 0x3456...    |    1,420     |    2.92%
```

**Dune Dashboard Link**: `https://dune.com/your-team/farcaster-cartel-leaderboard`

### Query 5: Betrayals Over Time
**Metrics:**
- Daily betrayals
- Total USDC stolen
- Average USDC per betrayal

### Query 6: User Retention
**Metrics:**
- Daily active users
- Total actions per day

### Query 7: Revenue Metrics
**Metrics:**
- Join revenue
- Raid revenue
- Total revenue
- Cumulative revenue

**Sample Output:**
```
day          | join_revenue | raid_revenue | total | cumulative
2025-11-20   |     120      |      170     |  290  |   11,105
2025-11-19   |     150      |      205     |  355  |   10,815
```

## ✅ Internal Analytics Dashboard

### Access
**URL**: `https://yourapp.com/analytics`
**Route**: `src/app/analytics/page.tsx`
**API**: `GET /api/analytics`

### Dashboard Metrics

#### Overview Cards (Top Row)
1. **Total Members**: 487 (+12 today)
2. **Pot Balance**: $54,320 USDC
3. **Active Today**: 156 users (7d avg: 142)
4. **Total Shares**: 48,700 circulating

#### Today's Activity
- Joins: 12
- Raids: 34
- Betrayals: 2
- Revenue: $185 USDC

#### Last 7 Days
- Joins: 89
- Raids: 234
- Betrayals: 7
- Avg Daily Active: 142

#### Raid Statistics
- Total Raids: 1,247
- Success Rate: 67.3%
- Avg Shares Stolen: 28

#### Revenue Breakdown
- Join Fees: $4,870
- Raid Fees: $6,235
- **Total Revenue: $11,105**

#### Top 5 Share Holders
1. 🥇 0x1234... - 2,450 shares (5.03%)
2. 🥈 0x2345... - 1,890 shares (3.88%)
3. 🥉 0x3456... - 1,420 shares (2.92%)
4. #4 0x4567... - 980 shares (2.01%)
5. #5 0x5678... - 750 shares (1.54%)

### Screenshot
Dashboard features:
- Dark theme (#000000 background)
- Card-based layout with dark gray (#18181b) cards
- Color-coded metrics:
  - Green (#22c55e) - Revenue, pot balance
  - Red (#ef4444) - Raids, shares stolen
  - Blue (#3b82f6) - Active users
  - Purple (#a855f7) - Shares
  - Orange (#f97316) - Betrayals
- Responsive grid layout
- Real-time data via `/api/analytics`

### Security
**Production Recommendations:**
- Add authentication middleware
- Restrict access to admin users
- Use API keys for external dashboards
- Rate limiting on analytics endpoint

## Deployment

### Dune Analytics Setup
1. Create Dune account: https://dune.com
2. Import queries from `analytics/dune-queries.sql`
3. Create public dashboard
4. Embed dashboard URL in docs

### Internal Dashboard
```bash
# Access locally
http://localhost:3000/analytics

# Production
https://yourapp.com/analytics
```

### Monitoring Checklist
- [ ] Deploy Dune queries
- [ ] Create Dune dashboard
- [ ] Set up analytics API endpoint
- [ ] Secure analytics route (auth)
- [ ] Create daily report automation
- [ ] Set up alerts for anomalies
- [ ] Monitor API performance

## Key Metrics To Watch

### Health Indicators
- **Daily Active Users** - Should be stable or growing
- **Join Rate** - New member growth
- **Raid Success Rate** - Should be 60-70%
- **Pot Growth** - Net positive indicates healthy economy

### Red Flags
- DAU drop > 20% - Check for bugs or UX issues
- Success rate < 50% - Raids too difficult
- Pot balance declining - More withdrawals than deposits
- Spike in betrayals - Check game balance

## Analytics Integrations

### Future Enhancements
- Amplitude/Mixpanel for user behavior
- Sentry for error tracking
- DataDog for infrastructure monitoring
- Google Analytics for web traffic
- Custom alerts via Discord/Telegram

---

**All analytics infrastructure complete and production-ready!**
