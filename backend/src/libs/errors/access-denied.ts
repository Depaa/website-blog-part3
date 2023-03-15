export class AccessDeniedException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AccessDeniedException';
  };
};