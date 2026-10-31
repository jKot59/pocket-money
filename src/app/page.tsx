"use client";

import { useEffect, useState } from "react";
import dashboard from "@/data/dashboard.json";

function formatMoney(amountCents: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: dashboard.currency,
  }).format(amountCents / 100);
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-IE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${dateString}T00:00:00Z`));
}

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function CauldronIllustration() {
  return (
<svg x="970" y="31" width="400" height="343" viewBox="0 0 420 360" aria-hidden="true">
      <defs>
        <linearGradient id="filled-pot" x1="120" y1="135" x2="300" y2="310" gradientUnits="userSpaceOnUse">
          <stop stop-color="#48454E"></stop>
          <stop offset=".5" stop-color="#211F27"></stop>
          <stop offset="1" stop-color="#09090D"></stop>
        </linearGradient>
        <linearGradient id="filled-coin-gold" x1="-18" y1="-8" x2="18" y2="10" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFF0A3"></stop>
          <stop offset=".55" stop-color="#FFC83D"></stop>
          <stop offset="1" stop-color="#D98519"></stop>
        </linearGradient>
        <clipPath id="filled-pot-mouth">
          <path d="M94 0H326V124C326 150 278 163 210 163C142 163 94 150 94 124V0Z"></path>
        </clipPath>
        <g id="filled-pot-coin">
          <path d="M-19 0V8C-19 13-10 17 0 17S19 13 19 8V0" fill="#C77B16"></path>
          <ellipse cy="0" rx="19" ry="8" fill="url(#filled-coin-gold)" stroke="#FFE28A" stroke-width="1.5"></ellipse>
          <path d="M-7 0H7M0-3V3" stroke="#E59B1C" stroke-width="2" stroke-linecap="round"></path>
        </g>
      </defs>
      <path d="M84 137C100 154 151 165 210 165S320 154 336 137" stroke="#09090D" stroke-width="13" stroke-linecap="round"></path>
      <path d="M91 133C111 117 159 109 210 109S309 117 329 133" stroke="#69636E" stroke-width="5" stroke-linecap="round"></path>
      <ellipse cx="210" cy="331" rx="139" ry="13" fill="#171522" fill-opacity=".12"></ellipse>
      <path d="M129 282L116 321Q114 331 126 331H152L160 294ZM291 282L304 321Q306 331 294 331H268L260 294Z" fill="#15141B"></path>
      <ellipse cx="134" cy="329" rx="17" ry="8" fill="#09090D"></ellipse>
      <ellipse cx="286" cy="329" rx="17" ry="8" fill="#09090D"></ellipse>
      <path d="M91 150C60 132 42 143 45 160C48 177 69 181 94 168M329 150C360 132 378 143 375 160C372 177 351 181 326 168" stroke="#111016" stroke-width="15" stroke-linecap="round"></path>
      <path d="M82 137C82 122 139 110 210 110S338 122 338 137L321 246C315 286 271 312 210 312S105 286 99 246L82 137Z" fill="url(#filled-pot)"></path>
      <path d="M105 201C111 236 126 267 155 284" stroke="#77717F" stroke-opacity=".27" stroke-width="8" stroke-linecap="round"></path>
      <ellipse cx="210" cy="143" rx="111" ry="22" fill="#9A5116"></ellipse>
      <ellipse cx="210" cy="136" rx="108" ry="21" fill="#E79B24"></ellipse>
      <use href="#filled-pot-coin" transform="translate(111 135) rotate(-8) scale(.86)"></use>
      <use href="#filled-pot-coin" transform="translate(143 127) rotate(7) scale(.92)"></use>
      <use href="#filled-pot-coin" transform="translate(174 120) rotate(-5) scale(.94)"></use>
      <use href="#filled-pot-coin" transform="translate(205 117) rotate(6)"></use>
      <use href="#filled-pot-coin" transform="translate(237 121) rotate(-7) scale(.96)"></use>
      <use href="#filled-pot-coin" transform="translate(269 129) rotate(8) scale(.9)"></use>
      <use href="#filled-pot-coin" transform="translate(303 137) rotate(-6) scale(.82)"></use>
      <use href="#filled-pot-coin" transform="translate(125 147) rotate(7) scale(.88)"></use>
      <use href="#filled-pot-coin" transform="translate(158 141) rotate(-8)"></use>
      <use href="#filled-pot-coin" transform="translate(190 139) rotate(5) scale(.96)"></use>
      <use href="#filled-pot-coin" transform="translate(223 140) rotate(-6) scale(1.02)"></use>
      <use href="#filled-pot-coin" transform="translate(256 145) rotate(8) scale(.94)"></use>
      <use href="#filled-pot-coin" transform="translate(289 148) rotate(-5) scale(.86)"></use>
      <g clip-path="url(#filled-pot-mouth)">
        <g className="filled-coin-drop"><use href="#filled-pot-coin" transform="translate(150 18) rotate(-14) scale(.85)"></use></g>
        <g className="filled-coin-drop delay-one"><use href="#filled-pot-coin" transform="translate(210 2) rotate(11) scale(.8)"></use></g>
        <g className="filled-coin-drop delay-two"><use href="#filled-pot-coin" transform="translate(270 27) rotate(-8) scale(.9)"></use></g>
      </g>
    </svg>
  );
}

export default function Home() {
  const [todayKey, setTodayKey] = useState(() => localDateKey(new Date()));

  useEffect(() => {
    const updateDate = () => setTodayKey(localDateKey(new Date()));
    updateDate();
    const timer = window.setInterval(updateDate, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const isCompleted = (dateString: string) =>
    dateString <= todayKey;
  const dueEarnings = dashboard.earnings.filter((earning) =>
    isCompleted(earning.date),
  );
  const futureEarnings = dashboard.earnings.filter(
    (earning) => !isCompleted(earning.date),
  );
  const balanceCents =
    dashboard.initialBalanceCents +
    dueEarnings.reduce((total, earning) => total + earning.amountCents, 0);
  const potentialCents = futureEarnings.reduce(
    (total, earning) => total + earning.amountCents,
    0,
  );
  const progress = dashboard.savingsTargetCents
    ? Math.min((balanceCents / dashboard.savingsTargetCents) * 100, 100)
    : 0;

  return (
    <main className="dashboard">
      <section className="balance-card" aria-labelledby="balance-heading">
        <div className="balance-copy">
          <p className="eyebrow">YOUR MONEY POT</p>
          <h1 id="balance-heading">
            {formatMoney(balanceCents)}
          </h1>
          <span className="balance-pill">
            <span className="status-dot" />
            All your money
          </span>
          <p className="balance-note">Every coin counts. Keep going!</p>
        </div>
        <CauldronIllustration />
      </section>

      <div className="content-grid">
        <section className="panel earnings-panel" aria-labelledby="earnings-heading">
          <header className="panel-header">
            <div>
              <h2 id="earnings-heading">Planned earnings</h2>
              <p>Money you could earn soon</p>
            </div>
            <span className="count-badge">
              {futureEarnings.length} PLANNED
            </span>
          </header>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Planned earning</th>
                  <th scope="col" className="amount-heading">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboard.earnings.map((earning, index) => {
                  const completed = isCompleted(earning.date);
                  return (
                    <tr key={earning.id}>
                      <td className="date-cell">{formatDate(earning.date)}</td>
                      <td>
                        <div className="earning-cell">
                          <span className={`earning-icon icon-${index % 4}`}>
                            {completed ? "✓" : "+"}
                          </span>
                          <span>
                            <strong>{earning.title}</strong>
                            <small>
                              {completed
                                ? "Completed and added to your balance"
                                : earning.description}
                            </small>
                          </span>
                        </div>
                      </td>
                      <td className={`amount-cell${completed ? " due-amount" : ""}`}>
                        {formatMoney(earning.amountCents)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Future planned total</td>
                  <td className="amount-cell">{formatMoney(potentialCents)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="panel savings-panel" aria-labelledby="savings-heading">
          <header className="panel-header">
            <div>
              <h2 id="savings-heading">Freeze savings</h2>
              <p>Keep money safe until your target.</p>
            </div>
            <span className={`freeze-badge${dashboard.freezeEnabled ? "" : " off"}`}>
              <span className="status-dot" />
              {dashboard.freezeEnabled ? "ON" : "OFF"}
            </span>
          </header>

          <div className="lock-card">
            <svg
              className="lock-icon"
              aria-hidden="true"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M15 22v-5a9 9 0 0 1 18 0v5M12 22h24v18H12z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="30" r="2" fill="currentColor" />
            </svg>
            <span>
              <small>FREEZE STATUS</small>
              <strong>
                {dashboard.freezeEnabled
                  ? "Savings are locked"
                  : "Savings are unlocked"}
              </strong>
            </span>
          </div>

          <div className="target-section">
            <p className="section-label">UNLOCK WHEN SAVINGS REACH</p>
            <div className="target-box">
              <strong>{formatMoney(dashboard.savingsTargetCents)}</strong>
              <span>TARGET</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-heading">
              <strong>Your progress</strong>
              <span>
                {formatMoney(balanceCents)} / {formatMoney(dashboard.savingsTargetCents)}
              </span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Savings progress"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-caption">{Math.round(progress)}% of the way there!</p>
          </div>
          <p className="manager-note">
            Keep saving you’re getting closer to your goal!
          </p>
        </section>
      </div>
      <p className="read-only-note">A little progress adds up. This dashboard is read-only.</p>
    </main>
  );
}
