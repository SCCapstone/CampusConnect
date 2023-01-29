function checkInput(email,password,password2) {
    return (email &&
    password &&
    password === password2 &&
    email.split('@').length > 1 &&
    email.split('@')[1].includes('sc.edu') &&
    email.split('@')[1].substring(email.split('@')[1].length - 6) === 'sc.edu')
}


describe("CreateUserTest", () => {
    it("should return false",() => {
        expect(checkInput('erk3452@gmail.com','password','password')).toBe(false)
    })
    it("should return true",() => {
        expect(checkInput('erk3452@sc.edu','password','password')).toBe(true)
    })
    it("should return false",() => {
        expect(checkInput('erk3452@sc.edu','password','password2')).toBe(false)
    })
    it("should return true",() => {
        expect(checkInput('erk3452@email.sc.edu','password','password')).toBe(true)
    })
    it("should return false",() => {
        expect(checkInput('erk3452@email.sc.edu','password2','password')).toBe(false)
    })
})