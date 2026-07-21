import test from 'node:test';
import assert from 'node:assert/strict';
import {createContextualPromptController} from '../src/interaction/contextual-prompt.mjs';

function element() {
  const classes = new Set();
  const listeners = new Map();
  return {
    hidden: true,
    inert: true,
    textContent: '',
    focused: false,
    attributes: {},
    classList: {
      add: value => classes.add(value),
      remove: value => classes.delete(value),
      toggle: (value, force) => force ? classes.add(value) : classes.delete(value),
      contains: value => classes.has(value)
    },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(type, listener) { listeners.set(type, listener); },
    focus() { this.focused = true; },
    blur() { this.focused = false; },
    click() { listeners.get('click')?.(); }
  };
}

function fixture() {
  const elements = {root:element(), title:element(), question:element(), confirm:element(), cancel:element()};
  const dismissed = [];
  const confirmed = [];
  const scheduled = [];
  const controller = createContextualPromptController({
    ...elements,
    copyByAction:{ask:{title:'A person.',question:'Check with him?',confirm:'Check'}},
    onConfirm: action => confirmed.push(action),
    onDismiss: action => dismissed.push(action),
    schedule: (callback, delay) => { scheduled.push({callback,delay}); return scheduled.length; },
    cancelSchedule: () => {},
    nextFrame: callback => callback()
  });
  return {elements, dismissed, confirmed, scheduled, controller};
}

test('a reusable prompt opens with action copy and locks its modal semantics', () => {
  const {controller,elements} = fixture();
  assert.equal(controller.show('ask'), true);
  assert.equal(controller.isOpen, true);
  assert.equal(controller.action, 'ask');
  assert.equal(elements.root.hidden, false);
  assert.equal(elements.root.inert, false);
  assert.equal(elements.root.attributes['aria-hidden'], 'false');
  assert.equal(elements.title.textContent, 'A person.');
  assert.equal(elements.question.textContent, 'Check with him?');
  assert.equal(elements.confirm.textContent, 'Check');
});

test('keyboard navigation preserves confirm, cancel and Escape behavior', () => {
  const {controller,dismissed,confirmed} = fixture();
  controller.show('ask');
  controller.handleKey('ArrowRight');
  assert.equal(controller.selectionIndex, 1);
  controller.handleKey('Enter');
  assert.deepEqual(dismissed, ['ask']);
  assert.deepEqual(confirmed, []);

  controller.show('ask');
  controller.handleKey('Enter');
  assert.deepEqual(confirmed, ['ask']);
  controller.close();

  controller.show('ask');
  controller.handleKey('Escape');
  assert.deepEqual(dismissed, ['ask', 'ask']);
});

test('pointer controls have parity with keyboard controls', () => {
  const {controller,elements,dismissed,confirmed} = fixture();
  controller.show('ask');
  elements.confirm.click();
  assert.deepEqual(confirmed, ['ask']);
  controller.close();
  controller.show('ask');
  elements.cancel.click();
  assert.deepEqual(dismissed, ['ask']);
});

