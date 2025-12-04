-- Base Cartel - Dune Analytics Queries
-- Deploy these queries to Dune Analytics for real-time blockchain monitoring

-- =====================================================
-- QUERY 1: Daily Joins (New Members per Day)
-- =====================================================
WITH daily_joins AS (
  SELECT
    DATE_TRUNC('day', evt_block_time) AS day,
    COUNT(*) AS joins,
    SUM(shares) AS total_shares_minted,
    SUM(fee) / 1e6 AS total_fees_usdc
  FROM base.CartelCore_evt_Join
  WHERE evt_block_time >= NOW() - INTERVAL '30 days'
  GROUP BY 1
)
SELECT
  day,
  joins,
  total_shares_minted,
  total_fees_usdc,
  SUM(joins) OVER (ORDER BY day) AS cumulative_members
FROM daily_joins
ORDER BY day DESC;

-- =====================================================
-- QUERY 2: Daily Raids (Raid Activity)
-- =====================================================
WITH daily_raids AS (
  SELECT
    DATE_TRUNC('day', evt_block_time) AS day,
    COUNT(*) AS total_raids,
    SUM(CASE WHEN success = true THEN 1 ELSE 0 END) AS successful_raids,
    SUM(CASE WHEN success = false THEN 1 ELSE 0 END) AS failed_raids,
    SUM(amountStolen) AS total_shares_stolen,
    SUM(fee) / 1e6 AS total_raid_fees_usdc
  FROM base.CartelCore_evt_Raid
  WHERE evt_block_time >= NOW() - INTERVAL '30 days'
  GROUP BY 1
)
SELECT
  day,
  total_raids,
  successful_raids,
  failed_raids,
  ROUND(successful_raids::NUMERIC / NULLIF(total_raids, 0) * 100, 2) AS success_rate_pct,
  total_shares_stolen,
  total_raid_fees_usdc
FROM daily_raids
ORDER BY day DESC;

-- =====================================================
-- QUERY 3: Pot Growth (Treasury Over Time)
-- =====================================================
WITH pot_deposits AS (
  SELECT
    DATE_TRUNC('day', evt_block_time) AS day,
    SUM(amount) / 1e6 AS deposits_usdc
  FROM base.CartelPot_evt_Deposit
  GROUP BY 1
),
pot_withdrawals AS (
  SELECT
    DATE_TRUNC('day', evt_block_time) AS day,
    SUM(amount) / 1e6 AS withdrawals_usdc
  FROM base.CartelPot_evt_Withdrawal
  GROUP BY 1
),
daily_pot AS (
  SELECT
    COALESCE(d.day, w.day) AS day,
    COALESCE(d.deposits_usdc, 0) AS deposits,
    COALESCE(w.withdrawals_usdc, 0) AS withdrawals,
    COALESCE(d.deposits_usdc, 0) - COALESCE(w.withdrawals_usdc, 0) AS net_change
  FROM pot_deposits d
  FULL OUTER JOIN pot_withdrawals w ON d.day = w.day
  WHERE COALESCE(d.day, w.day) >= NOW() - INTERVAL '30 days'
)
SELECT
  day,
  deposits,
  withdrawals,
  net_change,
  SUM(net_change) OVER (ORDER BY day) AS pot_balance_usdc
FROM daily_pot
ORDER BY day DESC;

-- =====================================================
-- QUERY 4: Top Share Holders (Leaderboard)
-- =====================================================
WITH share_changes AS (
  -- Shares minted on join
  SELECT
    player AS address,
    shares AS change
  FROM base.CartelCore_evt_Join
  
  UNION ALL
  
  -- Shares stolen in raids (raider gains)
  SELECT
    raider AS address,
    amountStolen AS change
  FROM base.CartelCore_evt_Raid
  WHERE success = true
  
  UNION ALL
  
  -- Shares lost in raids (target loses)
  SELECT
    target AS address,
    -amountStolen AS change
  FROM base.CartelCore_evt_Raid
  WHERE success = true
  
  UNION ALL
  
  -- Shares burned on betrayal
  SELECT
    traitor AS address,
    -amountStolen AS change
  FROM base.CartelCore_evt_Betrayal
),
holder_balances AS (
  SELECT
    address,
    SUM(change) AS total_shares
  FROM share_changes
  GROUP BY address
  HAVING SUM(change) > 0
)
SELECT
  ROW_NUMBER() OVER (ORDER BY total_shares DESC) AS rank,
  address,
  total_shares,
  ROUND(total_shares * 100.0 / SUM(total_shares) OVER (), 2) AS pct_of_total
FROM holder_balances
ORDER BY total_shares DESC
LIMIT 100;

-- =====================================================
-- QUERY 5: Betrayals Over Time
-- =====================================================
SELECT
  DATE_TRUNC('day', evt_block_time) AS day,
  COUNT(*) AS betrayals,
  SUM(amountStolen) / 1e6 AS total_stolen_usdc,
  AVG(amountStolen) / 1e6 AS avg_stolen_usdc
FROM base.CartelCore_evt_Betrayal
WHERE evt_block_time >= NOW() - INTERVAL '30 days'
GROUP BY 1
ORDER BY day DESC;

-- =====================================================
-- QUERY 6: User Retention (Active Users)
-- =====================================================
WITH all_actions AS (
  SELECT player AS user, DATE_TRUNC('day', evt_block_time) AS day
  FROM base.CartelCore_evt_Join
  
  UNION ALL
  
  SELECT raider AS user, DATE_TRUNC('day', evt_block_time) AS day
  FROM base.CartelCore_evt_Raid
  
  UNION ALL
  
  SELECT traitor AS user, DATE_TRUNC('day', evt_block_time) AS day
  FROM base.CartelCore_evt_Betrayal
)
SELECT
  day,
  COUNT(DISTINCT user) AS daily_active_users,
  COUNT(*) AS total_actions
FROM all_actions
WHERE day >= NOW() - INTERVAL '30 days'
GROUP BY 1
ORDER BY day DESC;

-- =====================================================
-- QUERY 7: Revenue Metrics
-- =====================================================
WITH join_fees AS (
  SELECT
    DATE_TRUNC('day', evt_block_time) AS day,
    SUM(fee) / 1e6 AS join_revenue
  FROM base.CartelCore_evt_Join
  GROUP BY 1
),
raid_fees AS (
  SELECT
    DATE_TRUNC('day', evt_block_time) AS day,
    SUM(fee) / 1e6 AS raid_revenue
  FROM base.CartelCore_evt_Raid
  GROUP BY 1
)
SELECT
  COALESCE(j.day, r.day) AS day,
  COALESCE(j.join_revenue, 0) AS join_revenue_usdc,
  COALESCE(r.raid_revenue, 0) AS raid_revenue_usdc,
  COALESCE(j.join_revenue, 0) + COALESCE(r.raid_revenue, 0) AS total_revenue_usdc,
  SUM(COALESCE(j.join_revenue, 0) + COALESCE(r.raid_revenue, 0)) 
    OVER (ORDER BY COALESCE(j.day, r.day)) AS cumulative_revenue_usdc
FROM join_fees j
FULL OUTER JOIN raid_fees r ON j.day = r.day
WHERE COALESCE(j.day, r.day) >= NOW() - INTERVAL '30 days'
ORDER BY day DESC;

