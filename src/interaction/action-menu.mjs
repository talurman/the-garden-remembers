function requireElement(element, label) {
  if (!element?.classList || typeof element.setAttribute !== 'function') throw new TypeError(`Action menu requires ${label}.`);
}

export function createActionMenu({root, buttons, onChoose = () => {}, onDismiss = () => {}, hideDelayMs = 420, schedule = setTimeout, cancelSchedule = clearTimeout, nextFrame = callback => requestAnimationFrame(callback)}) {
  requireElement(root, 'a root element');
  if (!Array.isArray(buttons) || buttons.length < 2) throw new TypeError('Action menu requires at least two buttons.');
  buttons.forEach((button, index) => requireElement(button, `button ${index + 1}`));
  let open = false, selectedIndex = 0, hideTimer = null;

  function render({focus = false} = {}) {
    buttons.forEach((button, index) => button.classList.toggle('selected', index === selectedIndex));
    if (focus) buttons[selectedIndex].focus?.();
  }

  function show() {
    if (open) return false;
    if (hideTimer != null) cancelSchedule(hideTimer);
    hideTimer = null; open = true; selectedIndex = 0;
    root.hidden = false; root.inert = false; root.setAttribute('aria-hidden', 'false');
    render(); nextFrame(() => root.classList.add('show')); schedule(() => buttons[0].focus?.(), 90);
    return true;
  }

  function close({dismiss = false} = {}) {
    if (!open) return false;
    open = false; root.classList.remove('show'); root.inert = true; root.setAttribute('aria-hidden', 'true');
    buttons.forEach(button => button.blur?.());
    if (dismiss) onDismiss();
    if (hideTimer != null) cancelSchedule(hideTimer);
    hideTimer = schedule(() => { root.hidden = true; hideTimer = null; }, hideDelayMs);
    return true;
  }

  function move(delta) {
    if (!open) return false;
    selectedIndex = (selectedIndex + delta + buttons.length) % buttons.length; render({focus:true}); return true;
  }

  function choose(index = selectedIndex) {
    if (!open || !buttons[index]) return false;
    onChoose(buttons[index].dataset.action); return true;
  }

  function handleKey(code) {
    if (!open) return false;
    if (code === 'ArrowRight' || code === 'ArrowDown') return move(1);
    if (code === 'ArrowLeft' || code === 'ArrowUp') return move(-1);
    if (code === 'Enter' || code === 'Space') return choose();
    if (code === 'Escape') return close({dismiss:true});
    return true;
  }

  buttons.forEach((button, index) => button.addEventListener?.('click', () => choose(index)));
  return Object.freeze({show, close, choose, move, handleKey, get isOpen(){return open;}, get selectionIndex(){return selectedIndex;}});
}
