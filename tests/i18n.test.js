import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { detectLanguage, languageCodes, resolveTranslation } from '../src/i18n/core.js';
import { validateDelivery } from '../src/deliveryValidation.js';
const messages=Object.fromEntries(languageCodes.map(code=>[code,JSON.parse(readFileSync(new URL(`../src/i18n/locales/${code}.json`,import.meta.url)))]));
const flatten=(value,prefix='')=>Object.entries(value).flatMap(([key,item])=>typeof item==='string'?[[`${prefix}${key}`,item]]:flatten(item,`${prefix}${key}.`));
test('browser detection handles regional locales, fallback and manual preference',()=>{
 assert.equal(detectLanguage(null,['de-CH','en']),'de');
 assert.equal(detectLanguage(null,['pt-BR']),'pt');
 assert.equal(detectLanguage('it',['de-CH']),'it');
 assert.equal(detectLanguage('invalid',['ja','fr-FR']),'fr');
 assert.equal(detectLanguage(null,['ja']),'en');
});
test('every locale covers every English key and preserves interpolation variables',()=>{
 const english=flatten(messages.en);
 for(const code of languageCodes){
  const entries=flatten(messages[code]);
  assert.deepEqual(entries.map(([k])=>k).sort(),english.map(([k])=>k).sort(),code);
  for(const [key,value] of english){
   const translated=resolveTranslation(messages,code,key);
   assert.ok(translated.trim(),`${code}:${key}`);
   assert.deepEqual([...translated.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(),[...value.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(),`${code}:${key}`);
  }
 }
});
test('fallback and price interpolation',()=>{
 assert.equal(resolveTranslation({en:{price:'From {price}'},de:{}},'de','price',{price:'CHF 24.90'}),'From CHF 24.90');
});
test('delivery validation returns translatable keys and accepts Lucerne addresses',()=>{
 const errors=validateDelivery({name:' ',street:'',postcode:'8000'});
 assert.equal(Object.keys(errors).length,3);
 for(const code of languageCodes)for(const key of Object.values(errors))assert.ok(resolveTranslation(messages,code,key));
 assert.deepEqual(validateDelivery({name:'Alex',street:'Test 1',postcode:'6003'}),{});
});
