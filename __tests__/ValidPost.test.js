function isValidPost(postText, image) {
    return (
      Boolean((postText &&
        postText.length < 1000 &&
        postText.split(/\r\n|\r|\n/).length <= 25) ||
      (image && !postText))
    );
  }

  describe("PostCreationCheck", () => {
    it("should return true for valid postText with no image", () => {
      expect(isValidPost("This is a valid post text.", '')).toBe(true);
    });
  
    it("should return false for postText with more than 1000 characters", () => {
      const longPostText = "A".repeat(1001);
      expect(isValidPost(longPostText, '')).toBe(false);
    });
  
    it("should return false for postText with more than 25 lines", () => {
      const multilinePostText = "Line\n".repeat(26);
      expect(isValidPost(multilinePostText, '')).toBe(false);
    });
  
    it("should return true for empty postText with image", () => {
      expect(isValidPost("", "path/to/image.jpg")).toBe(true);
    });
  
    it("should return true for valid postText with image", () => {
      expect(isValidPost("This is a valid post text.", "path/to/image.jpg")).toBe(true);
    });
  
    it("should return false for empty postText and no image", () => {
      expect(isValidPost("", '')).toBe(false);
    });
  });
  