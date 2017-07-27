import chai from 'chai';

const expect = chai.expect;

describe('Default test suite', () => {
	it('should perform artithmetic computation', ()=>{
		expect(2 + 3).to.equal(5);
	});
}) 