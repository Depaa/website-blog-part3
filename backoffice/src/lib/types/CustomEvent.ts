type CustomEvent<Target> = Event & { detail: Target };
export default CustomEvent;
