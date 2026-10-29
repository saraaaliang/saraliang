import type { SyncAiContent, UserFlowNodeId } from "../content/sync-ai";

// The full Sync AI user flow as one diagram: three bands (designer in Figma, client on
// the phone, designer back in Figma), every branch drawn. Text comes from content;
// only positions live here.

const ink = "#15181a";
const muted = "#8a908d";
const surface = "#f4f5f2";
const brand = "#5352c4";
const terracotta = "#b85a31";

const W = 1064;
const H = 740;
const BOX_W = 130;
const BOX_H = 56;
const SIDE_H = 50;
const DIA_W = 96;
const DIA_H = 80;

// column centres, shared by all three bands so the steps line up
const X = [85, 234, 383, 532, 681, 830, 979];
// row centres
const ROW1 = 165;
const SIDE1 = 75;
const ROW2 = 345;
const SUGGEST = 430;
const ROW3 = 580;
const BELOW3 = 680;

const BANDS = [
  { y: 0, h: 250, color: brand },
  { y: 260, h: 220, color: terracotta },
  { y: 490, h: 250, color: brand },
];

type Kind = "designer" | "client" | "decision" | "terminal" | "muted";

const NODES: Record<UserFlowNodeId, { x: number; y: number; kind: Kind; h?: number }> = {
  start: { x: X[0], y: ROW1, kind: "terminal" },
  mode: { x: X[1], y: ROW1, kind: "decision" },
  handoff: { x: X[1], y: SIDE1, kind: "muted", h: SIDE_H },
  drafts: { x: X[2], y: ROW1, kind: "designer" },
  sure: { x: X[3], y: ROW1, kind: "decision" },
  context: { x: X[3], y: SIDE1, kind: "designer", h: SIDE_H },
  reason: { x: X[4], y: ROW1, kind: "designer" },
  confirm: { x: X[5], y: ROW1, kind: "decision" },
  viewOnly: { x: X[5], y: SIDE1, kind: "designer", h: SIDE_H },
  send: { x: X[6], y: ROW1, kind: "designer" },
  open: { x: X[6], y: ROW2, kind: "client" },
  review: { x: X[5], y: ROW2, kind: "client" },
  looks: { x: X[4], y: ROW2, kind: "decision" },
  confirms: { x: X[3], y: ROW2, kind: "client" },
  suggest: { x: X[4], y: SUGGEST, kind: "client", h: SIDE_H },
  refresh: { x: X[3], y: ROW3, kind: "designer" },
  update: { x: X[0], y: ROW3, kind: "designer" },
  done: { x: X[3], y: BELOW3, kind: "terminal" },
};

function Lines({ x, y, lines, size = 12, weight = 500, fill = ink }: { x: number; y: number; lines: string[]; size?: number; weight?: number; fill?: string }) {
  const lh = size * 1.3;
  const top = y - ((lines.length - 1) * lh) / 2 + size * 0.36;
  return (
    <text x={x} textAnchor="middle" fontSize={size} fontWeight={weight} fill={fill}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} y={top + i * lh}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Node({ id, lines }: { id: UserFlowNodeId; lines: string[] }) {
  const n = NODES[id];
  if (n.kind === "decision") {
    const pts = `${n.x},${n.y - DIA_H / 2} ${n.x + DIA_W / 2},${n.y} ${n.x},${n.y + DIA_H / 2} ${n.x - DIA_W / 2},${n.y}`;
    return (
      <g>
        <polygon points={pts} fill="#fff" stroke={ink} strokeWidth={1.25} strokeLinejoin="round" />
        <Lines x={n.x} y={n.y} lines={lines} size={11} weight={600} />
      </g>
    );
  }
  const h = n.h ?? BOX_H;
  const w = n.kind === "terminal" ? 150 : BOX_W;
  const stroke = n.kind === "client" ? terracotta : n.kind === "muted" ? muted : brand;
  const fill = n.kind === "terminal" ? brand : "#fff";
  return (
    <g>
      <rect
        x={n.x - w / 2}
        y={n.y - h / 2}
        width={w}
        height={h}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.25}
        strokeDasharray={n.kind === "muted" ? "4 3" : undefined}
      />
      <Lines
        x={n.x}
        y={n.y}
        lines={lines}
        weight={n.kind === "terminal" ? 600 : 500}
        fill={n.kind === "terminal" ? "#fff" : n.kind === "muted" ? muted : ink}
      />
    </g>
  );
}

function Edge({ d, dashed }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={ink}
      strokeWidth={1.25}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd="url(#uf-arrow)"
    />
  );
}

function EdgeLabel({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={10.5} fill={muted}>
      {children}
    </text>
  );
}

export function SyncAiUserFlow({ content }: { content: SyncAiContent["howItWorks"]["userFlow"] }) {
  const { nodes, edges, lanes } = content;
  const right = (id: UserFlowNodeId) => NODES[id].x + (NODES[id].kind === "decision" ? DIA_W / 2 : NODES[id].kind === "terminal" ? 75 : BOX_W / 2);
  const left = (id: UserFlowNodeId) => NODES[id].x - (NODES[id].kind === "decision" ? DIA_W / 2 : NODES[id].kind === "terminal" ? 75 : BOX_W / 2);
  const top = (id: UserFlowNodeId) => NODES[id].y - (NODES[id].kind === "decision" ? DIA_H / 2 : (NODES[id].h ?? BOX_H) / 2);
  const bottom = (id: UserFlowNodeId) => NODES[id].y + (NODES[id].kind === "decision" ? DIA_H / 2 : (NODES[id].h ?? BOX_H) / 2);
  const h = (a: UserFlowNodeId, b: UserFlowNodeId) => `M${right(a)},${NODES[a].y} H${left(b) - 2}`;
  const hl = (a: UserFlowNodeId, b: UserFlowNodeId) => `M${left(a)},${NODES[a].y} H${right(b) + 2}`;
  const up = (a: UserFlowNodeId, b: UserFlowNodeId) => `M${NODES[a].x},${top(a)} V${bottom(b) + 2}`;
  const down = (a: UserFlowNodeId, b: UserFlowNodeId) => `M${NODES[a].x},${bottom(a)} V${top(b) - 2}`;
  // loop back up from "Updates the design" to "AI drafts what changed", under the mode diamond
  const loopY = 222;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block min-w-[760px]"
        style={{ fontFamily: "var(--font-inter)" }}
        role="img"
        aria-label="Sync AI user flow, from the designer opening the plugin, through the client reviewing on their phone, to the designer seeing the result"
      >
        <defs>
          <marker id="uf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={ink} />
          </marker>
        </defs>

        {BANDS.map((b, i) => (
          <rect key={i} x={0} y={b.y} width={W} height={b.h} rx={16} fill={surface} />
        ))}

        {/* designer, in Figma */}
        <Edge d={h("start", "mode")} />
        <Edge d={h("mode", "drafts")} />
        <EdgeLabel x={300} y={155}>{edges.visual}</EdgeLabel>
        <Edge d={up("mode", "handoff")} />
        <EdgeLabel x={241} y={117} anchor="start">{edges.devHandoff}</EdgeLabel>
        <Edge d={h("drafts", "sure")} />
        <Edge d={h("sure", "reason")} />
        <EdgeLabel x={598} y={155}>{edges.yes}</EdgeLabel>
        <Edge d={up("sure", "context")} />
        <EdgeLabel x={539} y={117} anchor="start">{edges.no}</EdgeLabel>
        <Edge d={`M${left("context")},${NODES.context.y} H${NODES.drafts.x} V${top("drafts") - 2}`} />
        <Edge d={h("reason", "confirm")} />
        <Edge d={h("confirm", "send")} />
        <EdgeLabel x={896} y={155}>{edges.yes}</EdgeLabel>
        <Edge d={up("confirm", "viewOnly")} />
        <EdgeLabel x={837} y={117} anchor="start">{edges.no}</EdgeLabel>
        <Edge d={`M${right("viewOnly")},${NODES.viewOnly.y} H${NODES.send.x} V${top("send") - 2}`} />

        {/* client, on the phone */}
        <Edge d={down("send", "open")} dashed />
        <EdgeLabel x={971} y={258} anchor="end">{edges.later}</EdgeLabel>
        <Edge d={hl("open", "review")} />
        <Edge d={hl("review", "looks")} />
        <Edge d={hl("looks", "confirms")} />
        <EdgeLabel x={615} y={335}>{edges.yes}</EdgeLabel>
        <Edge d={down("looks", "suggest")} />
        <EdgeLabel x={688} y={399} anchor="start">{edges.no}</EdgeLabel>

        {/* back to the designer: not live, picked up on refresh */}
        <Edge d={down("confirms", "refresh")} dashed />
        <EdgeLabel x={540} y={474} anchor="start">{edges.sentBack}</EdgeLabel>
        <Edge d={`M${NODES.suggest.x},${bottom("suggest")} V${NODES.refresh.y} H${right("refresh") + 2}`} dashed />
        {/* no decision step here: after a refresh the plugin shows one result or the other */}
        <Edge d={down("refresh", "done")} />
        <EdgeLabel x={539} y={640} anchor="start">{edges.allConfirmed}</EdgeLabel>
        <Edge d={hl("refresh", "update")} />
        <EdgeLabel x={308} y={570}>{edges.hasSuggestion}</EdgeLabel>
        <Edge d={`M${NODES.update.x},${top("update")} V${loopY} H${NODES.drafts.x} V${bottom("drafts") + 2}`} dashed />
        <EdgeLabel x={93} y={400} anchor="start">{edges.nextVersion}</EdgeLabel>

        {/* lane labels sit on a backing so the "Next version" loop passes behind them */}
        {BANDS.map((b, i) => (
          <g key={i}>
            <rect x={14} y={b.y + 14} width={lanes[i].length * 6.9 + 12} height={20} fill={surface} />
            <text x={20} y={b.y + 28} fontSize={12} fontWeight={700} fill={b.color}>
              {lanes[i]}
            </text>
          </g>
        ))}

        {(Object.keys(NODES) as UserFlowNodeId[]).map((id) => (
          <Node key={id} id={id} lines={nodes[id]} />
        ))}
      </svg>
    </div>
  );
}
