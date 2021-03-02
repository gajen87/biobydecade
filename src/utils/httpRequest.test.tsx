import {doLoginPost,doActionGetDevCore,doActionDevCore,doLoginGet,doActionPostDevCore,doActionPatchDevCore,doActionPutDevCore,doActionDelDevCore} from './httpRequest'

describe('httpRequest test',() => {
    it('should call doLoginPost() method',() => {
        let config = false;
        expect(doLoginPost(config)).toBe(undefined);
    });
    it('should call doLoginPost() method if block',() => {
        let config = true;
        expect(doLoginPost(config)).toBeDefined();
    });
    it('should call doActionGetDevCore() method',() => {
        let config = false;
        expect(doActionGetDevCore(config)).toBe(undefined);
    });
    it('should call doActionGetDevCore() method if block',() => {
        let config = true;
        expect(doActionGetDevCore(config)).toBeDefined();
    });
    it('should call doActionDevCore() method if block',() => {
        let config = true,method = "";
        expect(doActionDevCore(config,method)).toBeDefined();
    });
    it('should call doActionDevCore() method',() => {
        let config = false,method = "";
        expect(doActionDevCore(config,method)).toBe(undefined);
    });
    it('should call doLoginGet() method',() => {
        let config = false;
        expect(doLoginGet(config)).toBe(undefined);
    });
    it('should call doLoginGet() method if block',() => {
        let config = true;
        expect(doLoginGet(config)).toBeDefined();
    });
    it('should call doActionPostDevCore() method',() => {
        let config = false;
        expect(doActionPostDevCore(config)).toBe(undefined);
    });
    it('should call doActionPatchDevCore() method',() => {
        let config = false;
        expect(doActionPatchDevCore(config)).toBe(undefined);
    });
    it('should call doActionPutDevCore() method',() => {
        let config = false;
        expect(doActionPutDevCore(config)).toBe(undefined);
    });
    it('should call doActionDelDevCore() method',() => {
        let config = false;
        expect(doActionDelDevCore(config)).toBe(undefined);
    });
});