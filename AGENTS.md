# Project Jules: Kaban App Master Instructions
/* DevelopedByCaleb */

## 1. Core Identity & Branding
- **App Name**: Kaban (The Treasury/Vault).
- **AI Identity**: Bihasa, a specialized financial-language model providing algorithmic objectivity across equities, crypto, and real estate.
- **Target Audience**: High school students and retail investors, prioritizing education through simplified terminology and bilingual (English/Filipino) support.
- **Asset Logic**: Utilize a conditional rendering system to load logos (Kaban/Bihasa) from database URLs, falling back to CSS/Lucide icons if null.

## 2. Navigation & UX Physics
- **Navigation Stack**: Implement an iOS-style "Spring" history stack. New screens slide in from the right; previous screens push -30% to the left with a subtle shadow overlay.
- **Premium Easing**: All transitions must use `cubic-bezier(0.32, 0.72, 0, 1)` over a 400ms duration for native-app fluidity.
- **Offline Engine**: Maintain a global network listener. If connectivity is lost, display a non-intrusive "Offline Mode" banner and serve cached data without interrupting the session.

## 3. The "Bihasa" Learning System
- **Information Bubbles**: Interactive glossary triggers for complex terms (e.g., ROE, Net Income, Parent Conglomerate).
- **Bubble UI**: 260px wide, scrollable (max-height 45vh), zoom-in-95 animation, and edge-detection logic to drop "DOWN" when triggered near the screen top.
- **Content Structure**: Title, Simple English definition, Filipino translation, Real-world example, and "Bihasa Deep-Dive".

## 4. Screen-Specific Architecture

### A. Kaban (Home) Tab
- **Market Header**: Time-aware greetings (Umaga/Hapon/Gabi) with Lakan/Lakambini honorifics.
- **Market Switcher**: Working dropdown for PSE (Active), with Stage 2 locks for US Markets, Crypto, and Global Equities.
- **Trending Carousel**: Horizontal snap-scroll cards featuring OHLC Candlestick sparklines extrapolated from price data.
- **Market Bihasa**: Daily AI synthesis with mandatory legal disclosures.

### B. Discover & Watchlist Tabs
- **Filter Engine**: Dual-axis filtering by Sector (Financials, Property, etc.) and Market Metrics (Hot, Gainers, Losers, 24h Volume, Market Cap).
- **Watchlist Logic**: Decoupled interactions—clicking a row triggers the navigation stack to Stock Details; clicking the Star icon toggles watchlist status.

### C. Stock Detail & Pro-Chart
- **Mini-Chart**: ComposedChart featuring Volume bars (squished to bottom via dual Y-axes) and contextual overlays (EPS for Fundamentals tab, 200MA for Value tab).
- **Bihasa Scorecard**: High-school-friendly metrics (e.g., "Government Rules" for Franchise Risk).
- **Pro-Chart Gateway**: Rotated 90-degree landscape terminal with synchronized multi-pane charts for Price/Candles, Volume, and RSI (14).

## 5. Technical Rigor
- **TypeScript**: Absolute zero-problem tolerance; all unused variables, icons, or declared-but-unread props must be purged.
- **Memory Optimization**: Use `useMemo` for heavy chart data generation to prevent UI "twitching" during state updates.
- **Legal Compliance**: Every AI-generated insight or outlook must append a standard disclosure regarding AI limitations and the "DYOR" (Do Your Own Research) principle.