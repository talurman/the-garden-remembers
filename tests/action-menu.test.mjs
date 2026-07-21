import test from 'node:test';
import assert from 'node:assert/strict';
import {createActionMenu} from '../src/interaction/action-menu.mjs';

function element(action) { const classes=new Set(),listeners=new Map(); return {hidden:true,inert:true,dataset:{action},classList:{add:v=>classes.add(v),remove:v=>classes.delete(v),toggle:(v,on)=>on?classes.add(v):classes.delete(v),contains:v=>classes.has(v)},setAttribute(){},addEventListener:(t,f)=>listeners.set(t,f),focus(){this.focused=true},blur(){this.focused=false},click(){listeners.get('click')?.()}} }

test('four-action menu supports keyboard, pointer, and Escape', () => {
  const root=element(),buttons=['knock','listen','call','leave'].map(element),chosen=[],dismissed=[];
  const menu=createActionMenu({root,buttons,onChoose:a=>chosen.push(a),onDismiss:()=>dismissed.push(true),nextFrame:f=>f(),schedule:()=>1,cancelSchedule:()=>{}});
  menu.show(); menu.handleKey('ArrowRight'); menu.handleKey('Enter'); assert.deepEqual(chosen,['listen']);
  menu.close(); menu.show(); buttons[2].click(); assert.deepEqual(chosen,['listen','call']);
  menu.handleKey('Escape'); assert.equal(dismissed.length,1);
});
