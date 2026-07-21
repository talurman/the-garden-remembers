import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {EXPERIENCE_PROGRESSION,sampleExperienceProgression} from '../src/world/experience-progression.mjs';

const runtime=await readFile(new URL('../index.html',import.meta.url),'utf8');

test('step 6 moves through four luminous phases without a dark phase',()=>{
  assert.deepEqual(EXPERIENCE_PROGRESSION.phases.map(item=>item.id),['first-light','pigment-awakening','warm-release','remembered-garden']);
  assert.equal(EXPERIENCE_PROGRESSION.safety.darkPhase,false);
  assert.equal(EXPERIENCE_PROGRESSION.safety.graphicBeaconRings,false);
});

test('memory strengthens a broad physical response',()=>{
  const before=sampleExperienceProgression({journey:.2,memory:0,time:1});
  const after=sampleExperienceProgression({journey:.2,memory:1,time:1});
  assert.ok(after.pigmentStrength>before.pigmentStrength);
  assert.ok(after.paperGlow>before.paperGlow);
  assert.deepEqual(EXPERIENCE_PROGRESSION.responseSurfaces,['sky','fog','water','path-pigment','planting','paper','pavilion']);
});

test('reduced motion preserves information while reducing atmospheric movement',()=>{
  const standard=sampleExperienceProgression({journey:.7,memory:.6,time:7});
  const reduced=sampleExperienceProgression({journey:.7,memory:.6,time:7,reducedMotion:true});
  assert.equal(reduced.phase,standard.phase);
  assert.ok(reduced.atmosphericBreath<standard.atmosphericBreath);
  for(const marker of ['sampleExperienceProgression','journeyPigmentBands','qa-progression']) assert.equal(runtime.includes(marker),true,marker);
});
