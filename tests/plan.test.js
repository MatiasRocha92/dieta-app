import test from 'node:test';
import assert from 'node:assert/strict';
import {monday,plus,defaultDay,advice,menus,foods,shopping,kit} from '../src/data.js';
test('weeks cross month and year without losing dates',()=>{assert.equal(monday('2026-01-01'),'2025-12-29');assert.equal(plus('2025-12-29',6),'2026-01-04');assert.equal(monday('2026-09-27'),'2026-09-21');});
test('day state is independent and includes a full menu',()=>{const a=defaultDay('2026-09-28'),b=defaultDay('2026-09-28');a.done[0]=true;a.meals[0]='Edited';assert.equal(b.done[0],false);assert.notEqual(b.meals[0],'Edited');assert.equal(b.meals.length,4);});
test('shift and exercise independently change advice',()=>{const d=defaultDay('2026-09-28');const normal=advice(d);d.shift='Guardia nocturna';assert.notEqual(advice(d).shift,normal.shift);assert.equal(advice(d).training,normal.training);d.activity='Correr';assert.match(advice(d).training,/banana/);d.activity='Gimnasio';assert.match(advice(d).training,/antes/);});
test('excluded foods are absent from all predefined choices',()=>{const text=JSON.stringify({menus,foods,shopping,kit}).toLowerCase();for(const food of ['zapallo','acelga','brócoli','repollitos','coliflor','remolacha','polenta','espinaca','berenjena','zapallito','chauchas','porotos'])assert.ok(!text.includes(food),food);});
