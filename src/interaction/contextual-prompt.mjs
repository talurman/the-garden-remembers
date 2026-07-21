function assertElement(element, name) {
  if (!element?.classList || typeof element.setAttribute !== 'function') {
    throw new TypeError(`Contextual prompt requires a ${name} element.`);
  }
}

export function createContextualPromptController({
  root,
  title,
  question,
  confirm,
  cancel,
  copyByAction,
  onConfirm = () => {},
  onDismiss = () => {},
  onOpen = () => {},
  onClose = () => {},
  hideDelayMs = 500,
  schedule = setTimeout,
  cancelSchedule = clearTimeout,
  nextFrame = callback => requestAnimationFrame(callback)
}) {
  assertElement(root, 'root');
  assertElement(confirm, 'confirm');
  assertElement(cancel, 'cancel');
  if (!title || !question) throw new TypeError('Contextual prompt requires title and question elements.');
  if (!copyByAction || typeof copyByAction !== 'object') throw new TypeError('Contextual prompt requires action copy.');

  let open = false;
  let action = null;
  let selectedIndex = 0;
  let hideTimer = null;

  function renderSelection({focus = false} = {}) {
    confirm.classList.toggle('selected', selectedIndex === 0);
    cancel.classList.toggle('selected', selectedIndex === 1);
    if (focus) (selectedIndex === 0 ? confirm : cancel).focus?.();
  }

  function show(actionId) {
    if (open) return false;
    const copy = copyByAction[actionId];
    if (!copy) throw new Error(`Unknown contextual prompt action: ${actionId}`);
    if (hideTimer != null) cancelSchedule(hideTimer);
    hideTimer = null;
    open = true;
    action = String(actionId);
    selectedIndex = 0;
    root.hidden = false;
    root.inert = false;
    root.setAttribute('aria-hidden', 'false');
    title.textContent = copy.title;
    question.textContent = copy.question;
    confirm.textContent = copy.confirm;
    renderSelection();
    onOpen(action);
    nextFrame(() => root.classList.add('show'));
    schedule(() => confirm.focus?.(), 100);
    return true;
  }

  function close({dismiss = false} = {}) {
    if (!open) return false;
    const closingAction = action;
    open = false;
    action = null;
    root.classList.remove('show');
    root.setAttribute('aria-hidden', 'true');
    root.inert = true;
    confirm.blur?.();
    cancel.blur?.();
    if (dismiss) onDismiss(closingAction);
    onClose(closingAction, {dismiss});
    if (hideTimer != null) cancelSchedule(hideTimer);
    hideTimer = schedule(() => {
      root.hidden = true;
      hideTimer = null;
    }, hideDelayMs);
    return true;
  }

  function moveSelection() {
    if (!open) return false;
    selectedIndex = selectedIndex === 0 ? 1 : 0;
    renderSelection({focus: true});
    return true;
  }

  function activate() {
    if (!open) return false;
    const activeAction = action;
    if (selectedIndex === 1) close({dismiss: true});
    else onConfirm(activeAction);
    return true;
  }

  function handleKey(code) {
    if (!open) return false;
    if (code === 'ArrowLeft' || code === 'ArrowRight') return moveSelection();
    if (code === 'Enter' || code === 'Space') return activate();
    if (code === 'Escape') return close({dismiss: true});
    return true;
  }

  confirm.addEventListener?.('click', () => {
    if (open) onConfirm(action);
  });
  cancel.addEventListener?.('click', () => close({dismiss: true}));

  return Object.freeze({
    show,
    close,
    handleKey,
    moveSelection,
    activate,
    get isOpen() { return open; },
    get action() { return action; },
    get selectionIndex() { return selectedIndex; },
    snapshot() { return Object.freeze({open, action, selectedIndex}); }
  });
}

