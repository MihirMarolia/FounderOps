'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  BoltIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentTextIcon,
  FlagIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  PlusIcon,
  SparklesIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type Stage = {
  id: number;
  name: string;
  eyebrow: string;
  status: 'complete' | 'current' | 'upcoming';
  description: string;
  prompt: string;
  helper: string;
  placeholder: string;
  artifact: string;
  evidence: string;
};

const initialStages: Stage[] = [
  { id: 1, name: 'Founder context', eyebrow: 'Start here', status: 'complete', description: 'Set the direction for your company and the constraints you are working within.', prompt: 'What are you trying to change, and why are you the person to build it?', helper: 'A clear founder thesis keeps the build grounded in a real advantage, insight, or lived experience.', placeholder: 'Example: I want to help independent clinics reduce no-shows because I have seen how much revenue and care gets lost...', artifact: 'Founder thesis', evidence: 'Founder insight recorded' },
  { id: 2, name: 'Customer & market', eyebrow: 'Focus', status: 'current', description: 'Choose a narrow first customer and market before you try to serve everyone.', prompt: 'Who is the first group of people you want to serve, where are they, and what are they already doing today?', helper: 'Start with a beachhead: a specific audience, location, segment, or community where the problem is urgent and reachable.', placeholder: 'Example: Independent dental practices with 2–10 chairs in Ontario that lose revenue from last-minute cancellations...', artifact: 'Beachhead market brief', evidence: '0 customer interviews' },
  { id: 3, name: 'Problem discovery', eyebrow: 'Learn', status: 'upcoming', description: 'Turn assumptions into questions and collect evidence from real people.', prompt: 'What problem do you believe this customer has, and what would you need to observe or hear to prove it?', helper: 'Avoid pitching the solution. Capture the current workflow, trigger, workaround, cost, and emotional impact.', placeholder: 'Write the problem hypothesis and the interview questions you will use...', artifact: 'Problem brief + interview script', evidence: '0 validated observations' },
  { id: 4, name: 'Value proposition', eyebrow: 'Position', status: 'upcoming', description: 'Describe the smallest valuable outcome your product can create.', prompt: 'What is the simplest promise you can make to this customer that is meaningfully better than their current alternative?', helper: 'Your first promise should be specific enough to test and narrow enough to deliver manually if needed.', placeholder: 'For [customer], who struggles with [problem], we help them achieve [outcome] by [mechanism]...', artifact: 'Value proposition canvas', evidence: 'No promise tested' },
  { id: 5, name: 'MVP experiment', eyebrow: 'Build', status: 'upcoming', description: 'Design the fastest credible test of your riskiest assumption.', prompt: 'What can you put in front of a real customer this week to learn whether the problem and promise are real?', helper: 'Prefer a concierge, prototype, landing page, or manual service before building a full product.', placeholder: 'Define the experiment, who will participate, what they will do, and what result counts as a signal...', artifact: 'Experiment card', evidence: 'No active experiment' },
  { id: 6, name: 'First customers', eyebrow: 'Launch', status: 'upcoming', description: 'Create a practical path to your first 10 customers or design partners.', prompt: 'How will you reach the first people who feel this problem most intensely?', helper: 'Early distribution is often personal and manual. Choose a channel you can operate yourself.', placeholder: 'List your first 20 prospects, communities, partners, or channels...', artifact: 'First-customer plan', evidence: '0 prospects contacted' },
  { id: 7, name: 'Business model', eyebrow: 'Sustain', status: 'upcoming', description: 'Make the economics and pricing assumptions explicit.', prompt: 'Who pays, for what outcome, how often, and what would make the economics sustainable?', helper: 'Pricing is a hypothesis. Tie it to value, willingness to pay, and the cost of serving the customer.', placeholder: 'Describe the buyer, pricing hypothesis, expected costs, and the first monetization test...', artifact: 'Business model snapshot', evidence: 'Pricing not tested' },
  { id: 8, name: 'Operating cadence', eyebrow: 'Keep moving', status: 'upcoming', description: 'Turn learning into a weekly rhythm of focus, evidence, and decisions.', prompt: 'What is the one outcome that would make this week meaningfully successful?', helper: 'FounderOps keeps you focused on one key metric, a short list of actions, and a weekly pivot-or-persevere decision.', placeholder: 'Define this week’s outcome, metric, customer conversations, and build block...', artifact: 'Weekly operating plan', evidence: 'Cadence not started' }
];

type SelectionStep = 'industry' | 'segment' | 'audience';

const selectionOptions: Record<SelectionStep, Array<{ id: string; label: string; description: string; icon: string }>> = {
  industry: [
    { id: 'health', label: 'Health & wellness', description: 'Care delivery, clinics, fitness, mental health, and wellbeing.', icon: '✦' },
    { id: 'software', label: 'Software & AI', description: 'Tools, platforms, automation, and intelligent products.', icon: '◎' },
    { id: 'finance', label: 'Finance & commerce', description: 'Payments, banking, insurance, marketplaces, and money movement.', icon: '◌' },
    { id: 'climate', label: 'Climate & industry', description: 'Energy, infrastructure, manufacturing, and the built world.', icon: '⌁' },
    { id: 'education', label: 'Education & work', description: 'Learning, careers, teams, and professional development.', icon: '▱' },
    { id: 'consumer', label: 'Consumer & lifestyle', description: 'Products and services for everyday life, culture, and communities.', icon: '○' }
  ],
  segment: [
    { id: 'independent', label: 'Independent businesses', description: 'Owner-led organizations with a focused local or niche market.', icon: '◫' },
    { id: 'midmarket', label: 'Growing mid-market teams', description: 'Established teams looking to improve operations and outcomes.', icon: '▥' },
    { id: 'enterprise', label: 'Enterprise organizations', description: 'Large organizations with complex buying and implementation cycles.', icon: '▦' },
    { id: 'public', label: 'Public sector & communities', description: 'Government, civic organizations, and community-led institutions.', icon: '⌘' },
    { id: 'creators', label: 'Creators & individuals', description: 'People building independent practices, audiences, or businesses.', icon: '✧' },
    { id: 'developers', label: 'Developers & technical teams', description: 'Technical builders who adopt infrastructure, APIs, or developer tools.', icon: '⌘' }
  ],
  audience: [
    { id: 'owners', label: 'Owners & operators', description: 'People responsible for running the business day to day.', icon: '◉' },
    { id: 'leaders', label: 'Functional leaders', description: 'Heads of growth, sales, finance, operations, or product.', icon: '◍' },
    { id: 'practitioners', label: 'Practitioners', description: 'People doing the hands-on work and living with the workflow.', icon: '◈' },
    { id: 'buyers', label: 'Professional buyers', description: 'Procurement, IT, finance, or other formal buying roles.', icon: '◇' },
    { id: 'members', label: 'Members & consumers', description: 'End users who choose, use, and experience the product directly.', icon: '◌' },
    { id: 'communities', label: 'Communities & partners', description: 'Groups, networks, and organizations that influence adoption.', icon: '⊙' }
  ]
};

const selectionMeta: Record<SelectionStep, { title: string; description: string; next: SelectionStep | null }> = {
  industry: { title: 'What world are you building in?', description: 'Start broad. FounderOps will use this to shape market examples, risks, and the language of your build path.', next: 'segment' },
  segment: { title: 'Which part of that world is your beachhead?', description: 'Choose the type of organization or market segment where your first wedge is most likely to get traction.', next: 'audience' },
  audience: { title: 'Who will feel the value first?', description: 'Pick the role or group whose problem is urgent, reachable, and specific enough to interview this week.', next: null }
};

const navItems = [
  { label: 'Today', icon: BoltIcon },
  { label: 'Build path', icon: FlagIcon },
  { label: 'Workspace', icon: DocumentTextIcon },
  { label: 'Evidence', icon: UserGroupIcon }
];

type ValueProp = { job: string; pain: string; outcome: string; offering: string; proof: string };

type ValuePropProps = { context: { industry: string; segment: string; audience: string; location: string; model: string; hours: string }; valueProp: ValueProp; setValueProp: (value: ValueProp) => void; onSave: () => void };

function ValuePropositionPanel({ context, valueProp, setValueProp, onSave }: ValuePropProps) {
  const update = (key: keyof ValueProp, value: string) => setValueProp({ ...valueProp, [key]: value });
  const statement = valueProp.job && valueProp.outcome
    ? `For ${context.audience.toLowerCase()} in ${context.segment.toLowerCase()}, ${context.industry.toLowerCase()} ${valueProp.offering ? `offering ${valueProp.offering.toLowerCase()} ` : ''}helps them ${valueProp.outcome.toLowerCase()}${valueProp.pain ? ` when they are facing ${valueProp.pain.toLowerCase()}` : ''}.`
    : 'Complete the job and outcome fields to generate your first value proposition draft.';
  const fields: Array<{ key: keyof ValueProp; label: string; prompt: string; placeholder: string }> = [
    { key: 'job', label: 'Customer job', prompt: 'What are they trying to get done?', placeholder: `Example: help ${context.audience.toLowerCase()} keep their operation running smoothly...` },
    { key: 'pain', label: 'Pain or trigger', prompt: 'What makes the current way costly, slow, or frustrating?', placeholder: 'Example: missed follow-ups create revenue leakage and make the team feel reactive...' },
    { key: 'outcome', label: 'Desired outcome', prompt: 'What measurable or felt improvement do they want?', placeholder: 'Example: respond to every request within one business day...' },
    { key: 'offering', label: 'Core offering', prompt: 'What is the smallest thing you can provide to create that outcome?', placeholder: 'Example: an AI inbox that prioritizes requests and drafts next actions...' },
    { key: 'proof', label: 'Proof signal', prompt: 'What would convince you this promise is worth pursuing?', placeholder: 'Example: 5 interviews, 3 design partners, or 2 customers willing to pay...' }
  ];
  return <section className="value-prop-panel"><div className="value-prop-heading"><div><p className="eyebrow">Position · Stage 4</p><h3>Define the promise before you build the product.</h3><p>Use your market focus to make a specific promise to a specific person. This is a testable hypothesis, not a tagline.</p></div><span className="value-prop-badge">{Object.values(valueProp).filter(Boolean).length}/5 inputs</span></div><div className="value-prop-context"><span>Built for</span><strong>{context.audience}</strong><span>in</span><strong>{context.segment}</strong><span>·</span><strong>{context.industry}</strong></div><div className="value-prop-fields">{fields.map((field) => <label key={field.key} className="value-prop-field"><span className="value-prop-label">{field.label}</span><span className="value-prop-prompt">{field.prompt}</span><textarea value={valueProp[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} /></label>)}</div><div className="value-prop-output"><div><p className="eyebrow">Generated working draft</p><h4>Your value proposition</h4><p>{statement}</p></div><button onClick={onSave} className="primary-button">Save proposition <CheckCircleIcon className="h-4 w-4" /></button></div></section>;
}

type FounderDashboardProps = { stages: Stage[]; context: { industry: string; segment: string; audience: string; location: string; model: string; hours: string }; valueProp: ValueProp; completion: number; onOpenStage: (stage: Stage) => void };

function FounderDashboard({ stages, context, valueProp, completion, onOpenStage }: FounderDashboardProps) {
  const completed = stages.filter((stage) => stage.status === 'complete');
  const current = stages.find((stage) => stage.status === 'current') ?? stages[0];
  const evidenceCount = completed.length + Object.values(valueProp).filter(Boolean).length;
  const artifacts = [
    { name: 'Founder thesis', status: 'Ready', detail: 'Founder insight recorded' },
    { name: 'Beachhead market brief', status: completed.some((stage) => stage.id === 2) ? 'Ready' : 'Draft', detail: context.audience + ' · ' + context.segment },
    { name: 'Value proposition', status: valueProp.outcome ? 'Ready' : 'Draft', detail: valueProp.outcome || 'Define the customer outcome' },
    { name: 'MVP experiment', status: 'Next', detail: 'Design the fastest credible test' },
    { name: 'Interview log', status: 'Draft', detail: '0 conversations recorded' },
    { name: 'Business model', status: 'Draft', detail: 'Pricing and sustainability assumptions' }
  ];
  return <div className="founder-dashboard"><div className="dashboard-intro"><div><p className="eyebrow">Founder command center</p><h3>Everything you know, everything you need to learn.</h3><p>See the whole company-building journey at a glance, then open the one stage that deserves your attention next.</p></div><div className="dashboard-score"><span>{completion}%</span><small>build path</small></div></div><div className="dashboard-context"><div><span>Building in</span><strong>{context.industry}</strong></div><div><span>Beachhead</span><strong>{context.segment}</strong></div><div><span>First audience</span><strong>{context.audience}</strong></div><div><span>Location</span><strong>{context.location}</strong></div><div><span>Evidence captured</span><strong>{evidenceCount} signals</strong></div></div><div className="dashboard-grid"><section className="dashboard-card dashboard-focus"><div className="dashboard-card-heading"><div><p className="eyebrow">Your next decision</p><h4>{current.name}</h4></div><span className="dashboard-status">In focus</span></div><p>{current.description}</p><div className="dashboard-next-action"><span className="dashboard-action-mark">→</span><div><strong>{current.prompt}</strong><small>Complete this stage to create: {current.artifact}</small></div></div><button onClick={() => onOpenStage(current)} className="primary-button">Open current stage <ArrowRightIcon className="h-4 w-4" /></button></section><section className="dashboard-card"><div className="dashboard-card-heading"><div><p className="eyebrow">Evidence health</p><h4>Are you learning fast enough?</h4></div><UserGroupIcon className="h-5 w-5 text-slate-500" /></div><div className="dashboard-metrics"><div><strong>{completed.length}</strong><span>stages captured</span></div><div><strong>{Object.values(valueProp).filter(Boolean).length}/5</strong><span>value inputs</span></div><div><strong>0</strong><span>interviews logged</span></div></div><div className="dashboard-evidence-row"><span>Validated learning</span><div className="progress-track"><div style={{ width: `${Math.min(100, evidenceCount * 8)}%` }} /></div><strong>{Math.min(100, evidenceCount * 8)}%</strong></div></section></div><section className="dashboard-card dashboard-stages"><div className="dashboard-card-heading"><div><p className="eyebrow">The full build path</p><h4>Progress by stage</h4></div><span className="text-xs text-slate-500">{completed.length} of {stages.length} complete</span></div><div className="dashboard-stage-list">{stages.map((stage) => <button key={stage.id} onClick={() => onOpenStage(stage)} className={`dashboard-stage-row ${stage.status === 'current' ? 'dashboard-stage-current' : ''}`}><span className={`dashboard-stage-number ${stage.status}`}>{stage.status === 'complete' ? '✓' : stage.id}</span><span className="dashboard-stage-name"><strong>{stage.name}</strong><small>{stage.artifact}</small></span><span className={`dashboard-stage-evidence ${stage.status}`}>{stage.status === 'complete' ? stage.evidence : stage.status === 'current' ? 'In focus' : 'Up next'}</span><ChevronRightIcon className="h-4 w-4 text-slate-400" /></button>)}</div></section><div className="dashboard-grid dashboard-lower-grid"><section className="dashboard-card"><div className="dashboard-card-heading"><div><p className="eyebrow">Workspace artifacts</p><h4>What you are building</h4></div><button className="dashboard-link">Open workspace</button></div><div className="dashboard-artifact-grid">{artifacts.map((artifact) => <div key={artifact.name} className="dashboard-artifact"><div><strong>{artifact.name}</strong><small>{artifact.detail}</small></div><span className={`artifact-status ${artifact.status.toLowerCase()}`}>{artifact.status}</span></div>)}</div></section><section className="dashboard-card dashboard-week"><div className="dashboard-card-heading"><div><p className="eyebrow">This week</p><h4>Founder focus</h4></div><BoltIcon className="h-5 w-5 text-red-500" /></div><p>Talk to <strong>5 {context.audience.toLowerCase()}</strong> and learn whether the problem is painful enough to change.</p><div className="dashboard-task"><span className="check-empty" /><span>Draft interview script</span><small>20m</small></div><div className="dashboard-task"><span className="check-empty" /><span>Book first 2 conversations</span><small>30m</small></div><div className="dashboard-task"><span className="check-empty" /><span>Log the strongest signal</span><small>15m</small></div><button className="secondary-button dashboard-full-button">Open weekly plan</button></section></div><section className="dashboard-review"><ClockIcon className="h-5 w-5" /><div><p className="eyebrow">Next review · Friday</p><strong>Pivot or persevere</strong><span>Compare your evidence against the assumption you are testing.</span></div><button className="secondary-button">Review evidence</button></section></div>;
}

export default function FounderOpsWorkspace() {
  const [activeNav, setActiveNav] = useState('Build path');
  const [stages, setStages] = useState(initialStages);
  const [activeStageId, setActiveStageId] = useState(2);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [selectionStep, setSelectionStep] = useState<SelectionStep>('industry');
  const [selectionValues, setSelectionValues] = useState<Record<SelectionStep, string>>({ industry: '', segment: '', audience: '' });
  const [canUseSpeech, setCanUseSpeech] = useState(false);
  const [valueProp, setValueProp] = useState<ValueProp>({ job: '', pain: '', outcome: '', offering: '', proof: '' });
  const [context, setContext] = useState({ industry: 'Health & wellness', segment: 'Independent clinics', audience: 'Clinic owners', location: 'Ontario, Canada', model: 'B2B SaaS', hours: '8 hours / week' });

  const activeStage = stages.find((stage) => stage.id === activeStageId) ?? stages[0];
  const completedCount = stages.filter((stage) => stage.status === 'complete').length;
  const completion = Math.round((completedCount / stages.length) * 100);

  const stageIndex = stages.findIndex((stage) => stage.id === activeStageId);
  const nextStage = stages[stageIndex + 1];
  useEffect(() => {
    setCanUseSpeech('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }, []);

  const statusLabel = useMemo(() => {
    if (activeStage.status === 'complete') return 'Evidence captured';
    if (activeStage.status === 'current') return 'Your next decision';
    return 'Up next';
  }, [activeStage.status]);

  function selectStage(stage: Stage) {
    setActiveStageId(stage.id);
    setAnswer(stage.id === 1 ? 'I have spent the last five years working with independent clinics and have seen how much time is lost to preventable no-shows.' : '');
  }

  function saveValueProposition() {
    setStages((current) => current.map((stage) => stage.id === 4 ? { ...stage, status: 'complete', evidence: 'Value proposition drafted' } : stage));
    setActiveStageId(5);
  }

  function saveAnswer() {
    if (!answer.trim()) return;
    setStages((current) => current.map((stage) => stage.id === activeStage.id ? { ...stage, status: 'complete', evidence: stage.id === 2 ? 'Market focus recorded' : 'Evidence captured' } : stage));
  }

  function advanceStage() {
    saveAnswer();
    if (nextStage) {
      setActiveStageId(nextStage.id);
      setAnswer('');
      setStages((current) => current.map((stage) => stage.id === nextStage.id ? { ...stage, status: 'current' } : stage.status === 'current' ? { ...stage, status: 'complete' } : stage));
    }
  }

  function openContextFlow() {
    const step: SelectionStep = !selectionValues.industry ? 'industry' : !selectionValues.segment ? 'segment' : !selectionValues.audience ? 'audience' : 'industry';
    setSelectionStep(step);
    setShowContext(true);
  }

  function chooseSelection(step: SelectionStep, value: string) {
    const label = selectionOptions[step].find((option) => option.id === value)?.label ?? value;
    setSelectionValues((current) => ({ ...current, [step]: value }));
    setContext((current) => ({ ...current, [step]: label }));
  }

  function continueSelection() {
    const selected = selectionValues[selectionStep];
    if (!selected) return;
    const next = selectionMeta[selectionStep].next;
    if (next) {
      setSelectionStep(next);
    } else {
      setShowContext(false);
      setActiveStageId(2);
    }
  }

  function startListening() {
    if (!canUseSpeech) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => setAnswer((current) => `${current}${current ? ' ' : ''}${event.results[0][0].transcript}`);
    recognition.start();
  }

  return (
    <main className="min-h-screen bg-[#090d18] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-[252px] shrink-0 border-r border-white/[0.07] bg-[#0c1220] px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="brand-mark"><SparklesIcon className="h-4 w-4" /></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">FounderOps</p><p className="text-sm font-semibold text-white">Startup workspace</p></div>
          </div>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActiveNav(label)} className={`nav-item ${activeNav === label ? 'nav-item-active' : ''}`}><Icon className="h-[17px] w-[17px]" />{label}{label === 'Today' && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />}</button>)}
          </nav>
          <div className="mt-8 border-t border-white/[0.07] pt-6"><p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Your build path</p><div className="mt-4 space-y-1">{stages.map((stage) => <button key={stage.id} onClick={() => selectStage(stage)} className={`stage-nav ${stage.id === activeStage.id ? 'stage-nav-active' : ''}`}><span className={`stage-dot ${stage.status}`} /> <span className="truncate">{stage.name}</span>{stage.status === 'complete' && <CheckCircleIcon className="ml-auto h-4 w-4 text-emerald-400" />}</button>)}</div></div>
          <div className="mt-auto rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.08] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-medium text-indigo-200">Build progress</span><span className="text-sm font-semibold">{completion}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-indigo-400 transition-all" style={{ width: `${completion}%` }} /></div><p className="mt-3 text-xs leading-5 text-slate-400">Progress follows evidence, not paperwork.</p></div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-[74px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8"><div className="flex items-center gap-3"><button className="icon-button lg:hidden"><Bars3Icon className="h-5 w-5" /></button><div><p className="text-xs font-medium text-slate-500">Workspace / {activeNav}</p><h1 className="text-base font-semibold tracking-tight">MediFlow — from insight to first customers</h1></div></div><div className="flex items-center gap-3"><button onClick={openContextFlow} className="context-pill"><span className="status-pulse" />{context.industry}<span className="hidden text-slate-500 sm:inline">·</span><span className="hidden sm:inline">{context.location}</span><PencilSquareIcon className="h-3.5 w-3.5 text-slate-500" /></button><div className="avatar">AM</div></div></header>

          <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8">
            <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end"><div><p className="eyebrow">{activeStage.eyebrow} · Stage {activeStage.id} of {stages.length}</p><h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Build the company, one <span className="text-indigo-300">validated step</span> at a time.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">FounderOps turns your choices and conversations into a practical path from idea to evidence. No generic business plan. Just the next thing worth learning.</p></div><button onClick={openContextFlow} className="secondary-button shrink-0"><PencilSquareIcon className="h-4 w-4" />Edit founder context</button></div>

            <div className="mb-7 flex flex-wrap gap-2">{Object.entries(context).map(([key, value]) => <span key={key} className="context-chip"><span className="text-slate-500">{key}</span>{value}</span>)}</div>

            {activeNav === 'Today' && <FounderDashboard stages={stages} context={context} valueProp={valueProp} completion={completion} onOpenStage={(stage) => { setActiveStageId(stage.id); setActiveNav('Build path'); }} />}

            <div className={`${activeNav === 'Today' ? 'hidden' : 'grid'} gap-5 xl:grid-cols-[1fr_320px]`}>
              <div className="space-y-5">
                {activeStage.id === 4 && <ValuePropositionPanel context={context} valueProp={valueProp} setValueProp={setValueProp} onSave={saveValueProposition} />}
                <section className="primary-card"><div className="flex items-start justify-between gap-4"><div><div className="mb-3 flex items-center gap-2"><span className="mini-icon"><UserGroupIcon className="h-4 w-4" /></span><span className="eyebrow">{statusLabel}</span></div><h3 className="text-xl font-semibold tracking-tight">{activeStage.name}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{activeStage.description}</p></div><span className={`rounded-full border px-3 py-1 text-xs ${activeStage.status === 'complete' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200'}`}>{activeStage.status === 'complete' ? 'Saved' : 'In focus'}</span></div><div className="question-block"><div className="mb-3 flex items-start gap-3"><SparklesIcon className="mt-1 h-5 w-5 shrink-0 text-indigo-300" /><p className="text-lg font-medium leading-7 text-slate-100">{activeStage.prompt}</p></div><p className="ml-8 text-sm leading-6 text-slate-400">{activeStage.helper}</p></div><div className="relative mt-5"><textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder={activeStage.placeholder} className="answer-input" /><div className="absolute bottom-3 left-3 flex items-center gap-2"><button onClick={startListening} disabled={!canUseSpeech || isListening} className={`voice-button ${isListening ? 'voice-button-live' : ''}`}><MicrophoneIcon className="h-4 w-4" />{isListening ? 'Listening…' : canUseSpeech ? 'Speak your answer' : 'Voice unavailable'}</button><span className="text-[11px] text-slate-600">Your words become an editable answer</span></div><span className="absolute bottom-4 right-4 text-[11px] text-slate-600">{answer.length} chars</span></div><div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-xs text-slate-500"><DocumentTextIcon className="h-4 w-4" />Creates: <span className="text-slate-300">{activeStage.artifact}</span></div><div className="flex items-center gap-2"><button onClick={saveAnswer} className="secondary-button">Save evidence</button><button onClick={advanceStage} className="primary-button">Save & continue <ArrowRightIcon className="h-4 w-4" /></button></div></div></section>

                <section className="surface-card"><div className="mb-4 flex items-center justify-between"><div><p className="eyebrow">Artifacts from your thinking</p><h3 className="mt-1 text-base font-semibold">Your startup workspace</h3></div><button className="text-xs font-medium text-indigo-300 hover:text-indigo-200"><PlusIcon className="mr-1 inline h-4 w-4" />Add artifact</button></div><div className="grid gap-3 sm:grid-cols-2">{['Founder thesis', 'Problem brief', 'Interview log', 'MVP experiment'].map((artifact, index) => <button key={artifact} className="artifact-card"><div className="flex items-center justify-between"><DocumentTextIcon className="h-5 w-5 text-slate-500" /><span className={`text-[11px] ${index < 1 ? 'text-emerald-300' : 'text-slate-500'}`}>{index < 1 ? 'Ready' : 'Draft'}</span></div><p className="mt-4 text-sm font-semibold text-slate-200">{artifact}</p><p className="mt-1 text-xs text-slate-500">{index < 1 ? 'Evidence linked' : 'Build as you progress'}</p></button>)}</div></section>
              </div>

              <aside className="space-y-5"><section className="focus-card"><div className="mb-4 flex items-center justify-between"><div><p className="eyebrow text-amber-300/80">This week</p><h3 className="mt-1 text-lg font-semibold">Your founder focus</h3></div><BoltIcon className="h-5 w-5 text-amber-300" /></div><p className="text-sm leading-6 text-slate-300">Talk to <strong className="text-white">5 clinic owners</strong> and learn whether no-shows are painful enough to change.</p><div className="mt-5 space-y-3"><div className="focus-row"><span className="check-empty" /><span>Draft interview script</span><span className="ml-auto text-[11px] text-slate-500">20m</span></div><div className="focus-row"><span className="check-empty" /><span>Book first 2 conversations</span><span className="ml-auto text-[11px] text-slate-500">30m</span></div><div className="focus-row"><span className="check-empty" /><span>Log the strongest signal</span><span className="ml-auto text-[11px] text-slate-500">15m</span></div></div><button className="mt-5 w-full rounded-xl border border-amber-300/20 bg-amber-300/10 py-2.5 text-xs font-semibold text-amber-200 transition hover:bg-amber-300/15">Open weekly plan</button></section><section className="surface-card"><div className="mb-4 flex items-center gap-3"><span className="mini-icon"><UserGroupIcon className="h-4 w-4" /></span><div><p className="eyebrow">Evidence tracker</p><h3 className="mt-1 text-base font-semibold">What you know so far</h3></div></div><div className="space-y-4"><div><div className="mb-1 flex justify-between text-xs"><span className="text-slate-400">Customer conversations</span><span className="text-slate-200">0 / 5</span></div><div className="progress-track"><div className="w-0" /></div></div><div><div className="mb-1 flex justify-between text-xs"><span className="text-slate-400">Assumptions tested</span><span className="text-slate-200">1 / 4</span></div><div className="progress-track"><div className="w-1/4 bg-indigo-400" /></div></div><div><div className="mb-1 flex justify-between text-xs"><span className="text-slate-400">Artifacts ready</span><span className="text-slate-200">1 / 8</span></div><div className="progress-track"><div className="w-[12%] bg-emerald-400" /></div></div></div><button className="mt-5 flex items-center text-xs font-medium text-indigo-300">View all evidence <ChevronRightIcon className="ml-1 h-4 w-4" /></button></section><section className="surface-card"><div className="flex items-start gap-3"><span className="mini-icon"><ClockIcon className="h-4 w-4" /></span><div><p className="eyebrow">Next review</p><h3 className="mt-1 text-sm font-semibold">Friday · Pivot or persevere</h3><p className="mt-2 text-xs leading-5 text-slate-500">FounderOps will help you compare your evidence against the assumption you are testing.</p></div></div></section></aside>
            </div>
          </div>
        </section>
      </div>

      {showContext && <div className="modal-backdrop" onClick={() => setShowContext(false)}><div className="context-modal selection-modal" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div><p className="eyebrow">Personalize your build path · Step {(['industry', 'segment', 'audience'] as SelectionStep[]).indexOf(selectionStep) + 1} of 3</p><h3 className="mt-2 text-2xl font-semibold tracking-tight">{selectionMeta[selectionStep].title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{selectionMeta[selectionStep].description}</p></div><button className="icon-button" onClick={() => setShowContext(false)}><XMarkIcon className="h-5 w-5" /></button></div><div className="selection-progress"><span className="selection-progress-active" style={{ width: `${((['industry', 'segment', 'audience'] as SelectionStep[]).indexOf(selectionStep) + 1) / 3 * 100}%` }} /></div><div className="selection-stepper">{(['industry', 'segment', 'audience'] as SelectionStep[]).map((step, index) => <button key={step} onClick={() => setSelectionStep(step)} className={`selection-step ${selectionStep === step ? 'selection-step-active' : ''}`}><span>{index + 1}</span>{step}</button>)}</div><div className="selection-grid">{selectionOptions[selectionStep].map((option) => <button key={option.id} onClick={() => chooseSelection(selectionStep, option.id)} className={`selection-option ${selectionValues[selectionStep] === option.id ? 'selection-option-selected' : ''}`}><span className="selection-option-icon">{option.icon}</span><span className="selection-option-copy"><strong>{option.label}</strong><small>{option.description}</small></span><span className="selection-radio">{selectionValues[selectionStep] === option.id ? '✓' : ''}</span></button>)}</div><div className="selection-footer"><span className="text-xs text-slate-500">{selectionValues[selectionStep] ? `Selected: ${selectionOptions[selectionStep].find((option) => option.id === selectionValues[selectionStep])?.label}` : 'Choose one to continue'}</span><div className="flex gap-2"><button onClick={() => setShowContext(false)} className="secondary-button">Cancel</button><button onClick={continueSelection} disabled={!selectionValues[selectionStep]} className="primary-button">{selectionMeta[selectionStep].next ? 'Continue' : 'Use this focus'} <ArrowRightIcon className="h-4 w-4" /></button></div></div></div></div>}
    </main>
  );
}
