class NoChangesError extends Error {
  constructor(message) {
    super(message);
    this.name = "No changes provided";
    this.status = 400;
  }
}

export default NoChangesError;
