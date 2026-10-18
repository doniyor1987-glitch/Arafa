const {test}=require('node:test');
const assert=require('node:assert/strict');
const {estimateNamoz:estimate}=require('./namoz-estimate');
test('male ignores female inputs',()=>assert.equal(estimate(365,'male',7,2,50).amount,365));
test('one year, seven hayz days monthly',()=>assert.deepEqual(estimate(365,'female',7,0,0),{days:365,hayz:84,nifas:0,amount:281}));
test('actual nifas, no overlap with hayz',()=>assert.deepEqual(estimate(365,'female',7,2,50),{days:365,hayz:72,nifas:50,amount:243}));
test('short period entirely nifas yields zero',()=>assert.equal(estimate(20,'female',7,1,20).amount,0));
test('zero hayz or zero nifas is allowed',()=>assert.equal(estimate(365,'female',0,1,0).amount,365));
test('invalid inputs rejected',()=>{
 for(const args of [[0,'male'],[Infinity,'male'],[36526,'male'],[365,'female',11],[365,'female',-1],[365,'female',7,0,1],[365,'female',7,1,41],[20,'female',7,1,21],[365,'female',7,1.5,20],[365,'female',NaN],[365,'other']])assert.throws(()=>estimate(...args));
});
test('deductions partition period and cannot be negative',()=>{
 for(let days=1;days<=36525;days+=37){const x=estimate(days,'female',10,2,Math.min(days,80));assert.equal(x.amount+x.hayz+x.nifas,days);assert.ok(x.amount>=0);}
});
