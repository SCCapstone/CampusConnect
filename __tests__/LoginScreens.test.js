function checkInput(email,password,password2) {
    return Boolean(
        email &&
        password &&
        password === password2 &&
        email.split('@').length == 2 &&
        (email.split('@')[1] === 'sc.edu' || email.split('@')[1].endsWith('.sc.edu'))
)
}


describe("CreateUserTest", () => {
    it("should return false for empty email",() => {
        expect(checkInput('','password','password')).toBe(false)
    })
    
    it("should return false for empty password",() => {
        expect(checkInput('erk3452@sc.edu','','')).toBe(false)
    })
    
    it("should return false for invalid email format",() => {
        expect(checkInput('erk3452sc.edu','password','password')).toBe(false)
    })
    
    it("should return false for non-sc.edu domain",() => {
        expect(checkInput('erk3452@example.com','password','password')).toBe(false)
    })
    
    it("should return false for multiple '@' characters",() => {
        expect(checkInput('erk3452@sc.edu@extra.com','password','password')).toBe(false)
    })
    
    it("should return false for incorrect password confirmation",() => {
        expect(checkInput('erk3452@sc.edu','password','wrong_password')).toBe(false)
    })
    
    it("should return true for valid input",() => {
        expect(checkInput('erk3452@sc.edu','password','password')).toBe(true)
    })
    
    it("should return true for valid input with subdomain",() => {
        expect(checkInput('erk3452@email.sc.edu','password','password')).toBe(true)
    })
    
    it("should return false for mismatched passwords",() => {
        expect(checkInput('erk3452@sc.edu','password1','password2')).toBe(false)
    })
    it("should return false usc",() => {
        expect(checkInput('erk3452@usc.edu','password1','password2')).toBe(false)
    })
    it("should return true subdomain",() => {
        expect(checkInput('erk3452@cec.sc.edu','password1','password1')).toBe(true)
    })
    it("should return false for empty input",() => {
        expect(checkInput('','','')).toBe(false)})
})